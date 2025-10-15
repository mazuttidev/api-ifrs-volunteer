import { z } from "zod";

export const registerParticipantSchema = z.object({
  event_id: z.number({
    error: "O ID do evento é obrigatório",
  }),
  user_id: z.number({
    error: "O ID do usuário é obrigatório",
  }),
  role_in_event: z.enum(["participant", "volunteer_coordinator"]).optional(),
});
