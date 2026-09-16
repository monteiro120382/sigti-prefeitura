export type Perfil =
| "ADMIN"
| "TECNICO"
| "SOLICITANTE"
| "ESTAGIARIO";

export interface Usuario {
id: number;
nome: string;
email: string;
perfil: Perfil;
ativo?: boolean;
createdAt?: string;
}