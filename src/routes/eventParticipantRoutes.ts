import { Router } from "express";
import { registerUserInEvent, getParticipantsByEvent, removeUserFromEvent } from "../controllers/eventParticipantController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: EventParticipants
 *   description: Gerenciamento de participantes de eventos
 */

/**
 * @swagger
 * /event-participants:
 *   post:
 *     summary: Registrar participante em um evento
 *     tags: [EventParticipants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventParticipant'
 *     responses:
 *       200:
 *         description: Participante registrado com sucesso
 */
router.post("/", authenticate, registerUserInEvent);

/**
 * @swagger
 * /event-participants/{event_id}:
 *   get:
 *     summary: Listar participantes de um evento
 *     tags: [EventParticipants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: event_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de participantes do evento
 */
router.get("/:event_id", authenticate, getParticipantsByEvent);

/**
 * @swagger
 * /event-participants/{event_id}/{user_id}:
 *   delete:
 *     summary: Remover participante de um evento
 *     tags: [EventParticipants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: event_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Participante removido do evento
 */

router.delete("/:event_id/:user_id", authenticate, removeUserFromEvent);

export default router;