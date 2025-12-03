import { z } from "zod";

function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== parseInt(cpf[10])) return false;

  return true;
}

export const userSchema = z.object({
  id: z.number().optional(),

  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(150, "Nome deve ter no máximo 150 caracteres"),

  email: z.string().email(),

  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),

  role: z.enum(["admin", "organizer", "volunteer"]).default("volunteer"),

  phone: z.string().optional(),

  birth_date: z
    .preprocess((val) => {
      if (!val) return undefined;
      const d = new Date(val as string);
      return isNaN(d.getTime()) ? undefined : d;
    }, z.date().optional()),

  gender: z.enum(["M", "F", "O"]).optional(),

  cpf: z
    .string()
    .min(11)
    .refine(isValidCPF, { message: "CPF inválido" }),

  blood_type: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),

  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),

  availability: z.string().optional(),
  skills: z.string().optional(),

  emergency_contact: z.string().optional(),
});

export const updateUserSchema = userSchema.partial().extend({
  cpf: z
    .string()
    .optional()
    .refine((cpf) => !cpf || isValidCPF(cpf), {
      message: "CPF inválido",
    }),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .optional(),
});
