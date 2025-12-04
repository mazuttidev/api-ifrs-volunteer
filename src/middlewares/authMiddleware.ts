import { Request, Response, NextFunction } from "express";
import { config } from "../config";
import jwt from "jsonwebtoken";
import { logger } from "../lib/logger";


interface JwtPayload {
  id: number;
  email: string;
  role: "admin" | "organizer" | "volunteer";
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logger.warn({
      message: "Token não informado",
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
    });

    return res.status(401).json({ message: "Token não informado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    logger.info({
      message: "Usuário autenticado",
      userId: decoded.id,
      email: decoded.email,
      role: decoded.role,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
    });

    req.user = decoded;
    next();
  } catch (err) {
    logger.error({
      message: "Falha na validação do token",
      error: (err as Error).message,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      token,
    });

    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
