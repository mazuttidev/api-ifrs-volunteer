import { Request, Response } from "express";
import * as eventService from "../services/eventService";
import { eventSchema, eventUpdateSchema } from "../schemas/eventSchema";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const data = eventSchema.parse(req.body);
    const result = await eventService.createEvent(data);
    res.status(201).json({ message: "Evento criado com sucesso", id: result.id });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = eventUpdateSchema.parse(req.body);
    await eventService.updateEvent(id, data);
    res.json({ message: "Evento atualizado com sucesso" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllEvents = async (_req: Request, res: Response) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const event = await eventService.getEventById(id);
    res.json(event);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await eventService.deleteEvent(id);
    res.json({ message: "Evento excluído com sucesso" });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
