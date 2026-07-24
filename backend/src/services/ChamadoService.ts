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
        }
      }
    });
  }

  async atualizar(id: number, data: any) {
    return prisma.chamado.update({
      where: {
        id
      },
      data,
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

  async remover(id: number) {
    return prisma.chamado.delete({
      where: {
        id
      }
    });
  }

}