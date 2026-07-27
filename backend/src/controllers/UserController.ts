import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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
      next(error);
    }
  }

}