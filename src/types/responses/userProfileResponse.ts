import { Friend } from "../friend";

export interface UserProfileResponse {
  id: string;
  nome: string;
  username: string;
  temImagem: boolean;
  criadoEm: string;
  amigos: Friend[];
  totalPostagens: number;
  totalReacoes: number;
  podeAdicionarAmigo: boolean;
}