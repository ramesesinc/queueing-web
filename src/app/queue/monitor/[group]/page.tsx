"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket: any;
const QueueMonitor = ({ params }: { params: { group: string } }) => {
  const [data, setData] = useState({});
  const { group } = params;

  useEffect(() => {
    fetch("/api/socket").then(() => {
      socket = io();
      socket.on("connect", () => {
        if (group) {
          socket.emit("join-room", { group: group });
        }
      });

      socket.on("update", (data: any) => {
        setData(() => data);
      });
    });
  }, [group]);

  return (
    <div>
      <h1>Queue Monitor - {group.toUpperCase()}</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default QueueMonitor;
