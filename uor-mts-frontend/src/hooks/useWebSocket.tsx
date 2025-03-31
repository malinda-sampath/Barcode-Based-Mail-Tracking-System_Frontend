import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const useWebSocket = (
  topic: string,
  onMessageReceived: (message: any) => void
) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("JWT Token not found. WebSocket connection aborted.");
      return;
    }

    const socket = new SockJS(`http://localhost:8081/ws?token=${token}`);
    const stomp = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    stomp.onConnect = () => {
      console.log(`Connected to WebSocket: Subscribed to ${topic}`);

      // Subscribe to the provided topic
      stomp.subscribe(topic, (message) => {
        const parsedMessage = JSON.parse(message.body);
        onMessageReceived(parsedMessage);
      });
    };

    stomp.onStompError = (frame) => {
      console.error("WebSocket STOMP error:", frame);
    };

    stomp.activate();
    setStompClient(stomp);

    return () => {
      if (stomp) {
        stomp.deactivate();
        console.log(`Disconnected from WebSocket: Unsubscribed from ${topic}`);
      }
    };
  }, [topic]); // Re-run effect only if the topic changes

  return { stompClient };
};

export default useWebSocket;
