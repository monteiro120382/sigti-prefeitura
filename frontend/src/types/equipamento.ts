export interface Equipamento {
  id?: number;

  patrimonio: string;
  tombamento?: string;

  tipo: string;
  categoria: string;

  marca: string;
  fabricante?: string;
  modelo: string;
  numeroSerie?: string;

  valorAquisicao?: number | null;

  secretariaId: number;
  setorId: number;
  funcionarioId?: number | null;

  secretaria?: {
    id: number;
    nome: string;
  };

  setor?: {
    id: number;
    nome: string;
  };

  funcionario?: {
    id: number;
    nome: string;
  } | null;

  status: string;
  estado: string;

  observacao?: string;

  createdAt?: string;
  updatedAt?: string;
}
