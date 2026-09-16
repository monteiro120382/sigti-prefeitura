import {
  Request,
  Response,
  NextFunction
} from "express";

import { RelatorioService } from "../services/RelatorioService";

const service = new RelatorioService();

export class RelatorioController {

  async resumo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const dados =
        await service.resumoChamados();

      return res.status(200).json({
        success: true,
        message:
          "Resumo dos chamados carregado com sucesso.",
        data: dados
      });

    } catch (error) {

      next(error);

    }

  }


  async porTecnico(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const dados =
        await service.porTecnico();

      return res.status(200).json({
        success: true,
        message:
          "Relatório por técnico carregado com sucesso.",
        data: dados
      });

    } catch (error) {

      next(error);

    }

  }


  async porSecretaria(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const dados =
        await service.porSecretaria();

      return res.status(200).json({
        success: true,
        message:
          "Relatório por secretaria carregado com sucesso.",
        data: dados
      });

    } catch (error) {

      next(error);

    }

  }


  async porPeriodo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const dataInicial =
        req.query.dataInicial as string | undefined;

      const dataFinal =
        req.query.dataFinal as string | undefined;

      const dados =
        await service.porPeriodo(
          dataInicial,
          dataFinal
        );

      return res.status(200).json({
        success: true,
        message:
          "Relatório por período carregado com sucesso.",
        data: dados
      });

    } catch (error) {

      next(error);

    }

  }


  async recentes(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const dados =
        await service.chamadosRecentes();

      return res.status(200).json({
        success: true,
        message:
          "Chamados recentes carregados com sucesso.",
        data: dados
      });

    } catch (error) {

      next(error);

    }

  }

}
