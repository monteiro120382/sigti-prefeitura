import prisma from "../lib/prisma";

const usuarioSelect = {
  id: true,
  nome: true,
  email: true,
  perfil: true,
  ativo: true
};

export class MovimentacaoPatrimonioService {

  async criar(data: any) {
    return prisma.movimentacaoPatrimonio.create({
      data,
      include: {
        equipamento: true,
        usuario: {
          select: usuarioSelect
        }
      }
    });
  }


  async listar() {
    return prisma.movimentacaoPatrimonio.findMany({
      include: {
        equipamento: true,
        usuario: {
          select: usuarioSelect
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }


  async buscarPorId(id: number) {
    return prisma.movimentacaoPatrimonio.findUnique({
      where: {
        id
      },
      include: {
        equipamento: true,
        usuario: {
          select: usuarioSelect
        }
      }
    });
  }


  async remover(id: number) {
    return prisma.movimentacaoPatrimonio.delete({
      where: {
        id
      }
    });
  }


  async entregar(data: any) {

    return prisma.$transaction(async (tx) => {

      await tx.equipamento.update({
        where: {
          id: data.equipamentoId
        },
        data: {
          funcionarioId: data.funcionarioId,
          status: "EM_USO"
        }
      });


      return tx.movimentacaoPatrimonio.create({
        data: {
          equipamentoId: data.equipamentoId,
          usuarioId: data.usuarioId,
          tipo: "ENTREGA",
          observacao: data.observacao
        },
        include: {
          equipamento: true,
          usuario: {
            select: usuarioSelect
          }
        }
      });

    });

  }


  async transferir(data: any) {

    return prisma.$transaction(async (tx) => {

      await tx.equipamento.update({
        where: {
          id: data.equipamentoId
        },
        data: {
          secretariaId: data.secretariaId,
          setorId: data.setorId
        }
      });


      return tx.movimentacaoPatrimonio.create({
        data: {
          equipamentoId: data.equipamentoId,
          usuarioId: data.usuarioId,
          tipo: "TRANSFERENCIA",
          observacao: data.observacao
        },
        include: {
          equipamento: true,
          usuario: {
            select: usuarioSelect
          }
        }
      });

    });

  }


  async devolver(data: any) {

    return prisma.$transaction(async (tx) => {

      await tx.equipamento.update({
        where: {
          id: data.equipamentoId
        },
        data: {
          funcionarioId: null,
          status: "ESTOQUE"
        }
      });


      return tx.movimentacaoPatrimonio.create({
        data: {
          equipamentoId: data.equipamentoId,
          usuarioId: data.usuarioId,
          tipo: "DEVOLUCAO",
          observacao: data.observacao
        },
        include: {
          equipamento: true,
          usuario: {
            select: usuarioSelect
          }
        }
      });

    });

  }

}
