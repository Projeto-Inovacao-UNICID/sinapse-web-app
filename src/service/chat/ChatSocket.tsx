import { useEffect, useRef } from 'react';

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'other';
};

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
      document.cookie = `token=${token}; path=/`; // seta o token como cookie
    }

    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}?destId=${destId}`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log('WebSocket conectado');
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage({ id: Date.now(), text: data.conteudo, sender: 'other' });
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
