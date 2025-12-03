import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { User } from "../types/User";

export const registerUser = async (data: Partial<User>): Promise<string> => {
  if (!data.password || !data.name || !data.email || !data.cpf) {
    throw new Error("Os campos nome, e-mail, cpf e senha são obrigatórios.");
  }

  // Verificar email
  const existingEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingEmail) throw new Error("E-mail já cadastrado.");

  // Verificar CPF
  const existingCPF = await prisma.user.findUnique({
    where: { cpf: data.cpf },
  });
  if (existingCPF) throw new Error("CPF já cadastrado.");

  // Hash da senha
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      password: hashedPassword,
      role: data.role ?? "volunteer",
      phone: data.phone ?? null,
      birth_date: data.birth_date ?? null,
      gender: data.gender ?? null,
      blood_type: normalizeBloodType(data.blood_type) as any,
      cep: data.cep ?? null,
      address: data.address ?? null,
      city: data.city ?? null,
      state: data.state ?? null,
      availability: data.availability ?? null,
      skills: data.skills ?? null,
      emergency_contact: data.emergency_contact ?? null,
    },
  });

  return String(user.id);
};

export const updateUser = async (data: Partial<User>): Promise<void> => {
  if (!data.id) throw new Error("ID é obrigatório para atualizar usuário");

  const existing = await prisma.user.findUnique({
    where: { id: Number(data.id) },
  });

  if (!existing) throw new Error("Usuário não encontrado");

  // Verificar email
  if (data.email) {
    const emailExists = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (emailExists && emailExists.id !== existing.id)
      throw new Error("E-mail já cadastrado.");
  }

  // Verificar CPF
  if (data.cpf) {
    const cpfExists = await prisma.user.findUnique({
      where: { cpf: data.cpf },
    });
    if (cpfExists && cpfExists.id !== existing.id)
      throw new Error("CPF já cadastrado.");
  }

  // Hash da nova senha (se enviada)
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  await prisma.user.update({
    where: { id: Number(data.id) },
    data: {
      name: data.name ?? existing.name,
      email: data.email ?? existing.email,
      password: data.password ?? existing.password,
      role: data.role ?? existing.role,
      phone: data.phone ?? existing.phone,
      birth_date: data.birth_date ?? existing.birth_date,
      gender: data.gender ?? existing.gender,
      cpf: data.cpf ?? existing.cpf,
      blood_type: normalizeBloodType(data.blood_type) as any,
      cep: data.cep ?? existing.cep,
      address: data.address ?? existing.address,
      city: data.city ?? existing.city,
      state: data.state ?? existing.state,
      availability: data.availability ?? existing.availability,
      skills: data.skills ?? existing.skills,
      emergency_contact: data.emergency_contact ?? existing.emergency_contact,
      updated_at: new Date(),
    },
  });
};

export const getAllUsers = async (): Promise<Omit<User, "password">[]> => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      birth_date: true,
      gender: true,
      cpf: true,
      blood_type: true,
      cep: true,
      address: true,
      city: true,
      state: true,
      availability: true,
      skills: true,
      emergency_contact: true,
      created_at: true,
      updated_at: true,
    },
  });
};

export const getUser = async (
  id: string
): Promise<Omit<User, "password"> | null> => {
  return prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      birth_date: true,
      gender: true,
      cpf: true,
      blood_type: true,
      cep: true,
      address: true,
      city: true,
      state: true,
      availability: true,
      skills: true,
      emergency_contact: true,
      created_at: true,
      updated_at: true,
    },
  });
};

function normalizeBloodType(type?: string | null) {
  if (!type) return null;

  const map: Record<string, string> = {
    "A+": "A_pos",
    "A-": "A_neg",
    "B+": "B_pos",
    "B-": "B_neg",
    "AB+": "AB_pos",
    "AB-": "AB_neg",
    "O+": "O_pos",
    "O-": "O_neg",
  };

  return map[type] ?? null;
}
