import prisma from "../lib/prisma";

function normalizarTexto(valor: unknown): string {
  return String(valor ?? "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export class EquipamentoService {

  async criar(data: any) {

    const patrimonioExiste = await prisma.equipamento.findUnique({
      where: {
        patrimonio: data.patrimonio
      }
    });

    if (patrimonioExiste) {
      throw new Error("Já existe um equipamento com este número de patrimônio.");
    }

    if (data.tombamento) {
      const tombamentoExiste = await prisma.equipamento.findFirst({
        where: {
          tombamento: data.tombamento
        }
      });

      if (tombamentoExiste) {
        throw new Error("Já existe um equipamento com este número de tombamento.");
      }
    }

    return prisma.equipamento.create({
      data: {
        patrimonio: data.patrimonio,
        tombamento: data.tombamento ?? null,

        tipo: data.tipo,
        categoria: data.categoria,

        marca: data.marca,
        fabricante: data.fabricante ?? null,
        modelo: data.modelo,
        numeroSerie: data.numeroSerie ?? null,

        valorAquisicao: data.valorAquisicao ?? null,
        dataAquisicao: data.dataAquisicao
          ? new Date(data.dataAquisicao)
          : null,

        garantiaAte: data.garantiaAte
          ? new Date(data.garantiaAte)
          : null,

        fornecedor: data.fornecedor ?? null,
        notaFiscal: data.notaFiscal ?? null,
        localizacao: data.localizacao ?? null,

        secretariaId: data.secretariaId,
        setorId: data.setorId,
        funcionarioId: data.funcionarioId ?? null,

        status: data.status ?? "EM_USO",

        estado: data.estado ?? "BOM",

        ultimaManutencao: data.ultimaManutencao
          ? new Date(data.ultimaManutencao)
          : null,

        proximaManutencao: data.proximaManutencao
          ? new Date(data.proximaManutencao)
          : null,

        observacao: data.observacao ?? null,

        ativo: data.ativo ?? true
      },

      include: {
        secretaria: true,
        setor: true,
        funcionario: true
      }
    });

  }

  async importar(registros: any[]) {

    if (!Array.isArray(registros)) {
      throw new Error("A lista de registros da importação é inválida.");
    }

    const resultados: Array<{
      linha: number;
      patrimonio: string;
      status: "IMPORTADO" | "ERRO";
      mensagem: string;
    }> = [];

    const patrimoniosArquivo = new Set<string>();
    const tombamentosArquivo = new Set<string>();

    /*
     * Carrega os relacionamentos uma única vez.
     * Isso evita fazer uma consulta ao banco para cada campo
     * de cada linha da planilha.
     */
    const [secretarias, setores, funcionarios, equipamentos] =
      await Promise.all([
        prisma.secretaria.findMany({
          select: {
            id: true,
            nome: true,
            ativa: true
          }
        }),

        prisma.setor.findMany({
          select: {
            id: true,
            nome: true,
            secretariaId: true,
            ativo: true
          }
        }),

        prisma.funcionario.findMany({
          select: {
            id: true,
            nome: true,
            matricula: true,
            secretariaId: true,
            setorId: true,
            ativo: true
          }
        }),

        prisma.equipamento.findMany({
          select: {
            patrimonio: true,
            tombamento: true
          }
        })
      ]);

    const patrimoniosExistentes = new Set(
      equipamentos.map((item) => normalizarTexto(item.patrimonio))
    );

    const tombamentosExistentes = new Set(
      equipamentos
        .map((item) => normalizarTexto(item.tombamento))
        .filter(Boolean)
    );

    const statusPermitidos = new Set([
      "EM_USO",
      "ESTOQUE",
      "MANUTENCAO",
      "BAIXADO"
    ]);

    const registrosValidos: any[] = [];

    for (let indice = 0; indice < registros.length; indice++) {

      const registro = registros[indice];
      const linha = indice + 2;

      try {

        const patrimonio = String(
          registro.patrimonio ?? ""
        ).trim();

        const tombamento = String(
          registro.tombamento ?? ""
        ).trim();

        const tipo = String(
          registro.tipo ?? ""
        ).trim();

        const categoria = String(
          registro.categoria ?? ""
        ).trim();

        const marca = String(
          registro.marca ?? ""
        ).trim();

        const fabricante = String(
          registro.fabricante ?? ""
        ).trim();

        const modelo = String(
          registro.modelo ?? ""
        ).trim();

        const numeroSerie = String(
          registro.numeroSerie ?? ""
        ).trim();

        const secretariaNome = String(
          registro.secretaria ?? ""
        ).trim();

        const setorNome = String(
          registro.setor ?? ""
        ).trim();

        const funcionarioNome = String(
          registro.funcionario ?? ""
        ).trim();

        const status = String(
          registro.status ?? "EM_USO"
        ).trim().toUpperCase();

        const estado = String(
          registro.estado ?? "BOM"
        ).trim();

        const observacao = String(
          registro.observacao ?? ""
        ).trim();

        const valorAquisicao =
          registro.valorAquisicao === null ||
          registro.valorAquisicao === undefined ||
          registro.valorAquisicao === ""
            ? null
            : Number(registro.valorAquisicao);

        if (!patrimonio) {
          throw new Error("Patrimônio é obrigatório.");
        }

        if (!tipo) {
          throw new Error("Tipo é obrigatório.");
        }

        if (!categoria) {
          throw new Error("Categoria é obrigatória.");
        }

        if (!marca) {
          throw new Error("Marca é obrigatória.");
        }

        if (!modelo) {
          throw new Error("Modelo é obrigatório.");
        }

        if (!secretariaNome) {
          throw new Error("Secretaria é obrigatória.");
        }

        if (!setorNome) {
          throw new Error("Setor é obrigatório.");
        }

        if (
          valorAquisicao !== null &&
          !Number.isFinite(valorAquisicao)
        ) {
          throw new Error("Valor de aquisição inválido.");
        }

        if (!statusPermitidos.has(status)) {
          throw new Error(
            `Status inválido: "${status}". Use EM_USO, ESTOQUE, MANUTENCAO ou BAIXADO.`
          );
        }

        const patrimonioNormalizado =
          normalizarTexto(patrimonio);

        if (patrimoniosExistentes.has(patrimonioNormalizado)) {
          throw new Error(
            `O patrimônio "${patrimonio}" já existe no sistema.`
          );
        }

        if (patrimoniosArquivo.has(patrimonioNormalizado)) {
          throw new Error(
            `O patrimônio "${patrimonio}" está duplicado na própria planilha.`
          );
        }

        let tombamentoNormalizado = "";

        if (tombamento) {

          tombamentoNormalizado =
            normalizarTexto(tombamento);

          if (
            tombamentosExistentes.has(
              tombamentoNormalizado
            )
          ) {
            throw new Error(
              `O tombamento "${tombamento}" já existe no sistema.`
            );
          }

          if (
            tombamentosArquivo.has(
              tombamentoNormalizado
            )
          ) {
            throw new Error(
              `O tombamento "${tombamento}" está duplicado na própria planilha.`
            );
          }
        }

        const secretaria = secretarias.find(
          (item) =>
            item.ativa &&
            normalizarTexto(item.nome) ===
              normalizarTexto(secretariaNome)
        );

        if (!secretaria) {
          throw new Error(
            `Secretaria "${secretariaNome}" não encontrada.`
          );
        }

        const setor = setores.find(
          (item) =>
            item.ativo &&
            item.secretariaId === secretaria.id &&
            normalizarTexto(item.nome) ===
              normalizarTexto(setorNome)
        );

        if (!setor) {
          throw new Error(
            `Setor "${setorNome}" não encontrado dentro da secretaria "${secretaria.nome}".`
          );
        }

        let funcionarioId: number | null = null;

        if (funcionarioNome) {

          const funcionariosEncontrados =
            funcionarios.filter(
              (item) =>
                item.ativo &&
                item.secretariaId ===
                  secretaria.id &&
                item.setorId === setor.id &&
                normalizarTexto(item.nome) ===
                  normalizarTexto(funcionarioNome)
            );

          if (funcionariosEncontrados.length === 0) {
            throw new Error(
              `Funcionário "${funcionarioNome}" não encontrado no setor "${setor.nome}".`
            );
          }

          if (funcionariosEncontrados.length > 1) {
            throw new Error(
              `Há mais de um funcionário chamado "${funcionarioNome}" no setor "${setor.nome}".`
            );
          }

          funcionarioId =
            funcionariosEncontrados[0].id;
        }

        registrosValidos.push({
          linha,
          patrimonio,
          tombamento: tombamento || null,

          tipo,
          categoria,

          marca,
          fabricante: fabricante || null,
          modelo,
          numeroSerie: numeroSerie || null,

          valorAquisicao,

          secretariaId: secretaria.id,
          setorId: setor.id,
          funcionarioId,

          status,

          estado: estado || "BOM",

          observacao: observacao || null
        });

        patrimoniosArquivo.add(
          patrimonioNormalizado
        );

        if (tombamentoNormalizado) {
          tombamentosArquivo.add(
            tombamentoNormalizado
          );
        }

      } catch (error) {

        const mensagem =
          error instanceof Error
            ? error.message
            : "Erro desconhecido.";

        resultados.push({
          linha,
          patrimonio:
            String(
              registro?.patrimonio ?? ""
            ).trim(),
          status: "ERRO",
          mensagem
        });
      }
    }

    /*
     * Grava somente os registros que passaram por todas
     * as validações.
     */
    if (registrosValidos.length > 0) {

      await prisma.$transaction(
        async (tx) => {

          for (const registro of registrosValidos) {

            await tx.equipamento.create({
              data: {
                patrimonio:
                  registro.patrimonio,

                tombamento:
                  registro.tombamento,

                tipo:
                  registro.tipo,

                categoria:
                  registro.categoria,

                marca:
                  registro.marca,

                fabricante:
                  registro.fabricante,

                modelo:
                  registro.modelo,

                numeroSerie:
                  registro.numeroSerie,

                valorAquisicao:
                  registro.valorAquisicao,

                secretariaId:
                  registro.secretariaId,

                setorId:
                  registro.setorId,

                funcionarioId:
                  registro.funcionarioId,

                status:
                  registro.status,

                estado:
                  registro.estado,

                observacao:
                  registro.observacao,

                ativo: true
              }
            });

            resultados.push({
              linha: registro.linha,
              patrimonio: registro.patrimonio,
              status: "IMPORTADO",
              mensagem: "Equipamento importado com sucesso."
            });
          }

        }
      );
    }

    resultados.sort(
      (a, b) => a.linha - b.linha
    );

    return {
      total: registros.length,
      importados: resultados.filter(
        (item) => item.status === "IMPORTADO"
      ).length,
      erros: resultados.filter(
        (item) => item.status === "ERRO"
      ).length,
      resultados
    };
  }

  async listar() {

    return prisma.equipamento.findMany({

      include: {
        secretaria: true,
        setor: true,
        funcionario: true
      },

      orderBy: {
        patrimonio: "asc"
      }

    });

  }

  async buscarPorId(id: number) {

    const equipamento = await prisma.equipamento.findUnique({

      where: {
        id
      },

      include: {
        secretaria: true,
        setor: true,
        funcionario: true,
        chamados: true
      }

    });

    if (!equipamento) {
      throw new Error("Equipamento não encontrado.");
    }

    return equipamento;

  }

  async atualizar(
    id: number,
    data: any
  ) {

    const equipamento = await prisma.equipamento.findUnique({
      where: {
        id
      }
    });

    if (!equipamento) {
      throw new Error("Equipamento não encontrado.");
    }

    return prisma.equipamento.update({

      where: {
        id
      },

      data: {

        ...data,

        dataAquisicao: data.dataAquisicao
          ? new Date(data.dataAquisicao)
          : undefined,

        garantiaAte: data.garantiaAte
          ? new Date(data.garantiaAte)
          : undefined,

        ultimaManutencao: data.ultimaManutencao
          ? new Date(data.ultimaManutencao)
          : undefined,

        proximaManutencao: data.proximaManutencao
          ? new Date(data.proximaManutencao)
          : undefined

      },

      include: {
        secretaria: true,
        setor: true,
        funcionario: true
      }

    });

  }

  async remover(id: number) {

    const equipamento = await prisma.equipamento.findUnique({
      where: {
        id
      }
    });

    if (!equipamento) {
      throw new Error("Equipamento não encontrado.");
    }

    return prisma.equipamento.delete({
      where: {
        id
      }
    });

  }

}
