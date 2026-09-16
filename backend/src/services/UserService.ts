import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { Perfil } from "@prisma/client";

export class UserService {
  async create(data: {
    nome: string;
    email: string;
    senha: string;
    perfil?: Perfil;
  }) {
    const usuarioExiste = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (usuarioExiste) {
      throw new Error("E-mail já cadastrado.");
    }

    const senhaHash = await bcrypt.hash(data.senha, 10);

    const usuario = await prisma.user.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: senhaHash,
        perfil: data.perfil ?? Perfil.ADMIN,
      },
    });

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
      ativo: usuario.ativo,
    };
  }

  async cadastrarSolicitante(data: {
    nome: string;
    email: string;
    senha: string;
  }) {
    const usuarioExiste = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (usuarioExiste) {
      throw new Error("E-mail já cadastrado.");
    }

    const senhaHash = await bcrypt.hash(data.senha, 10);

    const usuario = await prisma.user.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: senhaHash,
        perfil: Perfil.SOLICITANTE,
        ativo: true,
      },
    });

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
      ativo: usuario.ativo,
    };
  }

  async listar() {
    return prisma.user.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
        ativo: true,
        createdAt: true,
      },
      orderBy: {
        nome: "asc",
      },
    });
  }

  async buscarPorId(id: number) {
    const usuario = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
        ativo: true,
        createdAt: true,
      },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    return usuario;
  }

  async atualizar(
    id: number,
    data: {
      nome?: string;
      email?: string;
      perfil?: Perfil;
      ativo?: boolean;
    }
  ) {
    const usuario = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    if (data.email) {
      const emailExiste = await prisma.user.findFirst({
        where: {
          email: data.email,
          id: {
            not: id,
          },
        },
      });

      if (emailExiste) {
        throw new Error("E-mail já cadastrado.");
      }
    }

    const usuarioAtualizado = await prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
        ativo: true,
        createdAt: true,
      },
    });

    return usuarioAtualizado;
  }

  async remover(id: number) {
    const usuario = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      id,
      message: "Usuário removido com sucesso.",
    };
  }

  async resetPassword(id: number, senha: string) {
    const usuario = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuarioAtualizado = await prisma.user.update({
      where: {
        id,
      },
      data: {
        senha: senhaHash,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
        ativo: true,
        createdAt: true,
      },
    });

    return usuarioAtualizado;
  }
}
