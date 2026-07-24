import { Request, Response } from "express";
import { EquipamentoService } from "../services/EquipamentoService";

const service = new EquipamentoService();

export class EquipamentoController {

  async criar(req: Request, res: Response) {
    try {
      const equipamento = await service.criar(req.body);

      return res.status(201).json(equipamento);

    } catch (error) {

      return res.status(400).json({
        erro: error instanceof Error ? error.message : "Erro ao cadastrar equipamento"
      });

    }
  }

  async listar(req: Request, res: Response) {
    const equipamentos = await service.listar();

    return res.json(equipamentos);
  }

  async buscar(req: Request, res: Response) {
    const equipamento = await service.buscarPorId(
      Number(req.params.id)
    );

    return res.json(equipamento);
  }

  async atualizar(req: Request, res: Response) {
    const equipamento = await service.atualizar(
      Number(req.params.id),
      req.body
    );

    return res.json(equipamento);
  }

  async remover(req: Request, res: Response) {
    await service.remover(
      Number(req.params.id)
    );

    return res.json({
      mensagem: "Equipamento removido com sucesso."
    });
  }

}