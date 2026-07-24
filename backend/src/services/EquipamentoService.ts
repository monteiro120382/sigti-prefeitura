import prisma from "../lib/prisma";

export class EquipamentoService {

  async criar(data: any) {
    return prisma.equipamento.create({
      data,
      include: {
        secretaria: true,
        setor: true,
        funcionario: true
      }
    });
  }

  async listar() {
    return prisma.equipamento.findMany({
      include: {
        secretaria: true,
        setor: true,
        funcionario: true
      },
      orderBy: {
        patrimonio: "asc"
      }
    });
  }

  async buscarPorId(id: number) {
    return prisma.equipamento.findUnique({
      where: { id },
      include: {
        secretaria: true,
        setor: true,
        funcionario: true
      }
    });
  }

  async atualizar(id: number, data: any) {
    return prisma.equipamento.update({
      where: { id },
      data,
      include: {
        secretaria: true,
        setor: true,
        funcionario: true
      }
    });
  }

  async remover(id: number) {
    return prisma.equipamento.delete({
      where: { id }
    });
  }

}