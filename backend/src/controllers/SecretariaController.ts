import { Request, Response, NextFunction } from "express";
import { SecretariaService } from "../services/SecretariaService";

const service = new SecretariaService();

export class SecretariaController {

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { nome, sigla } = req.body;

      const secretaria = await service.create(nome, sigla);

      return res.status(201).json(secretaria);

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
      const secretarias = await service.list();

      return res.json(secretarias);

    } catch (error) {
      next(error);
    }
  }

}