import { Router } from "express";
import * as eventController from "../controllers/eventController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";

const router = Router();

router.post("/", authenticate, authorizeRoles("admin", "organizer"), eventController.createEvent);
router.put("/:id", authenticate, authorizeRoles("admin", "organizer"), eventController.updateEvent);
router.delete("/:id", authenticate, authorizeRoles("admin", "organizer"), eventController.deleteEvent);

// rotas públicas
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);

export default router;
