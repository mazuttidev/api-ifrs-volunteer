import bcrypt from "bcryptjs";
import { User } from "../types/User";
import { User as userModel } from "../models/userModel";

export const registerUser = async (data: Partial<User>): Promise<string> => {
  if (!data.password || !data.name || !data.email || !data.cpf) throw new Error("Os campos nome, e-mail e senha são obrigatórios.");
  let existingUser = await userModel.findByEmail(data.email!);
  if (existingUser) throw new Error("E-mail já cadastrado.");
  existingUser = await userModel.findByCPF(data.cpf!);
  if (existingUser) throw new Error("CPF já cadastrado.");

  let hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  const user = new userModel(data);
  let insertId = await user.save();

  return insertId;
};

export const updateUser = async (data: Partial<User>): Promise<void> => {
  const user = new userModel(data);
  let existingUser = null;
  let hashedPassword = "";
  if (data.email) existingUser = await userModel.findByEmail(data.email);
  if (existingUser) throw new Error("E-mail já cadastrado.");
  if (data.cpf) existingUser = await userModel.findByCPF(data.cpf);
  if (existingUser) throw new Error("CPF já cadastrado.");
  if (data.password) {
    hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
  }

  await user.update(data);
};

export async function getAllUsers(): Promise<Omit<User, "password">[] | null> {
  let users = await userModel.findAll();
  // @ts-ignore
  return users;
}

export async function getUser(id: string): Promise<Omit<User, "password"> | null> {
  let user = await userModel.findById(id);
  // @ts-ignore
  return user;
}
