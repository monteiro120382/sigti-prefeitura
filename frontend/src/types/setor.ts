export interface Setor {
  id: number;

  nome: string;

  sigla?: string;

  secretariaId: number;

  ativo?: boolean;

  secretaria?: {
    id: number;
    nome: string;
  };
}