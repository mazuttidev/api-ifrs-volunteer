import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";

const router = Router();

router.post("/", userController.createUser);
router.get("/", authenticate, authorizeRoles('organizer'), userController.getUsers);
router.get("/:id", authenticate, authorizeRoles('organizer'), userController.getUser);
router.put("/:id", authenticate, authorizeRoles('volunteer'), userController.updateUser);

export default router;
