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

      return res.status(201).json({
        success: true,
        message: "Usuário criado com sucesso.",
        data: usuario,
      });

    } catch (error) {
      next(error);
    }
  }

  async list(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const usuarios = await userService.listar();

      return res.status(200).json({
        success: true,
        message: "Usuários listados com sucesso.",
        data: usuarios,
      });

    } catch (error) {
      next(error);
    }
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const usuario = await userService.buscarPorId(
        Number(req.params.id)
      );

      return res.status(200).json({
        success: true,
        message: "Usuário encontrado com sucesso.",
        data: usuario,
      });

    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const usuario = await userService.atualizar(
        Number(req.params.id),
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Usuário atualizado com sucesso.",
        data: usuario,
      });

    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      await userService.remover(
        Number(req.params.id)
      );

      return res.status(200).json({
        success: true,
        message: "Usuário removido com sucesso.",
      });

    } catch (error) {
      next(error);
    }
  }

  async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const { senha } = req.body;

      const usuario = await userService.resetPassword(
        Number(req.params.id),
        senha
      );

      return res.status(200).json({
        success: true,
        message: "Senha redefinida com sucesso.",
        data: usuario,
      });

    } catch (error) {
      next(error);
    }
  }

}