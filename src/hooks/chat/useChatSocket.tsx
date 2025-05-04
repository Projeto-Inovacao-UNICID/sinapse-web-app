import { useEffect, useRef, useState, useCallback } from 'react';
import { Message } from '@/types';

type UseChatSocketProps = {
  destId: string;
  onMessage: (msg: Message) => void;
};

export function useChatSocket({ destId, onMessage }: UseChatSocketProps) {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<number | undefined>(undefined);
  const shouldReconnect = useRef(true);

  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (!destId) return;

    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const url = `${protocol}://${window.location.host}/ws?destId=${destId}`;
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = ev => {
      try {
        const msg: Message = JSON.parse(ev.data);
        onMessage(msg);
      } catch (e) {
        console.error('Erro ao parsear mensagem WS:', e);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      if (shouldReconnect.current) {
        reconnectTimer.current = window.setTimeout(connect, 5000);
      }
    };

    ws.onerror = () => {
    };

    socketRef.current = ws;
  }, [destId, onMessage]);

  useEffect(() => {
    shouldReconnect.current = true;
    connect();

    return () => {
      shouldReconnect.current = false;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (socketRef.current) {
        socketRef.current.onclose = null;
        socketRef.current.onmessage = null;
        socketRef.current.onerror = null;
        socketRef.current.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback((payload: any) => {
    const ws = socketRef.current;
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
    }
  }, []);

  return { isConnected, sendMessage };
}
