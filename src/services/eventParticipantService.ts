import { EventParticipant } from "../models/eventParticipantModel";

export const registerParticipant = async (data: Partial<EventParticipant>) => {
  const existing = await EventParticipant.findByEventAndUser(data.event_id!, data.user_id!);
  if (existing) throw new Error("Usuário já cadastrado neste evento");

  const participant = new EventParticipant(data);
  const id = await participant.save();
  return { id };
};

export const listParticipants = async (event_id: number) => {
  return await EventParticipant.findByEvent(event_id);
};

export const removeParticipant = async (event_id: number, user_id: number) => {
  const existing = await EventParticipant.findByEventAndUser(event_id, user_id);
  if (!existing) throw new Error("Participante não encontrado");
  await EventParticipant.delete(event_id, user_id);
};
