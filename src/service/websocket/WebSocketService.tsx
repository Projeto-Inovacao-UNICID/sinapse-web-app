const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WS_URL;

if (!WEBSOCKET_URL) {
  throw new Error("A variável NEXT_PUBLIC_WS_URL não está definida.");
}

export const WebSocketService = {
  connect(destId: string): WebSocket {
    const socket = new WebSocket(`${WEBSOCKET_URL}/ws?destId=${destId}`);

    socket.onopen = () => {
      console.log("✅ Conectado ao WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📨 Mensagem recebida:", data);
    };

    socket.onerror = (error) => {
      console.error("❌ Erro no WebSocket:", error);
    };

    socket.onclose = (event) => {
      console.log("🔌 Conexão encerrada:", event.reason);
    };

    return socket;
  }
};
