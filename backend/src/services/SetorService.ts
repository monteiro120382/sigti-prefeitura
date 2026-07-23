import prisma from "../lib/prisma";

export class SetorService {

  async create(nome: string, sigla: string | undefined, secretariaId: number) {
    return prisma.setor.create({
      data: {
        nome,
        sigla,
        secretariaId,
      },
    });
  }

  async list() {
    return prisma.setor.findMany({
      include: {
        secretaria: true,
      },
      orderBy: {
        nome: "asc",
      },
    });
  }

  async listBySecretaria(secretariaId: number) {
    return prisma.setor.findMany({
      where: {
        secretariaId,
      },
      include: {
        secretaria: true,
      },
    });
  }
}
