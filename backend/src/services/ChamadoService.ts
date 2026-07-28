import prisma from "../lib/prisma";

export class ChamadoService {

  async criar(data: any) {

    const protocolo = `CH-${Date.now()}`;

    return prisma.chamado.create({
      data: {
        protocolo,
        ...data
      },
      include: {
        secretaria: true,
        setor: true,
        funcionario: true,
        equipamento: true,
        tecnico: {
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

  async listar() {

    return prisma.chamado.findMany({
      include: {
        secretaria: true,
        setor: true,
        funcionario: true,
        equipamento: true,
        tecnico: {
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

    return prisma.chamado.findUnique({
      where: {
        id
      },
      include: {
        secretaria: true,
        setor: true,
        funcionario: true,
        equipamento: true,
        tecnico: {
          select: {
            id: true,
            nome: true,
            email: true,
            perfil: true
          }
        },
        historicos: {
          include: {
            usuario: {
              select: {
                id: true,
                nome: true,
                email: true
              }
            }
          },
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    });

  }

  async atualizar(
    id: number,
    data: any,
    usuarioId?: number
  ) {

    const chamadoAtual = await prisma.chamado.findUnique({
      where: {
        id
      }
    });

    if (!chamadoAtual) {
      throw new Error("Chamado não encontrado.");
    }

    // Remove a observação antes de atualizar o chamado
    const { observacao, ...dadosChamado } = data;

    const chamadoAtualizado = await prisma.chamado.update({
      where: {
        id
      },
      data: dadosChamado,
      include: {
        secretaria: true,
        setor: true,
        funcionario: true,
        equipamento: true,
        tecnico: {
          select: {
            id: true,
            nome: true,
            email: true,
            perfil: true
          }
        }
      }
    });

    // Registra histórico somente se o status mudou
    if (
      dadosChamado.status &&
      dadosChamado.status !== chamadoAtual.status
    ) {

      await prisma.chamadoHistorico.create({
        data: {
          chamadoId: id,
          statusAnterior: chamadoAtual.status,
          statusNovo: dadosChamado.status,
          observacao: observacao ?? null,
          usuarioId: usuarioId ?? null
        }
      });

    }

    return chamadoAtualizado;

  }

  async remover(id: number) {

    return prisma.chamado.delete({
      where: {
        id
      }
    });

  }

}