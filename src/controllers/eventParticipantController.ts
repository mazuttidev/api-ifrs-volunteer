import { Request, Response } from "express";
import { registerParticipant, listParticipants, removeParticipant } from "../services/eventParticipantService";
import { registerParticipantSchema } from "../schemas/eventParticipantSchema";

export const registerUserInEvent = async (req: Request, res: Response) => {
  try {
    const data = registerParticipantSchema.parse(req.body);

    const result = await registerParticipant(data);
    res.status(201).json({ message: "Usuário registrado no evento", id: result.id });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getParticipantsByEvent = async (req: Request, res: Response) => {
  try {
    const event_id = Number(req.params.event_id);
    const participants = await listParticipants(event_id);
    res.json(participants);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const removeUserFromEvent = async (req: Request, res: Response) => {
  try {
    const event_id = Number(req.params.event_id);
    const user_id = Number(req.params.user_id);
    await removeParticipant(event_id, user_id);
    res.json({ message: "Participante removido do evento" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
