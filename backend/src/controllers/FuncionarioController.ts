import { Request, Response } from "express";
import { FuncionarioService } from "../services/FuncionarioService";

const service = new FuncionarioService();

export class FuncionarioController {

  async criar(req: Request, res: Response) {
    try {
      const funcionario = await service.criar(req.body);
      return res.status(201).json(funcionario);

    } catch (error) {
      return res.status(400).json({
        erro: "Erro ao criar funcionário",
        detalhe: error
      });
    }
  }


  async listar(req: Request, res: Response) {
    const funcionarios = await service.listar();
    return res.json(funcionarios);
  }


  async buscar(req: Request, res: Response) {
    const funcionario = await service.buscarPorId(
      Number(req.params.id)
    );

    return res.json(funcionario);
  }


  async atualizar(req: Request, res: Response) {
    const funcionario = await service.atualizar(
      Number(req.params.id),
      req.body
    );

    return res.json(funcionario);
  }


  async remover(req: Request, res: Response) {
    await service.remover(
      Number(req.params.id)
    );

    return res.json({
      mensagem: "Funcionário removido"
    });
  }

}
