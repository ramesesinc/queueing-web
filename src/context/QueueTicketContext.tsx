// context/QueueTicketContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

interface QueueTicketContextValue {
  ticketInfo: any[];
  setTicketInfo: React.Dispatch<React.SetStateAction<any[]>>;
  blinkingTicket: string | null;
  setBlinkingTicket: (ticket: string | null) => void;
}

const QueueTicketContext = createContext<QueueTicketContextValue>({
  ticketInfo: [],
  setTicketInfo: () => {},
  blinkingTicket: null,
  setBlinkingTicket: () => {},
});

export const useQueueTicket = () => useContext(QueueTicketContext);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ticketInfo, setTicketInfo] = useState<any[]>([]);
  const [blinkingTicket, setBlinkingTicket] = useState<string | null>(null);

  return (
    <QueueTicketContext.Provider value={{ ticketInfo, setTicketInfo, blinkingTicket, setBlinkingTicket }}>
      {children}
    </QueueTicketContext.Provider>
  );
};
