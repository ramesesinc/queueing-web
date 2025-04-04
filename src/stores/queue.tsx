import { useRouter } from "next/router";
import { createContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { lookupService } from "../lib/client";

let newSocket: any;

interface SocketData {
  countercode: string;
  groupid: string;
  sectionid: string;
  ticketno: string;
  type: string;
}

interface SocketContextType {
  data: SocketData[];
  emit: (msg: string, data: any) => void;
}

const SocketContext = createContext<SocketContextType>({
  data: [],
  emit: () => {},
});

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketContextProvider = ({ children }: SocketProviderProps) => {
  const [data, setData] = useState<SocketData[]>([]);
  const router = useRouter();
  const svc = lookupService("QueueService");
  const groupId = router.query.group;

  const fetchActiveList = async () => {
    if (!svc) return;
    try {
      const res = await svc.invoke("getActiveList", { groupid: groupId });
      if (Array.isArray(res)) {
        const formattedList: SocketData[] = res.map((item: any) => ({
          countercode: item.countercode,
          groupid: item.groupid.toLowerCase(),
          sectionid: item.sectiontitle,
          ticketno: item.ticketno,
          type: "TAKE_NUMBER",
        }));
        setData(formattedList);
      }
    } catch (error) {
      console.error("Error fetching active list:", error);
    }
  };

  const initializeSocket = () => {
    if (newSocket) return;

    fetchActiveList().then(() => {
      newSocket = io();
      newSocket.on("connect", () => {
        console.log("Socket connected");
        if (groupId) {
          newSocket.emit("join-room", { group: groupId });
        }
      });

      newSocket.on("update", (data: SocketData[]) => {
        console.log("Received update data:", data);
        setData(() => data);
      });
  
      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

    })


  
  };

  useEffect(() => {
    if (!router.isReady || !router.query.group) return;
    if (groupId) {
      initializeSocket(); 
    }

    return () => {
      newSocket?.disconnect();
    };
  }, [groupId]);

  const emit = (msg: string, data: any) => {
    console.log("Emitting message:", msg, "with data:", data); // Debugging log
    newSocket.emit(msg, data);
  };

  return (
    <SocketContext.Provider value={{ data, emit }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
