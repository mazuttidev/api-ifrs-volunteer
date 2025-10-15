import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Título obrigatório"),
  description: z.string().optional(),
  event_type_id: z.number(),
  location: z.string().min(3, "Local obrigatório"),
  address: z.string().optional(),
  start_at: z.coerce.date({ message: "Data de início inválida" }).optional(),
  end_at: z.coerce.date({ message: "Data de término inválida" }).optional(),
  capacity: z.number().int().positive().optional(),
  status: z.enum(["draft", "published", "closed", "cancelled"]).optional(),
  created_by: z.number(),
});

export const eventUpdateSchema = eventSchema.partial();
