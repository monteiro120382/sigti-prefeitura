import { Request, Response, NextFunction } from "express";
import { DashboardService } from "../services/DashboardService";

const service = new DashboardService();

export class DashboardController {

  async resumo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const dashboard = await service.obterResumo();

      return res.status(200).json({
        success: true,
        message: "Resumo do dashboard carregado com sucesso.",
        data: dashboard,
      });

    } catch (error) {
      next(error);
    }
  }

}