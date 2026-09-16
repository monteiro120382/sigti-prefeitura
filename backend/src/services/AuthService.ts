import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "./UserService";

const userService = new UserService();

export class AuthService {

  async cadastrarSolicitante(data: {
    nome: string;
    email: string;
    senha: string;
  }) {
    return userService.cadastrarSolicitante(data);
  }

  async login(email: string, senha: string) {

    const usuario = await prisma.user.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaCorreta) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        perfil: usuario.perfil,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "8h",
      }
    );

    return {
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
      },
      token,
    };
  }
}
