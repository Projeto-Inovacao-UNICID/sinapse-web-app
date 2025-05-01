'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Message } from '@/types';

type UseChatSocketProps = {
  destId: string;                    // ID do outro participante
  onMessage: (m: Message) => void;   // callback para cada mensagem recebida
};

/**
 * Hook para gerenciar conexão WebSocket do chat.
 * Conecta-se apenas se destId estiver preenchido.
 */
export function useChatSocket({ destId, onMessage }: UseChatSocketProps) {
  const wsRef          = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  /** Abre (ou reabre) a conexão */
  const connect = useCallback(() => {
    if (!destId) return; // nada a fazer até termos um ID válido

    // já conectado ao mesmo destino → sai
    if (
      wsRef.current?.readyState === WebSocket.OPEN &&
      wsRef.current.url.endsWith(`destId=${destId}`)
    ) {
      return;
    }

    // encerra socket antigo (se houver)
    wsRef.current?.close(1000, 'new connection');

    const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
    const url      = `${protocol}://${location.host}/ws?destId=${destId}`;
    const ws       = new WebSocket(url);

    ws.onopen    = () => setIsConnected(true);
    ws.onmessage = (ev) => {
      try {
        onMessage(JSON.parse(ev.data) as Message);
      } catch (e) {
        console.error('[WS] mensagem inválida', e);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      wsRef.current = null;
      if (reconnectTimer.current == null) {
        reconnectTimer.current = window.setTimeout(() => {
          reconnectTimer.current = null;
          connect();                    // tenta de novo em 5 s
        }, 5000);
      }
    };

    ws.onerror = () => console.error('[WS] erro ao conectar', url);

    wsRef.current = ws;
  }, [destId, onMessage]);

  /** dispara connect/desconnect no ciclo de vida do componente */
  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close(1000, 'component unmount');
    };
  }, [connect]);

  /** Envia payload se houver socket aberto */
  const sendMessage = useCallback((payload: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  }, []);

  return { isConnected, sendMessage };
}
