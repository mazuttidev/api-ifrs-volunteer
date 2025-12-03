import { prisma } from "../lib/prisma";

export const createEvent = async (data: any) => {
  const event = await prisma.event.create({
    data,
  });

  return { id: event.id };
};

export const updateEvent = async (id: number, data: any) => {
  const existing = await prisma.event.findUnique({
    where: { id },
  });

  if (!existing) throw new Error("Evento não encontrado");

  await prisma.event.update({
    where: { id },
    data,
  });
};

export const getAllEvents = async () => {
  return await prisma.event.findMany({
    orderBy: { start_at: "asc" },
  });
};

export const getEventById = async (id: number) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) throw new Error("Evento não encontrado");

  return event;
};

export const deleteEvent = async (id: number) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) throw new Error("Evento não encontrado");

  await prisma.event.delete({
    where: { id },
  });
};
