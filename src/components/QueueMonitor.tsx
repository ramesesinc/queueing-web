"use client";

import { useQueueSocket } from "@/hooks/useQueueSocket";
import { lookupService } from "@/lib/client";
import { useCallback, useEffect, useState } from "react";

type QueueMonitorProps = {
  group: string;
};

const QueueMonitor = ({ group }: QueueMonitorProps) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [ticketinfo, setTicketInfo] = useState<any[]>([]);
  const [ticketQueue, setTicketQueue] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [blinkingTicket, setBlinkingTicket] = useState<string | null>(null);
  const svc = lookupService("QueueService");

  const fetchGroups = async () => {
    const res = await svc?.invoke("getGroups", { objid: group });
    setData(res);
  };

  const fetchActiveList = useCallback(async () => {
    const res = await svc?.invoke("getActiveList", { groupid: group });
    setTicketInfo(res);
  }, [group, svc]);

  const playBuzz = () => {
    return new Promise<void>((resolve) => {
      const sound = new Audio("/sound/take_number_sound.mp3");
      sound.play();

      sound.onended = () => {
        resolve();
      };
    });
  };

  const textToSpeech = (countercode: string, ticketno: string) => {
    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(
        `Ticket number, ${ticketno}, please proceed to counter ${countercode}`
      );
      utterance.onend = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  };

  const processQueue = async () => {
    if (isProcessing || ticketQueue.length === 0) return; // Don't process if already processing

    setIsProcessing(true); // Set the processing state to true

    const currentTicket = ticketQueue[0]; // Get the first ticket in the queue

    try {
      setTicketInfo((prevTickets) => [...prevTickets, currentTicket]);
      await playBuzz();
      setBlinkingTicket(currentTicket.ticketno);

      setTimeout(() => {
        setBlinkingTicket(null);
      }, 5000);
      await textToSpeech(currentTicket.countercode, currentTicket.ticketno);
    } finally {
      setTicketQueue((prevQueue) => prevQueue.slice(1));
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (group) {
      fetchGroups();
      fetchActiveList();
    }
  }, [group]);

  useEffect(() => {
    processQueue(); // Trigger the queue processing
  }, [ticketQueue]);

  useQueueSocket({
    group,
    onUpdate: (data) => {
      if (data.type === "TAKE_NUMBER") {
        setTicketQueue((prevQueue) => [...prevQueue, data]);
      } else if (data.type === "BUZZ_NUMBER") {
        textToSpeech(data.countercode, data.ticketno);
        setBlinkingTicket(data.ticketno);

        // Reset blinking after 5 seconds
        setTimeout(() => {
          setBlinkingTicket(null); // Stop the blinking effect after 5 seconds
        }, 5000);
      } else if (data.type === "CONSUME_NUMBER") {
        setTicketInfo((prevTickets) =>
          prevTickets.filter((ticket) => ticket.ticketno !== data.ticketno)
        );
      }
    },
  });

  return (
    <div>
      <p>Title: {data?.title}</p>
      <p>objid: {data?.objid}</p>
      <div>
        <h3>Tickets (Type: "TAKE_NUMBER")</h3>
        {ticketinfo.length > 0 ? (
          ticketinfo.map((ticket, index) => (
            <div
              key={index}
              className={ticket.ticketno === blinkingTicket ? "blinking" : ""}
            >
              <p>Ticket No: {ticket?.ticketno}</p>
              <p>Counter ID: {ticket?.countercode}</p>
            </div>
          ))
        ) : (
          <p>No "TAKE_NUMBER" tickets yet.</p>
        )}
      </div>
      <style jsx>{`
        .blinking {
          animation: blink 1s steps(5, start) infinite;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default QueueMonitor;
