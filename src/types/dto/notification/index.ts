// DTO para notificação enviada em tempo real ou push
export interface NotificationDto {
  destinatarioId: string; // UUID
  senderId: string;       // UUID
  senderName: string;
  senderAvatarUrl: string;
  tipo: string;
  mensagem: string;
  createdAt: string;      // ISO Date
}

// Enum representando os tipos possíveis de notificação
export type NotificationType =
  | 'GRUPO_CONVITE'
  | 'EMPRESA_CONVITE'
  | 'DESAFIO_MENCIONADO'
  | 'NOVO_COMENTARIO'
  | 'OUTRO'; // adicionar conforme os valores definidos no backend

// DTO para notificações já persistidas/históricas
export interface NotificationHistoryDto {
  id: number;
  senderId: string;         // UUID
  destinatarioId: string;   // UUID
  tipo: NotificationType;
  payload: string;
  read: boolean;
  createdAt: string;        // ISO Date
}
