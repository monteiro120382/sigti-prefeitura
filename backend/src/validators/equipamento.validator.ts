import { z } from "zod";

export const createEquipamentoSchema = z.object({
  patrimonio: z
    .string()
    .min(1, "Patrimônio é obrigatório."),

  tombamento: z
    .string()
    .optional(),

  tipo: z
    .string()
    .min(1, "Tipo é obrigatório."),

  categoria: z
    .string()
    .min(1, "Categoria é obrigatória."),

  marca: z
    .string()
    .min(1, "Marca é obrigatória."),

  fabricante: z
    .string()
    .optional(),

  modelo: z
    .string()
    .min(1, "Modelo é obrigatório."),

  numeroSerie: z
    .string()
    .optional(),

  valorAquisicao: z
    .number()
    .nullable()
    .optional(),

  dataAquisicao: z
    .string()
    .optional(),

  garantiaAte: z
    .string()
    .optional(),

  fornecedor: z
    .string()
    .optional(),

  notaFiscal: z
    .string()
    .optional(),

  localizacao: z
    .string()
    .optional(),

  secretariaId: z
    .number(),

  setorId: z
    .number(),

  funcionarioId: z
    .number()
    .nullable()
    .optional(),

  status: z
    .enum([
      "EM_USO",
      "ESTOQUE",
      "MANUTENCAO",
      "BAIXADO"
    ])
    .optional(),

  estado: z
    .string()
    .optional(),

  ultimaManutencao: z
    .string()
    .optional(),

  proximaManutencao: z
    .string()
    .optional(),

  observacao: z
    .string()
    .optional(),

  ativo: z
    .boolean()
    .optional()
});

export const updateEquipamentoSchema =
  createEquipamentoSchema.partial();