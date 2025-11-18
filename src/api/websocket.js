export function connectWebSocket({ rol, userId, onMessage, onOpen, onClose, onError }) {
  const WS_URL = import.meta.env.VITE_WS_URL;
  
  if (!WS_URL) {
    console.warn("VITE_WS_URL no está definida. WebSocket no se conectará.");
    if (onError) onError(new Error("VITE_WS_URL no configurada"));
    return {
      close: () => {},
      send: () => {},
    };
  }

  const url = `${WS_URL}?rol=${rol}&userId=${userId}`;
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;
  let reconnectTimeout = null;
  let socket = null;
  let isManualClose = false;

  function connect() {
    try {
      socket = new WebSocket(url);

      socket.onopen = () => {
        console.log("Conectado al WebSocket");
        reconnectAttempts = 0;
        if (onOpen) onOpen();
      };

      socket.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          if (msg.type === "report_update") {
            console.log("Actualización de reporte recibida:", msg.payload);
            if (onMessage) onMessage(msg.payload);
          } else if (msg.type === "report_created") {
            console.log("Nuevo reporte creado:", msg.payload);
            if (onMessage) onMessage(msg.payload);
          } else if (msg.type === "report_closed") {
            console.log("Reporte cerrado:", msg.payload);
            if (onMessage) onMessage(msg.payload);
          } else if (msg.type === "report_prioritized") {
            console.log("Reporte priorizado:", msg.payload);
            if (onMessage) onMessage(msg.payload);
          } else {
            // Mensaje genérico
            if (onMessage) onMessage(msg);
          }
        } catch (err) {
          console.error("Error al parsear mensaje WebSocket:", err);
        }
      };

      socket.onclose = (event) => {
        console.log("WebSocket desconectado", event.code, event.reason);
        if (onClose) onClose(event);

        // Intentar reconectar solo si no fue un cierre manual
        if (!isManualClose && reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts - 1), 10000); // Backoff exponencial, máximo 10s
          console.log(`Intentando reconectar en ${delay}ms (intento ${reconnectAttempts}/${maxReconnectAttempts})`);
          
          reconnectTimeout = setTimeout(() => {
            connect();
          }, delay);
        } else if (reconnectAttempts >= maxReconnectAttempts) {
          console.error("Máximo de intentos de reconexión alcanzado");
          if (onError) onError(new Error("No se pudo reconectar al WebSocket"));
        }
      };

      socket.onerror = (error) => {
        console.error("Error en WebSocket:", error);
        if (onError) onError(error);
      };
    } catch (err) {
      console.error("Error al crear WebSocket:", err);
      if (onError) onError(err);
    }
  }

  // Iniciar conexión
  connect();

  // Retornar objeto con métodos para controlar la conexión
  return {
    close: () => {
      isManualClose = true;
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (socket) {
        socket.close();
      }
    },
    send: (data) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(typeof data === "string" ? data : JSON.stringify(data));
      } else {
        console.warn("WebSocket no está abierto. No se puede enviar mensaje.");
      }
    },
    reconnect: () => {
      isManualClose = false;
      reconnectAttempts = 0;
      if (socket) {
        socket.close();
      }
      connect();
    },
    isConnected: () => {
      return socket && socket.readyState === WebSocket.OPEN;
    },
  };
}
