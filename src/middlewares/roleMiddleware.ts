import { Request, Response, NextFunction } from "express";

export function authorizeRoles(...allowedRoles: ("admin" | "organizer" | "volunteer")[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(403).json({ message: "Usuário não autenticado" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Usuário não autorizado" });
    }

    next();
  };
}