//pages/api/socket.tsx

const SocketHandler = (req: any, res: any) => {
  const { type, countercode, groupid, ticketno } = req.body;
  if (!type || !countercode || !groupid || !ticketno) {
    res.status(400).json({ error: "Invalid data provided" });
    return;
  }
  const group = groupid.toLowerCase();
  const ticket = ticketno;
  req.socket.server.io
    .to(group)
    .emit("update", { type, countercode, group, ticket });

  res.end();
};

export default SocketHandler;
