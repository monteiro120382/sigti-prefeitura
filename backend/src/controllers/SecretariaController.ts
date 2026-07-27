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

      return res.status(201).json({
        success: true,
        message: "Secretaria cadastrada com sucesso.",
        data: secretaria,
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
      const secretarias = await service.list();

      return res.status(200).json({
        success: true,
        message: "Secretarias listadas com sucesso.",
        data: secretarias,
      });

    } catch (error) {
      next(error);
    }
  }

}