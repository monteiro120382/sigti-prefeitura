import { z } from "zod";

export const cadastroSolicitanteSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres."),

  email: z
    .string()
    .email("E-mail inválido."),

  senha: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export type CadastroSolicitanteDTO =
  z.infer<typeof cadastroSolicitanteSchema>;
