import { z } from "zod";

export const createFuncionarioSchema = z.object({
  nome: z
    .string({
      error: "O nome do funcionário é obrigatório."
    })
    .min(3, "O nome deve ter no mínimo 3 caracteres."),

  matricula: z
    .string({
      error: "A matrícula é obrigatória."
    })
    .min(1, "A matrícula é obrigatória."),

  cargo: z
    .string({
      error: "O cargo é obrigatório."
    })
    .min(2, "O cargo deve ter no mínimo 2 caracteres."),

  email: z
    .string({
      error: "O e-mail é obrigatório."
    })
    .email("E-mail inválido."),

  telefone: z
    .string({
      error: "O telefone é obrigatório."
    })
    .min(8, "Telefone inválido."),

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

  ativo: z
    .boolean()
    .optional(),
});
