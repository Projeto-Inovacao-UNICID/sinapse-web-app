import { useEffect, useRef, useState, useCallback } from 'react';
import { Message } from '@/types';

type UseChatSocketProps = {
  destId: string;
  onMessage: (msg: Message) => void;
};

export function useChatSocket({ destId, onMessage }: UseChatSocketProps) {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<number | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (!destId) return;

    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const url = `${protocol}://${window.location.host}/ws?destId=${destId}`;
    const ws = new WebSocket(url);

    ws.onopen = () => setIsConnected(true);
    ws.onmessage = ev => {
      try {
        onMessage(JSON.parse(ev.data));
      } catch {}
    };
    ws.onclose = () => {
      setIsConnected(false);
      reconnectTimer.current = window.setTimeout(connect, 5000);
    };
    ws.onerror = () => {
    };

    socketRef.current = ws;
  }, [destId, onMessage]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      socketRef.current?.close();
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
