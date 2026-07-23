import { Request, Response } from "express";
import { SetorService } from "../services/SetorService";

const service = new SetorService();

export class SetorController {

  async create(req: Request, res: Response) {
    try {
      const { nome, sigla, secretariaId } = req.body;

      const setor = await service.create(
        nome,
        sigla,
        Number(secretariaId)
      );

      return res.status(201).json(setor);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        erro: error instanceof Error ? error.message : "Erro interno"
      });
    }
  }

  async list(req: Request, res: Response) {
    const setores = await service.list();

    return res.json(setores);
  }

  async listBySecretaria(req: Request, res: Response) {
    const { secretariaId } = req.params;

    const setores = await service.listBySecretaria(
      Number(secretariaId)
    );

    return res.json(setores);
  }
}