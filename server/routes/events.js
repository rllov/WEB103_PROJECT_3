import express from "express";
import EventsController from "../controller/eventsController.js";

const router = express.Router();

router.get("/", EventsController.getAllEvents);
router.get("/:id", EventsController.getEventById);

export default router;
