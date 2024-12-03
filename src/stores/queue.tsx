//stores/socket.tsx
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { lookupService } from "../lib/client";

interface SocketData {
  countercode: string;
  groupid: string;
  sectionid: string;
  ticketno: string;
  type: string;
}

let socket: any;

interface SocketContextType {
  data: SocketData[];
  emit: (msg: string, data: any) => void;
}

const SocketContext = createContext<SocketContextType>({
  data: [],
  emit: (msg: any, data: any) => {},
});

export const SocketContextProvider = (props: any) => {
  const [data, setData] = useState<SocketData[]>([]);
  const router = useRouter();
  const group = router.query.group;
  const svc = lookupService("QueueService");

  const fetchActiveList = async () => {
    try {
      const res = await svc?.invoke("getActiveList", { groupid: group });
      if (res && Array.isArray(res)) {
        const formattedList = res.map((item: any) => ({
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

  useEffect(() => {
    fetch("/api/queue").then(() => {
      socket = io();
      socket.on("connect", () => {
        if (group) {
          socket.emit("join-room", { group: group });
          fetchActiveList();
        }
      });

      // socket.on("update", (data: {}) => {
      //   setData(data);
      // });

      socket.on("update", (newData: any) => {
        console.log(newData);
        if (Array.isArray(newData)) {
          setData((prevData) => {
            const updatedData = [...prevData];

            newData.forEach((update) => {
              const index = updatedData.findIndex((item) => item.ticketno === update.ticketno);
              if (index !== -1) {
                updatedData[index] = update;
              } else {
                updatedData.push(update);
              }
            });

            return updatedData;
          });
        } else {
          console.error("Received data is not an array:", newData);

          setData([newData]);
        }
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    });

    return () => {
      socket?.disconnect();
    };
  }, [group]);

  const emit = (msg: any, data: any) => {
    socket.emit(msg, data);
  };

  const context = {
    emit,
    data,
  };

  return <SocketContext.Provider value={context}>{props.children}</SocketContext.Provider>;
};

export default SocketContext;
