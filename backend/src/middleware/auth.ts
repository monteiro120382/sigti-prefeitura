import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: number;
  perfil: string;
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export function auth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      erro: "Token não informado.",
    });
    return;
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    res.status(401).json({
      erro: "Token não informado.",
    });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Erro ao validar JWT:", error);

    res.status(401).json({
      erro: "Token inválido.",
    });
    return;
  }
}