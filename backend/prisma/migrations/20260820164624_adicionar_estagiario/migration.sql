/*
  Warnings:

  - The values [ADMIN,TECNICO,SOLICITANTE] on the enum `StatusEquipamento` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "Perfil" ADD VALUE 'ESTAGIARIO';

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
