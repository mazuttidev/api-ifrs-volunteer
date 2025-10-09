import bcrypt from "bcryptjs";
import { User } from "../types/User";
import { User as userModel } from "../models/userModel";

export const registerUser = async (data: Omit<User, "id">): Promise<string> => {
  const user = new userModel(data);
  let existingUser = await userModel.findByEmail(data.email!);
  if (existingUser) throw new Error("E-mail já cadastrado.");
  existingUser = await userModel.findByCPF(data.cpf!);
  if (existingUser) throw new Error("CPF já cadastrado.");

  user.password = await bcrypt.hash(user.password, 10);

  let insertId = await user.save();

  return insertId;
};

export const updateUser = async (id: string, data: Partial<User>): Promise<void> => {
  const user = new userModel({ id, data});
  let existingUser = null;
  let hashedPassword = "";
  if (data.email) existingUser = await userModel.findByEmail(data.email);
  if (existingUser) throw new Error("E-mail já cadastrado.");
  if (data.cpf) existingUser = await userModel.findByCPF(data.cpf);
  if (existingUser) throw new Error("CPF já cadastrado.");
  if (data.password) hashedPassword = await bcrypt.hash(data.password, 10);

  await user.update(data);
};

export async function getAllUsers(): Promise<Omit<User, "password">[]> {
  const users = await userModel.findAll();
  return users;
}

export async function getUser(id: string): Promise<Omit<User, "password"> | null> {
  const user = await userModel.findById(id);
  return user;
}
