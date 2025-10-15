import { Router } from "express";
import { registerUserInEvent, getParticipantsByEvent, removeUserFromEvent } from "../controllers/eventParticipantController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authenticate, registerUserInEvent);
router.get("/:event_id", authenticate, getParticipantsByEvent);
router.delete("/:event_id/:user_id", authenticate, removeUserFromEvent);

export default router;