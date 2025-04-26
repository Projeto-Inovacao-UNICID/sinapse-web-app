import { Friend } from "../friend";

export interface UserProfileResponse {
  id: string;
  nome: string;
  username: string;
  temImagem: boolean;
  criadoEm: string;
  ativo?: boolean;
  amigos?: Friend[]
  totalPostagens: number;
  totalReacoes: number;
  podeAdicionarAmigo?: boolean;
  atualizadoEm?: string;
}