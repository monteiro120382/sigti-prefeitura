import { z } from "zod";

export const createSetorSchema = z.object({
  nome: z
    .string({
      required_error: "O nome do setor é obrigatório."
    })
    .min(3, "O nome do setor deve ter no mínimo 3 caracteres."),

  sigla: z
    .string()
    .max(10, "A sigla deve ter no máximo 10 caracteres.")
    .optional(),

  secretariaId: z
    .preprocess(
      (valor) => Number(valor),
      z.number({
        required_error: "A secretaria é obrigatória."
      })
      .int("O ID da secretaria deve ser um número inteiro.")
      .positive("O ID da secretaria deve ser válido.")
    ),
});
