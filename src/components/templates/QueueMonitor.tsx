"use client";

import { useData } from "@/context/DataContext";
import { useQueueSocket } from "@/hooks/useQueueSocket";
import { lookupService } from "@/lib/client";
import { useCallback, useEffect, useState } from "react";
import QueueGroup from "./QueueGroup";
import QueueVideo from "./QueueVideo";
import QueueItem from "./QueueItem";

type QueueMonitorProps = {
  group: string;
};

const QueueMonitor = ({ group }: QueueMonitorProps) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [ticketinfo, setTicketInfo] = useState<any[]>([]);
  const [ticketQueue, setTicketQueue] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [blinkingTicket, setBlinkingTicket] = useState<string | null>(null);
  const { groups, general } = useData();
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
    return new Promise<void>((resolve, reject) => {
      const sound = new Audio(general.buzz);
      sound.play().then(() => {
        console.log("Sound played successfully.");
        sound.onended = () => resolve();
      }).catch((err) => {
        console.error("Sound playback failed:", err);
        resolve(); // Still resolve to not block queue
      });
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
    if (isProcessing || ticketQueue.length === 0) return;

    setIsProcessing(true);
    const currentTicket = ticketQueue[0];

    try {
      // setTicketInfo((prevTickets) => [currentTicket, ...prevTickets]);
      await playBuzz();
      setBlinkingTicket(currentTicket.ticketno);

      setTimeout(() => {
        setBlinkingTicket(null);
      }, 5000);

      await textToSpeech(currentTicket.countercode, currentTicket.ticketno);
    } finally {
      // Move the processed ticket to the next in the queue
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
    processQueue(); // Trigger the queue processings
  }, [ticketQueue]);

  useQueueSocket({
    group,
    onUpdate: async (data) => {
      if (data.type === "TAKE_NUMBER") {
        setTicketInfo((prev) => [data, ...prev]); // 🆕 Show ticket immediately in UI
        setTicketQueue((prevQueue) => [...prevQueue, data]); // 🔁 Queue for speech + blinking
        // setTicketQueue((prevQueue) => [...prevQueue, data]);
      } else if (data.type === "BUZZ_NUMBER") {
        // Process buzz and text-to-speech immediately
        await playBuzz();
        await textToSpeech(data.countercode, data.ticketno);
        setBlinkingTicket(data.ticketno);

        setTimeout(() => {
          setBlinkingTicket(null); // Stop the blinking effect after 5 seconds
        }, 5000);
      } else if (data.type === "CONSUME_NUMBER") {
        // Remove consumed ticket from the active list
        setTicketInfo((prevTickets) =>
          prevTickets.filter((ticket) => ticket.ticketno !== data.ticketno)
        );
      }
    },
  });

  const isVideoLeft = groups.videoposition === "main-left";
  const isQueueGroupRight = groups.windowposition === "main-right";

  const totalTickets = ticketinfo.length;
  const maxMain = Number(groups.windowCount);
  const reserveSlots = 5;

  // Determine how many go to main vs reserve
  let mainTickets: Record<string, any>[] = [];
  let reserveTickets: Record<string, any>[] = [];

  if (totalTickets > maxMain) {
    // Show the first `windowCount` in main, rest in reserve
    mainTickets = ticketinfo.slice(0, maxMain);
    reserveTickets = ticketinfo.slice(maxMain);
  } else {
    mainTickets = ticketinfo;
    reserveTickets = [];
  }

  // Pad reserve with empty slots to always show 4
  const paddedReserveTickets = Array.from(
    { length: reserveSlots },
    (_, index) => {
      return reserveTickets[index] || {}; // Fill with empty object if no ticket
    }
  );

  return (
    <div className="flex flex-col min-hscreen">
      {/* Main content */}
      <div className="flex-grow flex w-full gap-4 px-4 py-2">
        {/* Left Video */}
        {groups.showVideo && isVideoLeft && (
          <div className="w-1/2 flex justify-center items-start pt-2">
            <QueueVideo
              componentType={groups.showVideo ? `${groups.videoposition}` : "none"}
              videoLink={groups.videoUrl}
              layoutType="custom"
            />
          </div>
        )}

        {/* Queue Group */}
        <div className={`pt-10 ${isQueueGroupRight ? "ml-auto" : ""} ${!groups.showVideo ? "w-full" : "w-1/2"}`}>
          {ticketinfo.length > 0 ? (
            <QueueGroup
              props={ticketinfo}
              componentType={groups.windowposition}
              orientation={groups.xyAxis}
              columnCount={groups.columnCount}
              rowCount={groups.rowCount}
              blinkingTicket={blinkingTicket || ""}
              windowCount={groups.windowCount}
            />
          ) : (
            <p>No "TAKE_NUMBER" tickets yet.</p>
          )}
        </div>

        {/* Right Video */}
        {groups.showVideo && !isVideoLeft && (
          <div className="w-1/2 flex justify-center items-start pt-2">
            <QueueVideo
              componentType={groups.showVideo ? `${groups.videoposition}` : "none"}
              videoLink={groups.videoUrl}
              layoutType="custom"
            />
          </div>
        )}
      </div>
 
     <div className="grid grid-cols-5 w-full gap-5 px-5 pb-2">
        {paddedReserveTickets.map((ticket, index) => (
          <QueueItem
            key={index}
            props={ticket || {}}
            className={`${ticket.ticketno ? "" : "opacity-50"} ${
              ticket?.ticketno === blinkingTicket ? "blinking" : ""
            }`}
            height="70px"
            textSize="!text-3xl"
            borderLine="pt-8"
            counterCodeWidth="w-auto"
            hideSectionTitle
          />
        ))}
      </div> 
    </div>
  );
};

export default QueueMonitor;
