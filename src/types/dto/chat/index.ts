// DTO para apagar uma mensagem
export interface DeleteMessageDto {
  msgId: number;
}

// Preview de conversa na lista “minhas‑conversas”
export interface ChatPreviewDto {
  participanteId: string; // UUID
  nome: string;
  username: string;
  imagemPerfil: Uint8Array;
  conversaId: number;
  tipo: string;
  ultimaInteracao: string; // ISO Date
}

// DTO para editar uma mensagem
export interface EditMessageDto {
  msgId: number;
  conteudo: string;
}

// DTO para listar mensagens por participante
export interface ListMessagesDto {
  participanteId: string; // UUID
}

// Notificação de conversa ou nova mensagem
export interface ChatNotificationDto {
  conversaId: number;
  lastMessage: string | null;
  lastMessageAt: string | null;
  lastViewedAt: string | null;
  seen: boolean;
}

// DTO de resposta contendo uma mensagem
export interface MessageResponseDto {
  conversaId: number;
  mensagem: any; // Substitua por tipo Message se já estiver definido
}

// DTO para envio de nova mensagem
export interface NewMessageDto {
  participanteId: string; // UUID
  conteudo: string;
}

export interface Chat {
  id: number;
  participante1_tipo: string;
  participante1_id: string;
  participante2_tipo: string;
  participante2_id: string;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  name: string | undefined;
  avatarUrl: string | Blob | undefined;
  conversaId: number;
  participanteId: string;
  imagemPerfil: string;
  nome: string;
  username: string;
  tipo: string;
  ultimaInteracao: string;
}

export interface Message {
  userId: any;
  id: number;
  conversaId: number;
  remetenteTipo: string;
  remetenteId: string;
  conteudo: string;
  createdAt: string;
  editada: boolean;
  removida: boolean;
}