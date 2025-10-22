import express from "express";
import CustomCarsController from "../controller/customcarsController.js";

const router = express.Router();

router.get("/", CustomCarsController.getAllCustomCars);
router.get("/:id", CustomCarsController.getCustomCarById);
router.post("/", CustomCarsController.createCustomCar);
router.put("/:id", CustomCarsController.updateCustomCar);
router.delete("/:id", CustomCarsController.deleteCustomCar);

export default router;
