import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Customize.css";

export default function CustomCarEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");

  const EXTRAS = [
    { id: "ac", label: "Air Conditioning", price: 500 },
    { id: "sun", label: "Sunroof", price: 1200 },
    { id: "nav", label: "Navigation", price: 800 },
  ];

  const COLORS = ["Red", "Blue", "Green", "Black", "White"];
  const WHEELS = ["Standard", "Sport", "Offroad"];
  const ENGINES = ["I4", "V6", "V8", "Electric"];

  const calcPrice = (f) => {
    if (!f) return 0;
    let price = 20000;
    if (f.wheels === "Sport") price += 1500;
    if (f.wheels === "Offroad") price += 2000;
    if (f.engine === "V6") price += 2500;
    if (f.engine === "V8") price += 5000;
    if (f.engine === "Electric") price += 7000;
    (f.extras || []).forEach((e) => {
      const ex = EXTRAS.find((x) => x.id === e);
      if (ex) price += ex.price;
    });
    return price;
  };

  useEffect(() => {
    const fetchCar = async () => {
      const res = await fetch(`http://localhost:3001/customcars/${id}`);
      if (!res.ok) {
        setError("Failed to load");
        return;
      }
      const data = await res.json();
      if (data.extras && typeof data.extras === "string") {
        try {
          data.extras = JSON.parse(data.extras);
        } catch (e) {
          data.extras = [];
        }
      }
      // ensure extras is an array
      if (!Array.isArray(data.extras)) data.extras = [];
      // compute price based on fields
      data.price = calcPrice(data);
      setForm(data);
    };
    fetchCar();
  }, [id]);

  if (!form) return <div>Loading...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      next.price = calcPrice(next);
      return next;
    });
  };

  const handleExtra = (id) => {
    const extras = (form.extras || []).includes(id)
      ? (form.extras || []).filter((x) => x !== id)
      : [...(form.extras || []), id];
    setForm((prev) => {
      const next = { ...prev, extras };
      next.price = calcPrice(next);
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`http://localhost:3001/customcars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const text = await res.text();
        setError(text || "Failed to save");
        return;
      }
      navigate("/customcars");
    } catch (err) {
      setError("Network error");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this custom car?")) return;
    try {
      const res = await fetch(`http://localhost:3001/customcars/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        navigate("/customcars");
      } else {
        const text = await res.text();
        setError(text || "Failed to delete");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="customize">
      <h2>Edit Custom Car</h2>
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
                checked={form.extras?.includes(x.id)}
                onChange={() => handleExtra(x.id)}
              />{" "}
              {x.label} (+${x.price})
            </label>
          ))}
        </fieldset>
        <div className="preview">
          <h3>Preview</h3>
          <div className={`car-preview color-${form.color?.toLowerCase()}`}>
            <div className={`wheels ${form.wheels?.toLowerCase()}`}></div>
            <div className="engine">{form.engine}</div>
          </div>
        </div>

        <div className="price">Total Price: ${form.price?.toFixed(2)}</div>
        {error && <div className="error">{error}</div>}
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">Save</button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
