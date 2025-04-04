import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketComponent = () => {
  const [data, setData] = useState<any>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Create a socket connection
    const newSocket = io("http://localhost:3002");  // Replace with your server URL

    // Set the socket instance
    setSocket(newSocket);

    // Listen for data from the server
    newSocket.on("etracs-data", (receivedData) => {
      console.log("Received data from server:", receivedData);
      setData(receivedData);
    });

    // Cleanup on dismount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Queue Data</h1>
      {data ? (
        <div>
          <p>Group: {data.group}</p>
          <p>Section: {data.section}</p>
          <p>Take Number: {data.takeNumber}</p>
          <p>Finish Number: {data.finishNumber}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default SocketComponent;
