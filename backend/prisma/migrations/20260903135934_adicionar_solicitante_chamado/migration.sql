-- AlterTable
ALTER TABLE "Chamado" ADD COLUMN     "solicitanteId" INTEGER;

-- AddForeignKey
ALTER TABLE "Chamado" ADD CONSTRAINT "Chamado_solicitanteId_fkey" FOREIGN KEY ("solicitanteId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
