import { PrismaClient, Perfil } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@sigti.local",
    },
    update: {
      nome: "Administrador",
      senha: senhaHash,
      perfil: Perfil.ADMIN,
      ativo: true,
    },
    create: {
      nome: "Administrador",
      email: "admin@sigti.local",
      senha: senhaHash,
      perfil: Perfil.ADMIN,
      ativo: true,
    },
  });

  console.log("✅ Usuário administrador criado/atualizado com sucesso!");
  console.log("E-mail: admin@sigti.local");
  console.log("Senha: 123456");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
