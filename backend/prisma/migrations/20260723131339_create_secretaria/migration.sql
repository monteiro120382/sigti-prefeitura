-- CreateTable
CREATE TABLE "Secretaria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Secretaria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Secretaria_nome_key" ON "Secretaria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Secretaria_sigla_key" ON "Secretaria"("sigla");
