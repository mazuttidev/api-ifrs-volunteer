import {
  createEvent,
  updateEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
} from "../src/services/eventService";

import { prisma } from "../src/lib/prisma";

// mock do prisma
jest.mock("../src/lib/prisma", () => ({
  prisma: {
    event: {
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Event Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ===========================================
  // CREATE EVENT
  // ===========================================
  it("should create an event successfully", async () => {
    (prisma.event.create as jest.Mock).mockResolvedValue({ id: 10 });

    const data = { title: "Test Event" };

    const result = await createEvent(data);

    expect(prisma.event.create).toHaveBeenCalledWith({ data });
    expect(result).toEqual({ id: 10 });
  });

  // ===========================================
  // GET ALL EVENTS
  // ===========================================
  it("should return all events ordered by start_at", async () => {
    const events = [{ id: 1 }, { id: 2 }];

    (prisma.event.findMany as jest.Mock).mockResolvedValue(events);

    const result = await getAllEvents();

    expect(prisma.event.findMany).toHaveBeenCalledWith({
      orderBy: { start_at: "asc" },
    });

    expect(result).toEqual(events);
  });

  // ===========================================
  // GET EVENT BY ID (SUCESSO)
  // ===========================================
  it("should return an event by ID", async () => {
    const event = { id: 1, title: "Event 1" };

    (prisma.event.findUnique as jest.Mock).mockResolvedValue(event);

    const result = await getEventById(1);

    expect(prisma.event.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(event);
  });

  // ===========================================
  // GET EVENT BY ID (ERRO)
  // ===========================================
  it("should throw an error if event not found", async () => {
    (prisma.event.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(getEventById(999))
      .rejects
      .toThrow("Evento não encontrado");
  });

  // ===========================================
  // UPDATE EVENT (SUCESSO)
  // ===========================================
  it("should update an event successfully", async () => {
    (prisma.event.findUnique as jest.Mock).mockResolvedValue({ id: 1 });

    const data = { title: "Updated Title" };

    await updateEvent(1, data);

    expect(prisma.event.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data,
    });
  });

  // ===========================================
  // UPDATE EVENT (ERRO)
  // ===========================================
  it("should throw an error when updating a non-existent event", async () => {
    (prisma.event.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(updateEvent(999, { title: "Test" }))
      .rejects
      .toThrow("Evento não encontrado");
  });

  // ===========================================
  // DELETE EVENT (SUCESSO)
  // ===========================================
  it("should delete an event successfully", async () => {
    (prisma.event.findUnique as jest.Mock).mockResolvedValue({ id: 1 });

    await deleteEvent(1);

    expect(prisma.event.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  // ===========================================
  // DELETE EVENT (ERRO)
  // ===========================================
  it("should throw an error when deleting a non-existent event", async () => {
    (prisma.event.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(deleteEvent(999))
      .rejects
      .toThrow("Evento não encontrado");
  });
});
