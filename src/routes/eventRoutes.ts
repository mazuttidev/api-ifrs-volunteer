import { Router } from "express";
import * as eventController from "../controllers/eventController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Gerenciamento de eventos
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Criar novo evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Evento criado com sucesso
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Listar todos os eventos
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Lista de eventos
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Buscar evento por ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento encontrado
 */

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Atualizar evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 */

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Remover evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Evento removido
 */

router.post("/", authenticate, authorizeRoles("admin", "organizer"), eventController.createEvent);
router.put("/:id", authenticate, authorizeRoles("admin", "organizer"), eventController.updateEvent);
router.delete("/:id", authenticate, authorizeRoles("admin", "organizer"), eventController.deleteEvent);

// rotas públicas
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);

export default router;
