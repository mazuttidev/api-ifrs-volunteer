import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    message: "Unhandled Error",
    url: req.originalUrl,
    method: req.method,
    error: err.message,
    stack: err.stack,
  });

  res.status(500).json({ error: "Internal server error" });
};
