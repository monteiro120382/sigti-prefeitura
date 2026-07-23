import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const { nome, email, senha, perfil } = req.body;

      const usuario = await userService.create({
        nome,
        email,
        senha,
        perfil,
      });

      return res.status(201).json(usuario);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          erro: error.message,
        });
      }

      return res.status(500).json({
        erro: "Erro interno do servidor.",
      });
    }
  }
}
