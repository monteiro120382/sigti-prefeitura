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

  async listar(
    usuarioId?: number,
    perfil?: string
  ) {

    let where: any = {};

    /*
     * SOLICITANTE:
     * visualiza somente os próprios chamados.
     */
    if (perfil === "SOLICITANTE" && usuarioId) {
      where.solicitanteId = usuarioId;
    }

    /*
     * ADMIN, TECNICO e ESTAGIARIO:
     * podem visualizar os chamados do sistema.
     */
    return prisma.chamado.findMany({
      where,

      include: {
        secretaria: true,
        setor: true,
        funcionario: true,
        equipamento: true,

        solicitante: {
          select: {
            id: true,
            nome: true,
            email: true,
            perfil: true
          }
        },

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

  async buscarPorId(
    id: number,
    usuarioId?: number,
    perfil?: string
  ) {

    const chamado = await prisma.chamado.findUnique({
      where: {
        id
      },

      include: {
        secretaria: true,
        setor: true,
        funcionario: true,
        equipamento: true,

        solicitante: {
          select: {
            id: true,
            nome: true,
            email: true,
            perfil: true
          }
        },

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

    if (!chamado) {
      return null;
    }

    /*
     * SOLICITANTE só pode consultar
     * seus próprios chamados.
     */
    if (
      perfil === "SOLICITANTE" &&
      usuarioId &&
      chamado.solicitanteId !== usuarioId
    ) {
      throw new Error(
        "Você não possui permissão para visualizar este chamado."
      );
    }

    return chamado;

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

    const {
      observacao,
      ...dadosChamado
    } = data;

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

        solicitante: {
          select: {
            id: true,
            nome: true,
            email: true,
            perfil: true
          }
        },

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

    /*
     * Registra histórico somente quando
     * o status realmente foi alterado.
     */
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

  async atribuirTecnico(
    chamadoId: number,
    tecnicoId: number,
    usuarioId: number
  ) {

    const chamado = await prisma.chamado.findUnique({
      where: {
        id: chamadoId
      }
    });

    if (!chamado) {
      throw new Error("Chamado não encontrado.");
    }

    /*
     * Verifica se o técnico existe.
     */
    const tecnico = await prisma.user.findUnique({
      where: {
        id: tecnicoId
      }
    });

    if (!tecnico) {
      throw new Error("Técnico não encontrado.");
    }

    /*
     * ADMIN, TECNICO e ESTAGIARIO
     * podem ser responsáveis por chamados.
     */
    if (
      tecnico.perfil !== "TECNICO" &&
      tecnico.perfil !== "ADMIN" &&
      tecnico.perfil !== "ESTAGIARIO"
    ) {
      throw new Error(
        "O usuário informado não possui perfil autorizado para atendimento."
      );
    }

    /*
     * Quando um chamado ABERTO recebe um responsável,
     * ele passa para EM_ATENDIMENTO.
     */
    const novoStatus =
      chamado.status === "ABERTO"
        ? "EM_ATENDIMENTO"
        : chamado.status;

    const chamadoAtualizado = await prisma.chamado.update({
      where: {
        id: chamadoId
      },

      data: {
        tecnicoId,
        status: novoStatus
      },

      include: {
        secretaria: true,
        setor: true,
        funcionario: true,
        equipamento: true,

        solicitante: {
          select: {
            id: true,
            nome: true,
            email: true,
            perfil: true
          }
        },

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

    /*
     * Registra a atribuição no histórico.
     */
    await prisma.chamadoHistorico.create({
      data: {
        chamadoId,
        statusAnterior: chamado.status,
        statusNovo: novoStatus,
        observacao: "Técnico atribuído ao chamado.",
        usuarioId
      }
    });

    return chamadoAtualizado;

  }

  async remover(id: number) {

    const chamado = await prisma.chamado.findUnique({
      where: {
        id
      }
    });

    if (!chamado) {
      throw new Error("Chamado não encontrado.");
    }

    return prisma.chamado.delete({
      where: {
        id
      }
    });

  }

}
