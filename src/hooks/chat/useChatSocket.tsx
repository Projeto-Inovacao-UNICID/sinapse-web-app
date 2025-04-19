import { Message } from '@/types';
import { useEffect, useRef } from 'react';

type UseChatSocketProps = {
  destId: string;
  token: string;
  onMessage: (message: Message) => void;
};

export const useChatSocket = ({ destId, token, onMessage }: UseChatSocketProps) => {
  const socketRef = useRef<WebSocket | null>(null);
  const messageQueue = useRef<object[]>([]);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const isUnmounted = useRef(false);

  const connectWebSocket = () => {
    if (!destId || !token) return;

    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}?destId=${destId}`;

    document.cookie = `token=${token}; path=/`;

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket conectado');
      messageQueue.current.forEach((msg) => socket.send(JSON.stringify(msg)));
      messageQueue.current = [];
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage({
          id: data.id,
          conteudo: data.conteudo,
          remetenteId: data.remetenteId,
          conversaId: data.conversaId,
          remetenteTipo: data.remetenteTipo,
          createdAt: data.createdAt,
          editada: data.editada,
          removida: data.removida,
        });
      } catch (err) {
        console.error('Erro ao processar mensagem:', err);
      }
    };

    socket.onerror = (err) => {
      console.error('Erro no WebSocket:', err);
    };

    socket.onclose = (event) => {
      console.log('WebSocket fechado:', event);
      if (!isUnmounted.current) {
        attemptReconnect();
      }
    };
  };

  const attemptReconnect = () => {
    if (reconnectTimeout.current) return; // evita múltiplas reconexões

    reconnectTimeout.current = setTimeout(() => {
      console.log('Tentando reconectar WebSocket...');
      connectWebSocket();
      reconnectTimeout.current = null;
    }, 3000); // 3 segundos antes de tentar reconectar
  };

  useEffect(() => {
    isUnmounted.current = false;
    connectWebSocket();

    return () => {
      isUnmounted.current = true;
      socketRef.current?.close();
      socketRef.current = null;

      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
        reconnectTimeout.current = null;
      }
    };
  }, [destId, token]);

  const send = (data: object) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    } else {
      console.warn('Socket não pronto, mensagem em fila');
      messageQueue.current.push(data);
    }
  };

  return { send };
};
