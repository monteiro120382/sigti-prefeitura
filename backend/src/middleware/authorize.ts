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
    
   console.log("=== DEBUG AUTHORIZE ===");
console.log("req.user:", req.user);
console.log("perfis permitidos:", perfis);
console.log("perfil recebido:", req.user.perfil);
console.log("=======================");

    if (!perfis.includes(req.user.perfil)) {
      res.status(403).json({
        erro: "Acesso negado."
      });
      return;
    }
  console.log("=== AUTHORIZE OK ===");
console.log("Autorização liberada para:", req.user);
console.log("====================");    




    next();

  };

}
