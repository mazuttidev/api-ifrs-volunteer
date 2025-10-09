import { Request, Response } from "express";
import { userSchema } from "../schemas/userSchema";
import * as userService from "../services/userService";

export async function createUser(req: Request, res: Response) {
  try {
    const data = userSchema.parse(req.body);
    const user = await userService.registerUser(data);

    res.status(201).json({ userId: user });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ errors: err.message });
    }
    return res.status(500).json({ error: "Erro interno: " + err.message });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (err: any) {
    return res.status(500).json({ message: "Erro ao buscar usuários." });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const users = await userService.getUser(req.params.id);
    if (!users) return res.status(404).json({ message: "Nenhum usuário não encontrado." });
    return res.status(200).json(users);
  } catch (err: any) {
    return res.status(500).json({ message: "Erro ao buscar usuário." });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;  
    const data = userSchema.partial().parse(req.body);
    data.id = id;
    await userService.updateUser(data);

    res.status(200).json({ message: "Usuário atualizado com sucesso." });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ errors: err.message });
    }
    return res.status(500).json({ error: "Erro interno: " + err.message });
  }
}