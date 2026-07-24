/*
  Warnings:

  - Made the column `cargo` on table `Funcionario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Funcionario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `Funcionario` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Prioridade" AS ENUM ('BAIXA', 'MEDIA', 'ALTA', 'URGENTE');

-- CreateEnum
CREATE TYPE "StatusChamado" AS ENUM ('ABERTO', 'EM_ATENDIMENTO', 'AGUARDANDO', 'FINALIZADO', 'CANCELADO');

-- DropForeignKey
ALTER TABLE "Equipamento" DROP CONSTRAINT "Equipamento_funcionarioId_fkey";

-- AlterTable
ALTER TABLE "Equipamento" ALTER COLUMN "funcionarioId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Funcionario" ALTER COLUMN "cargo" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "telefone" SET NOT NULL;

-- CreateTable
CREATE TABLE "Chamado" (
    "id" SERIAL NOT NULL,
    "protocolo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "prioridade" "Prioridade" NOT NULL DEFAULT 'MEDIA',
    "status" "StatusChamado" NOT NULL DEFAULT 'ABERTO',
    "secretariaId" INTEGER NOT NULL,
    "setorId" INTEGER NOT NULL,
    "funcionarioId" INTEGER NOT NULL,
    "equipamentoId" INTEGER,
    "tecnicoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chamado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chamado_protocolo_key" ON "Chamado"("protocolo");

-- AddForeignKey
ALTER TABLE "Chamado" ADD CONSTRAINT "Chamado_secretariaId_fkey" FOREIGN KEY ("secretariaId") REFERENCES "Secretaria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chamado" ADD CONSTRAINT "Chamado_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chamado" ADD CONSTRAINT "Chamado_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chamado" ADD CONSTRAINT "Chamado_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chamado" ADD CONSTRAINT "Chamado_tecnicoId_fkey" FOREIGN KEY ("tecnicoId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipamento" ADD CONSTRAINT "Equipamento_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
