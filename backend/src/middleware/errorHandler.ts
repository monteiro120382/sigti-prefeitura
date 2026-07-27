import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("=== ERROR ===");
  console.dir(error, { depth: null });

  // Erros lançados manualmente
  if (error instanceof Error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  // Erros do Prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return res.status(409).json({
          success: false,
          message: "Registro já existe.",
        });

      case "P2003":
        return res.status(400).json({
          success: false,
          message: "Relacionamento inválido.",
        });

      case "P2025":
        return res.status(404).json({
          success: false,
          message: "Registro não encontrado.",
        });
    }
  }

  return res.status(500).json({
    success: false,
    message: "Erro interno do servidor.",
  });
}