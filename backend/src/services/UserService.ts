import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

export class UserService {
  async create(data: {
    nome: string;
    email: string;
    senha: string;
    perfil?: string;
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
        perfil: data.perfil || "ADMIN",
      },
    });

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
    };
  }
}
