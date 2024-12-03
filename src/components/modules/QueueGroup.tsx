import React, { useCallback, useEffect, useRef, useState } from "react";
import SubTitle from "../ui/SubTitle";
import QueueItem from "./QueueItem";

interface QueueGroupsProps {
  windowCount: number;
  componentType?: string | undefined;
  orientation: "vertical" | "horizontal";
  verticalRows?: number | string;
  horizontalCols: number | string;
  type: string;
  countercode: string;
  ticketno: string;
  section: string;
  bgColor: React.CSSProperties;
  fontFamily?: string | undefined;
  buzz?: string;
}

const QueueGroups: React.FC<QueueGroupsProps> = ({ windowCount, componentType, orientation = "vertical", verticalRows, horizontalCols, type, countercode, ticketno, section, bgColor, fontFamily, buzz }) => {
  const numItems = typeof windowCount === "number" ? windowCount : 0;
  const [stack, setStack] = useState<{ counter: string; ticket: string }[]>([]);
  const queueRef = useRef<{ counter: string; ticket: string }[]>([]);
  const isProcessingRef = useRef<boolean>(false);

  const containerStyle: React.CSSProperties = {
    display: "grid",
    gap: "10px",
    gridTemplateColumns: orientation === "vertical" ? `repeat(${verticalRows}, 1fr)` : undefined,
    gridTemplateRows: orientation === "horizontal" ? `repeat(${horizontalCols}, 1fr)` : undefined,
    gridAutoFlow: orientation === "horizontal" ? "column" : undefined,
  };

  const processQueue = useCallback(async () => {
    if (isProcessingRef.current || queueRef.current.length === 0) return;
    isProcessingRef.current = true;

    while (queueRef.current.length > 0) {
      const { counter, ticket } = queueRef.current.shift()!;
      await playBuzz();
      await textToSpeech(counter, ticket);
    }

    isProcessingRef.current = false;
  }, []);

  const textToSpeech = (countercode: string, ticketno: string) => {
    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(`Ticket number, ${ticketno}, please proceed to counter ${countercode}`);
      utterance.onend = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  };

  const playBuzz = () => {
    return new Promise<void>((resolve) => {
      if (buzz) {
        const audio = new Audio(buzz);
        audio.onended = () => resolve();
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
          resolve();
        });
      } else {
        resolve();
      }
    });
  };

  const handleTakeNumber = () => {
    if (countercode && ticketno && type === "TAKE_NUMBER") {
      const newStack = [...stack];
      const isNotInStack = !newStack.some((item) => item.counter === countercode && item.ticket === ticketno);

      if (isNotInStack) {
        if (newStack.length < numItems) {
          newStack.unshift({
            counter: countercode,
            ticket: ticketno,
          });
          setStack(newStack);
          queueRef.current.push({ counter: countercode, ticket: ticketno });
          processQueue();
        } else {
          console.log("Queue is full.");
        }
      }
    }
  };

  const handleBuzzNumber = () => {
    if (countercode && ticketno && type === "BUZZ_NUMBER") {
      const matchFoundIndex = stack.findIndex((item) => item.counter === countercode && item.ticket === ticketno);
      if (matchFoundIndex !== -1) {
        queueRef.current.push({ counter: countercode, ticket: ticketno });
        processQueue();
      } else {
        console.error("Countercode or ticketno is missing");
      }
    }
  };

  const handleConsumeNumber = () => {
    if (countercode && ticketno && type === "CONSUME_NUMBER") {
      const indexToRemove = stack.findIndex((item) => item.counter === countercode && item.ticket === ticketno);

      if (indexToRemove !== -1) {
        const updatedStack = [...stack];
        updatedStack.splice(indexToRemove, 1);
        setStack(updatedStack);
      }
    }
  };

  const getItemCount = () => {
    return orientation === "vertical" ? verticalRows : horizontalCols;
  };

  useEffect(() => {
    handleTakeNumber();
    handleBuzzNumber();
    handleConsumeNumber();
  }, [handleTakeNumber, handleBuzzNumber, handleConsumeNumber]);

  return (
    <div id={componentType} className="flex flex-col gap-4" style={{ fontFamily: fontFamily }}>
      <SubTitle text="now serving" className="text-[28px] leading-3 absolute top-[-10px] !font-bold uppercase text-star" />
      <div className={`${orientation === "vertical" ? "flex flex-col" : "grid"} ${orientation === "vertical" ? `grid-cols-${getItemCount()} gap-4` : `grid-cols-${getItemCount()} gap-4`} mt-4`}>
        {stack.map((item, index) => (
          <QueueItem key={index} countercode={item.counter} ticketno={item.ticket} section={section} bgColor={bgColor} fontFamily={fontFamily} />
        ))}
      </div>
    </div>
  );
};

export default QueueGroups;
