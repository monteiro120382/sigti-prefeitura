import prisma from "../lib/prisma";

export class RelatorioService {

  async resumoChamados() {

    const [
      totalChamados,
      chamadosAbertos,
      chamadosEmAtendimento,
      chamadosAguardando,
      chamadosFinalizados,
      chamadosCancelados,
      totalEquipamentos,
      equipamentosEmUso,
      equipamentosEstoque,
      equipamentosManutencao
    ] = await Promise.all([

      prisma.chamado.count(),

      prisma.chamado.count({
        where: {
          status: "ABERTO"
        }
      }),

      prisma.chamado.count({
        where: {
          status: "EM_ATENDIMENTO"
        }
      }),

      prisma.chamado.count({
        where: {
          status: "AGUARDANDO"
        }
      }),

      prisma.chamado.count({
        where: {
          status: "FINALIZADO"
        }
      }),

      prisma.chamado.count({
        where: {
          status: "CANCELADO"
        }
      }),

      prisma.equipamento.count(),

      prisma.equipamento.count({
        where: {
          status: "EM_USO"
        }
      }),

      prisma.equipamento.count({
        where: {
          status: "ESTOQUE"
        }
      }),

      prisma.equipamento.count({
        where: {
          status: "MANUTENCAO"
        }
      })

    ]);

    return {

      chamados: {
        total: totalChamados,
        abertos: chamadosAbertos,
        emAtendimento: chamadosEmAtendimento,
        aguardando: chamadosAguardando,
        finalizados: chamadosFinalizados,
        cancelados: chamadosCancelados
      },

      equipamentos: {
        total: totalEquipamentos,
        emUso: equipamentosEmUso,
        estoque: equipamentosEstoque,
        manutencao: equipamentosManutencao
      }

    };

  }

  async porTecnico() {

    const tecnicos = await prisma.user.findMany({

      where: {
        perfil: {
          in: ["ADMIN", "TECNICO", "ESTAGIARIO"]
        }
      },

      select: {
        id: true,
        nome: true,
        email: true,

        chamadosAtendidos: {
          select: {
            id: true,
            status: true
          }
        }
      },

      orderBy: {
        nome: "asc"
      }

    });

    return tecnicos.map((tecnico) => {

      const chamados = tecnico.chamadosAtendidos;

      return {
        id: tecnico.id,
        nome: tecnico.nome,
        email: tecnico.email,

        total: chamados.length,

        abertos: chamados.filter(
          (chamado) => chamado.status === "ABERTO"
        ).length,

        emAtendimento: chamados.filter(
          (chamado) => chamado.status === "EM_ATENDIMENTO"
        ).length,

        aguardando: chamados.filter(
          (chamado) => chamado.status === "AGUARDANDO"
        ).length,

        finalizados: chamados.filter(
          (chamado) => chamado.status === "FINALIZADO"
        ).length,

        cancelados: chamados.filter(
          (chamado) => chamado.status === "CANCELADO"
        ).length
      };

    });

  }

  async porSecretaria() {

    const secretarias = await prisma.secretaria.findMany({

      select: {
        id: true,
        nome: true,
        sigla: true,

        chamados: {
          select: {
            id: true,
            status: true
          }
        }
      },

      orderBy: {
        nome: "asc"
      }

    });

    return secretarias.map((secretaria) => {

      const chamados = secretaria.chamados;

      return {

        id: secretaria.id,
        nome: secretaria.nome,
        sigla: secretaria.sigla,

        total: chamados.length,

        abertos: chamados.filter(
          (chamado) => chamado.status === "ABERTO"
        ).length,

        emAtendimento: chamados.filter(
          (chamado) => chamado.status === "EM_ATENDIMENTO"
        ).length,

        aguardando: chamados.filter(
          (chamado) => chamado.status === "AGUARDANDO"
        ).length,

        finalizados: chamados.filter(
          (chamado) => chamado.status === "FINALIZADO"
        ).length,

        cancelados: chamados.filter(
          (chamado) => chamado.status === "CANCELADO"
        ).length

      };

    });

  }

  async chamadosRecentes() {

    return prisma.chamado.findMany({

      take: 10,

      orderBy: {
        createdAt: "desc"
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
            email: true
          }
        },

        tecnico: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }

      }

    });

  }

  async porPeriodo(
    dataInicial: string | undefined,
    dataFinal: string | undefined
  ) {

    const dataInicio = dataInicial
      ? new Date(dataInicial)
      : new Date(0);

    const dataFim = dataFinal
      ? new Date(dataFinal)
      : new Date();

    const chamados = await prisma.chamado.findMany({

      where: {
        createdAt: {
          gte: dataInicio,
          lte: dataFim
        }
      },

      select: {
        id: true,
        status: true,
        tecnicoId: true,
        secretariaId: true
      }

    });

    const total = chamados.length;

    const abertos = chamados.filter(
      (chamado) => chamado.status === "ABERTO"
    ).length;

    const emAtendimento = chamados.filter(
      (chamado) => chamado.status === "EM_ATENDIMENTO"
    ).length;

    const aguardando = chamados.filter(
      (chamado) => chamado.status === "AGUARDANDO"
    ).length;

    const finalizados = chamados.filter(
      (chamado) => chamado.status === "FINALIZADO"
    ).length;

    const cancelados = chamados.filter(
      (chamado) => chamado.status === "CANCELADO"
    ).length;

    return {
      total,
      abertos,
      emAtendimento,
      aguardando,
      finalizados,
      cancelados
    };

  }

}
