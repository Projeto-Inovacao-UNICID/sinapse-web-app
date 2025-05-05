// DTO para atualização de dados básicos do perfil do usuário
export interface UpdateUserProfileDto {
  nome: string;
  username: string;
  email: string;
}

// DTO para perfil privado de usuário (informações completas)
export interface UserPrivateProfileDto {
  id: string;                     // UUID
  nome: string;
  username: string;
  email: string;
  temImagem: boolean;
  ativo: boolean | null;
  criadoEm: string;              // ISO date
  atualizadoEm: string;          // ISO date
}

// DTO para perfil público de usuário (visível para outros usuários)
export interface UserPublicProfileDto {
  id: string;
  nome: string;
  username: string;
  temImagem: boolean;
  criadoEm: string;              // ISO date
  amigos: FriendDto[];           // amigos do usuário
  totalPostagens: number;
  totalReacoes: number;
  podeAdicionarAmigo: boolean | null;
}

// DTO para amigo exibido no perfil público
export interface FriendDto {
  id: string;
  nome: string;
  username: string;
  temImagem: boolean;
}

export interface UserProfileCommentsResponse {
  totalElements: number;
  size: number;
  content: ProfileComment[];
  page: number;
}

export interface ProfileComment {
  id: number;
  autorId: string;
  conteudo: string;
  criadoEm: string;
}

export interface UserProfileResponse {
  id: string;
  nome: string;
  username: string;
  email?: string;
  temImagem: boolean;
  criadoEm: string;
  ativo?: boolean;
  amigos?: FriendDto[];
  totalPostagens: number;
  totalReacoes: number;
  podeAdicionarAmigo?: boolean;
  atualizadoEm?: string;
}
