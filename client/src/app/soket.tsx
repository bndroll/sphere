import { useEffect, useMemo } from "react";

type Props = {
  userId: string;
  onMessage: (data: any) => void;
  onError?: (error: any) => void;
};
export const useWebSocket = ({ userId, onMessage, onError }: Props) => {
  const socket = useMemo(
    () =>
      userId ? new WebSocket(`wss://sphereapp.ru/wss?userId=${userId}`) : null,
    [userId],
  );

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (data) => onMessage(data);
    socket.onerror = onError ?? null;
  }, [onError, onMessage, socket]);
  const handleSendMessage = (data: any) => {
    if (!socket) return;
    socket.send(JSON.stringify(data));
  };

  return {
    handleSendMessage,
  };
};
