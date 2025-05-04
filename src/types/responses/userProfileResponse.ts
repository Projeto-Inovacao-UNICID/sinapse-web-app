import { UserProfileFriend } from "../userProfileFriend";

export interface UserProfileResponse {
  id: string;
  nome: string;
  username: string;
  email?: string;
  temImagem: boolean;
  criadoEm: string;
  ativo?: boolean;
  amigos?: UserProfileFriend[];
  totalPostagens: number;
  totalReacoes: number;
  podeAdicionarAmigo?: boolean;
  atualizadoEm?: string;
}