import { z } from "zod";

export const createChamadoSchema = z.object({
  titulo: z
    .string({
      error: "O título é obrigatório."
    })
    .min(5, "O título deve ter no mínimo 5 caracteres."),

  descricao: z
    .string({
      error: "A descrição é obrigatória."
    })
    .min(10, "A descrição deve ter no mínimo 10 caracteres."),

  prioridade: z
    .enum(["BAIXA", "MEDIA", "ALTA"], {
      error: "Prioridade inválida."
    })
    .optional(),

  status: z
    .enum(["ABERTO", "EM_ANDAMENTO", "CONCLUIDO", "CANCELADO"], {
      error: "Status inválido."
    })
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
    .number({
      error: "O funcionário é obrigatório."
    })
    .int("O ID do funcionário deve ser um número inteiro.")
    .positive("O ID do funcionário deve ser válido."),

  equipamentoId: z
    .coerce
    .number()
    .positive("O ID do equipamento deve ser válido.")
    .optional(),

  tecnicoId: z
    .coerce
    .number()
    .positive("O ID do técnico deve ser válido.")
    .optional(),
});