import prisma from "../lib/prisma";

export class ManutencaoService {

  async criar(data: any) {

    return prisma.$transaction(async (tx) => {

      await tx.equipamento.update({
        where: {
          id: data.equipamentoId
        },
        data: {
          status: "MANUTENCAO"
        }
      });

      return tx.manutencao.create({
        data,
        include: {
          equipamento: true,
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true,
              perfil: true,
              ativo: true
            }
          }
        }
      });

    });

  }

  async listar() {

    return prisma.manutencao.findMany({
      include: {
        equipamento: true,
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            perfil: true,
            ativo: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

  }

  async buscarPorId(id: number) {

    return prisma.manutencao.findUnique({
      where: {
        id
      },
      include: {
        equipamento: true,
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            perfil: true,
            ativo: true
          }
        }
      }
    });

  }

  async finalizar(id: number, data: any) {

    return prisma.$transaction(async (tx) => {

      const manutencao = await tx.manutencao.findUnique({
        where: {
          id
        },
        include: {
          equipamento: true
        }
      });

      if (!manutencao) {
        throw new Error("Manutenção não encontrada.");
      }

      await tx.equipamento.update({
        where: {
          id: manutencao.equipamentoId
        },
        data: {
          status: manutencao.equipamento.funcionarioId
            ? "EM_USO"
            : "ESTOQUE"
        }
      });

      return tx.manutencao.update({
        where: {
          id
        },
        data: {
          dataRetorno: new Date(),
          observacao: data.observacao ?? manutencao.observacao
        },
        include: {
          equipamento: true,
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true,
              perfil: true,
              ativo: true
            }
          }
        }
      });

    });

  }

  async remover(id: number) {

    return prisma.manutencao.delete({
      where: {
        id
      }
    });

  }

}