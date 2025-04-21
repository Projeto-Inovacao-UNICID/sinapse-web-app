import { useEffect, useRef } from 'react';
import { Message } from '@/types'; 

type UseChatSocketProps = {
  destId: string;
  onMessage: (message: Message) => void;
};

export const useChatSocket = ({ destId, onMessage }: UseChatSocketProps) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!destId) return;

    const token = localStorage.getItem('token');
    if (token) {
      document.cookie = `token=${token}; path=/`;
    }

    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}?destId=${destId}`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log('WebSocket conectado');
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        const novaMensagem: Message = {
          id: data.id || Date.now(),
          conteudo: data.conteudo,
          remetenteId: data.remetenteId,
          conversaId: data.conversaId,
          remetenteTipo: data.remetenteTipo,
          createdAt: data.createdAt || new Date().toISOString(),
          editada: data.editada ?? false,
          removida: data.removida ?? false,
        };

        onMessage(novaMensagem);
      } catch (err) {
        console.error('Erro ao processar mensagem:', err);
      }
    };

    socketRef.current.onerror = (err) => console.error('Erro no socket:', err);
    socketRef.current.onclose = () => console.log('WebSocket fechado');

    return () => {
      socketRef.current?.close();
    };
  }, [destId]);
};
