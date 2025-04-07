import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const useQueueSocket = ({
  group,
  onUpdate,
}: {
  group: string;
  onUpdate: (data: any) => void;
}) => {
  useEffect(() => {
    if (!group) return;

    if (!socket) {
      socket = io();
    }

    socket.emit("join-room", { group });

    socket.on("update", (message) => {
      onUpdate(message.body);
    });

    return () => {
      socket?.off("update");
    };
  }, [group]);
};
