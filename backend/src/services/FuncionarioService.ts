import prisma from "../lib/prisma";

export class FuncionarioService {

  async criar(data: any) {
    return prisma.funcionario.create({
      data,
      include: {
        secretaria: true,
        setor: true
      }
    });
  }

  async listar() {
    return prisma.funcionario.findMany({
      include: {
        secretaria: true,
        setor: true
      },
      orderBy: {
        nome: "asc"
      }
    });
  }

  async buscarPorId(id: number) {
    return prisma.funcionario.findUnique({
      where: { id },
      include: {
        secretaria: true,
        setor: true
      }
    });
  }

  async atualizar(id: number, data: any) {
    return prisma.funcionario.update({
      where: { id },
      data,
      include: {
        secretaria: true,
        setor: true
      }
    });
  }

  async remover(id: number) {
    return prisma.funcionario.delete({
      where: { id }
    });
  }

}
