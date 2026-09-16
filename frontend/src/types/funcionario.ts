export interface Funcionario {
  id: number;

  nome: string;
  matricula: string;

  cargo: string;

  email: string;

  telefone: string;

  secretariaId: number;

  setorId: number;

  ativo?: boolean;

  setor?: {
    id: number;
    nome: string;
  };

  secretaria?: {
    id: number;
    nome: string;
  };
}