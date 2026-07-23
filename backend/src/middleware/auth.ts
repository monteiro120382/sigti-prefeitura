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
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      erro: "Token não informado.",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      erro: "Token inválido.",
    });
  }
}
