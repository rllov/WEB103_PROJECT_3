import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Customize.css";

const COLORS = ["Red", "Blue", "Green", "Black", "White"];
const WHEELS = ["Standard", "Sport", "Offroad"];
const ENGINES = ["I4", "V6", "V8", "Electric"];
const EXTRAS = [
  { id: "ac", label: "Air Conditioning", price: 500 },
  { id: "sun", label: "Sunroof", price: 1200 },
  { id: "nav", label: "Navigation", price: 800 },
];

export default function Customize({ onSaved }) {
  const [form, setForm] = useState({
    name: "",
    color: COLORS[0],
    wheels: WHEELS[0],
    engine: ENGINES[0],
    extras: [],
    price: 0,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const calcPrice = (f) => {
    let price = 20000; // base
    if (f.wheels === "Sport") price += 1500;
    if (f.wheels === "Offroad") price += 2000;
    if (f.engine === "V6") price += 2500;
    if (f.engine === "V8") price += 5000;
    if (f.engine === "Electric") price += 7000;
    f.extras.forEach((e) => {
      const ex = EXTRAS.find((x) => x.id === e);
      if (ex) price += ex.price;
    });
    return price;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    next.price = calcPrice(next);
    setForm(next);
  };

  const handleExtra = (id) => {
    const extras = form.extras.includes(id)
      ? form.extras.filter((x) => x !== id)
      : [...form.extras, id];
    const next = { ...form, extras };
    next.price = calcPrice(next);
    setForm(next);
  };

  const validateCombo = (f) => {
    // example incompatible combo: Electric cannot have V8 (redundant) or Offroad wheels
    if (f.engine === "Electric" && f.wheels === "Offroad")
      return "Electric engines are not available with Offroad wheels.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validateCombo(form);
    if (v) {
      setError(v);
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/customcars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: calcPrice(form) }),
      });
      if (!res.ok) {
        const text = await res.text();
        setError(text || "Failed to save");
        return;
      }
      const saved = await res.json();
      if (onSaved) onSaved(saved);
      // reset
      setForm({
        name: "",
        color: COLORS[0],
        wheels: WHEELS[0],
        engine: ENGINES[0],
        extras: [],
        price: 20000,
      });
      // navigate to the list of custom cars
      navigate("/customcars");
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="customize">
      <h2>Customize Your Car</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Color:
          <select name="color" value={form.color} onChange={handleChange}>
            {COLORS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label>
          Wheels:
          <select name="wheels" value={form.wheels} onChange={handleChange}>
            {WHEELS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </label>
        <label>
          Engine:
          <select name="engine" value={form.engine} onChange={handleChange}>
            {ENGINES.map((en) => (
              <option key={en} value={en}>
                {en}
              </option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend>Extras</legend>
          {EXTRAS.map((x) => (
            <label key={x.id}>
              <input
                type="checkbox"
                checked={form.extras.includes(x.id)}
                onChange={() => handleExtra(x.id)}
              />{" "}
              {x.label} (+${x.price})
            </label>
          ))}
        </fieldset>

        <div className="preview">
          <h3>Preview</h3>
          <div className={`car-preview color-${form.color.toLowerCase()}`}>
            <div className={`wheels ${form.wheels.toLowerCase()}`}></div>
            <div className="engine">{form.engine}</div>
          </div>
        </div>

        <div className="price">Total Price: ${calcPrice(form).toFixed(2)}</div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Save Custom Car</button>
      </form>
    </div>
  );
}
