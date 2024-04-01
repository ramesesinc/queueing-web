//pages/api/socket.tsx
import { Server } from "Socket.IO";

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      // Join a room when 'join-room' event is received
      socket.on("join-room", (data) => {
        const { group } = data;
        socket.join(group);
        console.log(`Socket joined room: ${group}`);
      });
      //join a room
      socket.on("send-message", (data) => {
        console.log(data);
        // Extract the group information from the data
        const { group } = data;

        // Emit 'update' event to the specific group
        io.to(group).emit("update", data);
      });
    });
  }
  res.end();
};

export default SocketHandler;
