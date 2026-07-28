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

  async listar(page = 1, limit = 10) {

    const skip = (page - 1) * limit;

    const [funcionarios, total] = await Promise.all([

      prisma.funcionario.findMany({
        skip,
        take: limit,
        include: {
          secretaria: true,
          setor: true
        },
        orderBy: {
          nome: "asc"
        }
      }),

      prisma.funcionario.count()

    ]);

    return {
      data: funcionarios,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };

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