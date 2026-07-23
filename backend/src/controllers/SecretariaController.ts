import { Request, Response } from "express";
import { SecretariaService } from "../services/SecretariaService";

const service = new SecretariaService();

export class SecretariaController {

  async create(req: Request, res: Response) {
    const { nome, sigla } = req.body;

    const secretaria = await service.create(nome, sigla);

    return res.status(201).json(secretaria);
  }

  async list(req: Request, res: Response) {
    const secretarias = await service.list();

    return res.json(secretarias);
  }
}
