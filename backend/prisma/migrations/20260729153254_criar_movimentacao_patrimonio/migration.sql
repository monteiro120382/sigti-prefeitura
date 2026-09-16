/*
  Warnings:

  - You are about to drop the column `categoria` on the `Equipamento` table. All the data in the column will be lost.
  - You are about to drop the column `dataAquisicao` on the `Equipamento` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Equipamento` table. All the data in the column will be lost.
  - You are about to drop the column `fabricante` on the `Equipamento` table. All the data in the column will be lost.
  - You are about to drop the column `fornecedor` on the `Equipamento` table. All the data in the column will be lost.
  - You are about to drop the column `garantiaAte` on the `Equipamento` table. All the data in the column will be lost.
  - You are about to drop the column `localizacao` on the `Equipamento` table. All the data in the column will be lost.
  - You are about to drop the column `notaFiscal` on the `Equipamento` table. All the data in the column will be lost.
  - You are about to drop the column `proximaManutencao` on the `Equipamento` table. All the data in the column will be lost.
  - You are about to drop the column `tombamento` on the `Equipamento` table. All the data in the column will be lost.
  - You are about to drop the column `ultimaManutencao` on the `Equipamento` table. All the data in the column will be lost.
  - You are about to drop the column `valorAquisicao` on the `Equipamento` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoMovimentacao" AS ENUM ('ENTREGA', 'TRANSFERENCIA', 'DEVOLUCAO', 'MANUTENCAO', 'RETORNO_MANUTENCAO', 'BAIXA');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "StatusEquipamento" ADD VALUE 'ADMIN';
ALTER TYPE "StatusEquipamento" ADD VALUE 'TECNICO';
ALTER TYPE "StatusEquipamento" ADD VALUE 'SOLICITANTE';

-- DropIndex
DROP INDEX "Equipamento_tombamento_key";

-- AlterTable
ALTER TABLE "Equipamento" DROP COLUMN "categoria",
DROP COLUMN "dataAquisicao",
DROP COLUMN "estado",
DROP COLUMN "fabricante",
DROP COLUMN "fornecedor",
DROP COLUMN "garantiaAte",
DROP COLUMN "localizacao",
DROP COLUMN "notaFiscal",
DROP COLUMN "proximaManutencao",
DROP COLUMN "tombamento",
DROP COLUMN "ultimaManutencao",
DROP COLUMN "valorAquisicao";

-- CreateTable
CREATE TABLE "MovimentacaoPatrimonio" (
    "id" SERIAL NOT NULL,
    "equipamentoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "tipo" "TipoMovimentacao" NOT NULL,
    "observacao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovimentacaoPatrimonio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovimentacaoPatrimonio" ADD CONSTRAINT "MovimentacaoPatrimonio_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoPatrimonio" ADD CONSTRAINT "MovimentacaoPatrimonio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
