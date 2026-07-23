import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      const resultado = await authService.login(email, senha);

      return res.json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({
          erro: error.message,
        });
      }

      return res.status(500).json({
        erro: "Erro interno do servidor.",
      });
    }
  }
}
