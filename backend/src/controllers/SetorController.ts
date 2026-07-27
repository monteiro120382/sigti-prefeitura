import { Request, Response, NextFunction } from "express";
import { SetorService } from "../services/SetorService";

const service = new SetorService();

export class SetorController {

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { nome, sigla, secretariaId } = req.body;

      const setor = await service.create(
        nome,
        sigla,
        Number(secretariaId)
      );

      return res.status(201).json(setor);

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
      const setores = await service.list();

      return res.json(setores);

    } catch (error) {
      next(error);
    }
  }

  async listBySecretaria(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { secretariaId } = req.params;

      const setores = await service.listBySecretaria(
        Number(secretariaId)
      );

      return res.json(setores);

    } catch (error) {
      next(error);
    }
  }

}