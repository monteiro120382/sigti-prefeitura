import { z } from "zod";

export const createEquipamentoSchema = z.object({
  patrimonio: z
    .string({
      error: "O patrimônio é obrigatório."
    })
    .min(3, "O patrimônio deve ter no mínimo 3 caracteres."),

  tipo: z
    .string({
      error: "O tipo do equipamento é obrigatório."
    })
    .min(2, "O tipo deve ter no mínimo 2 caracteres."),

  marca: z
    .string({
      error: "A marca é obrigatória."
    })
    .min(2, "A marca deve ter no mínimo 2 caracteres."),

  modelo: z
    .string({
      error: "O modelo é obrigatório."
    })
    .min(2, "O modelo deve ter no mínimo 2 caracteres."),

  numeroSerie: z
    .string()
    .optional(),

  secretariaId: z
    .coerce
    .number({
      error: "A secretaria é obrigatória."
    })
    .int("O ID da secretaria deve ser um número inteiro.")
    .positive("O ID da secretaria deve ser válido."),

  setorId: z
    .coerce
    .number({
      error: "O setor é obrigatório."
    })
    .int("O ID do setor deve ser um número inteiro.")
    .positive("O ID do setor deve ser válido."),

  funcionarioId: z
    .coerce
    .number()
    .positive("O ID do funcionário deve ser válido.")
    .optional(),

  observacao: z
    .string()
    .optional(),

  ativo: z
    .boolean()
    .optional(),
});