/*
  Warnings:

  - A unique constraint covering the columns `[tombamento]` on the table `Equipamento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoria` to the `Equipamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Equipamento" ADD COLUMN     "categoria" TEXT NOT NULL,
ADD COLUMN     "dataAquisicao" TIMESTAMP(3),
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'BOM',
ADD COLUMN     "fabricante" TEXT,
ADD COLUMN     "fornecedor" TEXT,
ADD COLUMN     "garantiaAte" TIMESTAMP(3),
ADD COLUMN     "localizacao" TEXT,
ADD COLUMN     "notaFiscal" TEXT,
ADD COLUMN     "proximaManutencao" TIMESTAMP(3),
ADD COLUMN     "tombamento" TEXT,
ADD COLUMN     "ultimaManutencao" TIMESTAMP(3),
ADD COLUMN     "valorAquisicao" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "Equipamento_tombamento_key" ON "Equipamento"("tombamento");
