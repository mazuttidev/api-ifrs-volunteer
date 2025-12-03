import { Request, Response, NextFunction } from "express";
import { config } from "../config";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
  role: "admin" | "organizer" | "volunteer";
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não informado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}