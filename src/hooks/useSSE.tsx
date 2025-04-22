import { useEffect } from 'react';

type SSECallback<T> = (data: T) => void;

export function useSSE<T = any>(url: string, onMessage: SSECallback<T>) {
  useEffect(() => {
    const es = new EventSource(url, { withCredentials: true });

    es.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('SSE message parse error:', e);
      }
    };

    es.onerror = (event: Event) => {
      console.error('SSE error:', event);
      es.close();
    };

    return () => {
      es.close();
    };
  }, [url, onMessage]);
}