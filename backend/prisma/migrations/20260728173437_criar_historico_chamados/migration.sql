-- CreateTable
CREATE TABLE "ChamadoHistorico" (
    "id" SERIAL NOT NULL,
    "chamadoId" INTEGER NOT NULL,
    "statusAnterior" "StatusChamado",
    "statusNovo" "StatusChamado" NOT NULL,
    "observacao" TEXT,
    "usuarioId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChamadoHistorico_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChamadoHistorico" ADD CONSTRAINT "ChamadoHistorico_chamadoId_fkey" FOREIGN KEY ("chamadoId") REFERENCES "Chamado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChamadoHistorico" ADD CONSTRAINT "ChamadoHistorico_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
