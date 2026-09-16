/*
  Warnings:

  - The values [ADMIN,TECNICO,SOLICITANTE] on the enum `StatusEquipamento` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[tombamento]` on the table `Equipamento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoria` to the `Equipamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusEquipamento_new" AS ENUM ('EM_USO', 'ESTOQUE', 'MANUTENCAO', 'BAIXADO');
ALTER TABLE "public"."Equipamento" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Equipamento" ALTER COLUMN "status" TYPE "StatusEquipamento_new" USING ("status"::text::"StatusEquipamento_new");
ALTER TYPE "StatusEquipamento" RENAME TO "StatusEquipamento_old";
ALTER TYPE "StatusEquipamento_new" RENAME TO "StatusEquipamento";
DROP TYPE "public"."StatusEquipamento_old";
ALTER TABLE "Equipamento" ALTER COLUMN "status" SET DEFAULT 'EM_USO';
COMMIT;

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
