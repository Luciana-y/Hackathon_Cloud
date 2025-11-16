export function connectWebSocket(role, userId, onMessage) {
  const WS_URL = "wss://TU-ENDPOINT.execute-api.us-east-1.amazonaws.com/dev";

  const url = `${WS_URL}?rol=${role}&userId=${userId}`;

  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log("WebSocket conectado");
  };

  ws.onmessage = (event) => {
    try {
      onMessage(JSON.parse(event.data));
    } catch (e) {
      console.error("Error parsing WS message:", e);
    }
  };

  ws.onerror = (err) => {
    console.error("Error WebSocket:", err);
  };

  ws.onclose = () => {
    console.log("WebSocket cerrado");
  };

  return ws;
}
