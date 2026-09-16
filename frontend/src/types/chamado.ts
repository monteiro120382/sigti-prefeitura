export type PrioridadeChamado =
  | "BAIXA"
  | "MEDIA"
  | "ALTA";

export type StatusChamado =
  | "ABERTO"
  | "EM_ATENDIMENTO"
  | "AGUARDANDO"
  | "FINALIZADO"
  | "CANCELADO";

export interface ChamadoHistorico {
  id: number;

  chamadoId: number;

  statusAnterior?: StatusChamado | null;

  statusNovo: StatusChamado;

  observacao?: string | null;

  usuarioId?: number | null;

  usuario?: {
    id: number;
    nome: string;
    email?: string;
  } | null;

  createdAt?: string;
}

export interface Chamado {
  id?: number;

  protocolo?: string;

  titulo: string;

  descricao: string;

  prioridade: PrioridadeChamado;

  status: StatusChamado;

  resolucao?: string | null;

  secretariaId: number;

  setorId: number;

  funcionarioId: number;

  equipamentoId?: number | null;

  tecnicoId?: number | null;

  solicitanteId?: number | null;

  secretaria?: {
    id: number;
    nome: string;
    sigla?: string;
  };

  setor?: {
    id: number;
    nome: string;
    sigla?: string;
  };

  funcionario?: {
    id: number;
    nome: string;
    matricula?: string;
  };

  equipamento?: {
    id: number;
    patrimonio: string;
    marca?: string;
    modelo?: string;
  } | null;

  solicitante?: {
    id: number;
    nome: string;
    email?: string;
    perfil?: string;
  } | null;

  tecnico?: {
    id: number;
    nome: string;
    email?: string;
    perfil?: string;
  } | null;

  historicos?: ChamadoHistorico[];

  createdAt?: string;

  updatedAt?: string;
}