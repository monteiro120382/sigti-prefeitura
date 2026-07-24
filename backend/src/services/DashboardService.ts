import prisma from "../lib/prisma";

export class DashboardService {

  async obterResumo() {

    const [
      usuarios,
      secretarias,
      setores,
      funcionarios,
      equipamentos,
      chamadosAbertos,
      chamadosEmAtendimento,
      chamadosFinalizados,
      chamadosAlta,
      chamadosMedia,
      chamadosBaixa
    ] = await Promise.all([

      prisma.user.count(),

      prisma.secretaria.count(),

      prisma.setor.count(),

      prisma.funcionario.count(),

      prisma.equipamento.count(),

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
          status: "FINALIZADO"
        }
      }),

      prisma.chamado.count({
        where: {
          prioridade: "ALTA"
        }
      }),

      prisma.chamado.count({
        where: {
          prioridade: "MEDIA"
        }
      }),

      prisma.chamado.count({
        where: {
          prioridade: "BAIXA"
        }
      })

    ]);

    return {

      usuarios,

      secretarias,

      setores,

      funcionarios,

      equipamentos,

      chamados: {

        abertos: chamadosAbertos,

        emAtendimento: chamadosEmAtendimento,

        finalizados: chamadosFinalizados

      },

      prioridades: {

        alta: chamadosAlta,

        media: chamadosMedia,

        baixa: chamadosBaixa

      }

    };

  }

}