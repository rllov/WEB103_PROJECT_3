import express from "express";
import EventsController from "../controller/eventsController.js";

const router = express.Router();

router.get("/", EventsController.getAllEvents);
router.get("/:id", EventsController.getEventById);
router.post("/", EventsController.createEvent);
router.put("/:id", EventsController.updateEvent);
router.delete("/:id", EventsController.deleteEvent);

export default router;
