import prisma from "../lib/prisma";

export class ChamadoHistoricoService {

  async criar(data: {
    chamadoId: number;
    statusAnterior?: any;
    statusNovo: any;
    observacao?: string;
    usuarioId?: number;
  }) {

    return prisma.chamadoHistorico.create({
      data: {
        chamadoId: data.chamadoId,
        statusAnterior: data.statusAnterior,
        statusNovo: data.statusNovo,
        observacao: data.observacao,
        usuarioId: data.usuarioId
      },
      include: {
        chamado: {
          select: {
            id: true,
            protocolo: true,
            titulo: true,
            status: true
          }
        },
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            perfil: true
          }
        }
      }
    });

  }

  async listarPorChamado(chamadoId: number) {

    return prisma.chamadoHistorico.findMany({
      where: {
        chamadoId
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            perfil: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

  }

  async buscarPorId(id: number) {

    return prisma.chamadoHistorico.findUnique({
      where: {
        id
      },
      include: {
        chamado: true,
        usuario: true
      }
    });

  }

  async remover(id: number) {

    return prisma.chamadoHistorico.delete({
      where: {
        id
      }
    });

  }

}