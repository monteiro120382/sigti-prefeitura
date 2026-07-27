import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

export function authorize(perfis: string[]) {

  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void => {

    if (!req.user) {
      res.status(401).json({
        erro: "Usuário não autenticado."
      });
      return;
    }

    if (!perfis.includes(req.user.perfil)) {
      res.status(403).json({
        erro: "Acesso negado."
      });
      return;
    }

    next();

  };

}