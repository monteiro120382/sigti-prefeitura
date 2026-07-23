import prisma from "../lib/prisma";

export class SecretariaService {

  async create(nome: string, sigla: string) {
    return prisma.secretaria.create({
      data: {
        nome,
        sigla
      }
    });
  }

  async list() {
    return prisma.secretaria.findMany({
      orderBy: {
        nome: "asc"
      }
    });
  }

  async findById(id: number) {
    return prisma.secretaria.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, nome: string, sigla: string) {
    return prisma.secretaria.update({
      where: {
        id
      },
      data: {
        nome,
        sigla
      }
    });
  }

  async delete(id: number) {
    return prisma.secretaria.delete({
      where: {
        id
      }
    });
  }
}
