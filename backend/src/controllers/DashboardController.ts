import { Request, Response } from "express";
import { DashboardService } from "../services/DashboardService";

const service = new DashboardService();

export class DashboardController {

  async resumo(req: Request, res: Response) {

    try {

      const dashboard = await service.obterResumo();

      return res.json(dashboard);

    } catch (error) {

      return res.status(500).json({
        erro: "Erro ao carregar dashboard",
        detalhe: error
      });

    }

  }

}