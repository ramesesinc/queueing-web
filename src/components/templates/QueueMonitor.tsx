"use client";

import { useQueueSocket } from "@/hooks/useQueueSocket";
import { lookupService } from "@/lib/client";
import { useCallback, useEffect, useState } from "react";
import QueueGroup from "./QueueGroup";
import QueueVideo from "./QueueVideo";
import { useData } from "@/context/DataContext";

type QueueMonitorProps = {
  group: string;
};

const QueueMonitor = ({ group }: QueueMonitorProps) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [ticketinfo, setTicketInfo] = useState<any[]>([]);
  const [ticketQueue, setTicketQueue] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [blinkingTicket, setBlinkingTicket] = useState<string | null>(null);
  const { groups } = useData();
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
      const sound = new Audio("/sound/take_number_sound.mp3");
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
      // Prepend the new ticket to the list
      setTicketInfo((prevTickets) => [currentTicket, ...prevTickets]);
      await playBuzz();
      setBlinkingTicket(currentTicket.ticketno);

      setTimeout(() => {
        setBlinkingTicket(null);
      }, 6000);

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
    onUpdate: async (data) => {
      if (data.type === "TAKE_NUMBER") {
        setTicketQueue((prevQueue) => [...prevQueue, data]);
      } else if (data.type === "BUZZ_NUMBER") {
        await playBuzz();
         textToSpeech(data.countercode, data.ticketno);
        setBlinkingTicket(data.ticketno);

        // Reset blinking after 5 seconds
        setTimeout(() => {
          setBlinkingTicket(null); // Stop the blinking effect after 5 seconds
        }, 6000);
      } else if (data.type === "CONSUME_NUMBER") {
        setTicketInfo((prevTickets) =>
          prevTickets.filter((ticket) => ticket.ticketno !== data.ticketno)
        );
      }
    },
  });
  const isVideoLeft = groups.videoposition === "main-left";
  const isQueueGroupRight = groups.windowposition === "main-right";

  return (
<div className="flex w-full h-full gap-4 p-4 pt-10">
  {/* Conditionally render video section */}
  {groups.showVideo && isVideoLeft ? (
    <div className={`w-1/2 flex justify-center items-center`}>
      <QueueVideo
        componentType={groups.showVideo ? `${groups.videoposition}` : "none"}
        videoLink={groups.videoUrl}
        layoutType="custom"
      />
    </div>
  ) : null}

  {/* Content section */}
  <div className={`w-1/2 pt-10 ${isQueueGroupRight ? "ml-auto" : ""} ${!groups.showVideo ? "w-full" : ""}`}>
    {ticketinfo ? (
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

  {/* Conditionally render video section */}
  {groups.showVideo && !isVideoLeft ? (
    <div className={`w-1/2 flex justify-center items-center`}>
      <QueueVideo
        componentType={groups.showVideo ? `${groups.videoposition}` : "none"}
        videoLink={groups.videoUrl}
        layoutType="custom"
      />
    </div>
  ) : null}
</div>

  );
};

export default QueueMonitor;