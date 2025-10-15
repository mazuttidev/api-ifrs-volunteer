import { Event } from "../models/eventModel";

export const createEvent = async (data: Partial<Event>) => {
  const event = new Event(data);
  const id = await event.save();
  return { id };
};

export const updateEvent = async (id: number, data: Partial<Event>) => {
  const existing = await Event.findById(id);
  if (!existing) throw new Error("Evento não encontrado");
  const event = new Event({ ...existing, ...data });
  await event.update(id);
};

export const getAllEvents = async () => {
  return await Event.findAll();
};

export const getEventById = async (id: number) => {
  const event = await Event.findById(id);
  if (!event) throw new Error("Evento não encontrado");
  return event;
};

export const deleteEvent = async (id: number) => {
  const event = await Event.findById(id);
  if (!event) throw new Error("Evento não encontrado");
  await Event.delete(id);
};
