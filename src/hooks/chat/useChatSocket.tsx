import { useEffect, useRef, useState, useCallback } from 'react';
import { Message } from '@/types';
import { WebSocketService } from '@/service/websocket/WebSocketService';

type UseChatSocketProps = {
  destId: string;
  onMessage: (message: Message) => void;
};

export const useChatSocket = ({ destId, onMessage }: UseChatSocketProps) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    if (!destId) return;

    const socket = WebSocketService.connect(destId);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('✅ WebSocket conectado');
      if (isMounted.current) setIsConnected(true);
    };

    socket.onmessage = (event) => {
      if (!isMounted.current) return;

      try {
        const data = JSON.parse(event.data);

        const novaMensagem: Message = {
          id: data.id ?? Date.now(),
          conteudo: data.conteudo,
          remetenteId: data.remetenteId,
          conversaId: data.conversaId,
          remetenteTipo: data.remetenteTipo,
          createdAt: data.createdAt ?? new Date().toISOString(),
          editada: data.editada ?? false,
          removida: data.removida ?? false,
        };

        onMessage(novaMensagem);
      } catch (err) {
        console.error('❌ Erro ao processar mensagem:', err);
      }
    };

    socket.onerror = (err) => {
      console.error('❌ Erro no WebSocket:', err);
    };

    socket.onclose = (event) => {
      console.log('🔌 WebSocket desconectado:', event.reason);
      if (isMounted.current) setIsConnected(false);
    };

    return () => {
      isMounted.current = false;
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close(1000, 'Componente desmontado');
      }
    };
  }, [destId, onMessage]);

  const sendMessage = useCallback((message: Message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn('⚠️ WebSocket não está aberto para envio.');
    }
  }, []);

  return { isConnected, sendMessage };
};
