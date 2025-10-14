import { Request, Response } from "express";
import { loginSchema } from "../schemas/authSchema";
import * as authService from "../services/authService";
import { userSchema } from "../schemas/userSchema";

export async function register(req: Request, res: Response) {
  try {
    const data = userSchema.parse(req.body);
    // @ts-ignore
    const user = await authService.register(data);
    return res.status(201).json(user);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
}