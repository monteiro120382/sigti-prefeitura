import { z } from "zod";

export const createSecretariaSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome da secretaria deve ter no mínimo 3 caracteres."),

  sigla: z
    .string()
    .max(10, "A sigla deve ter no máximo 10 caracteres.")
    .optional(),
});
