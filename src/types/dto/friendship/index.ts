// DTO para atualizar status de amizade (ex: "aceito", "rejeitado")
export interface UpdateFriendshipStatusDto {
  amizadeId: number;
  status: "aceito" | "rejeitado";
}

// DTO para remover uma amizade
export interface RemoveFriendshipDto {
  amizadeId: number;
}

export type FriendshipInviteType = "enviados" | "recebidos";

export interface Friend {
  amizadeId: number;
  usuarioId: string;
  nome: string;
  username: string;
  imagemPerfil: string | null;
  status: string;
  created_at: string;
}

export interface FriendshipContent {
  amizadeId: number;
  usuarioId: string;
  nome: string;
  username: string;
  imagemPerfil: string | null;
  created_at: string;
}

export interface FriendshipInvitation {
  id: number;
  status: string;
  solicitante: string;
  destinatario: string;
  created_at: string;
}

export interface FriendshipInvitationsResponse {
  content: FriendshipContent[];
  page: number;
  size: number;
  totalElements: number;
}