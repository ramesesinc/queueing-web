import React, { useCallback, useEffect, useRef, useState } from "react";
import SubTitle from "../ui/SubTitle";
import QueueItem from "./QueueItem";

interface QueueGroupsProps {
  windowCount: number;
  componentType?: string | undefined;
  orientation: "vertical" | "horizontal";
  verticalRows: number | string;
  horizontalCols: number | string;
  type: string;
  countercode: string;
  ticketno: string;
  bgColor: React.CSSProperties;
  fontFamily?: string | undefined;
  buzz?: string;
}

const QueueGroups: React.FC<QueueGroupsProps> = ({
  windowCount,
  componentType,
  orientation = "vertical",
  verticalRows,
  horizontalCols,
  type,
  countercode,
  ticketno,
  bgColor,
  fontFamily,
  buzz,
}) => {
  const containerStyle: React.CSSProperties = {
    display: "grid",
    gap: "10px",
    gridTemplateColumns:
      orientation === "vertical" ? `repeat(${verticalRows}, 1fr)` : undefined,
    gridTemplateRows:
      orientation === "horizontal"
        ? `repeat(${horizontalCols}, 1fr)`
        : undefined,
    gridAutoFlow: orientation === "horizontal" ? "column" : undefined,
  };
  const numItems = typeof windowCount === "number" ? windowCount : 0;
  const [stack, setStack] = useState<
    { counter: string; ticket: string; blink: boolean }[]
  >([]);
  const queueRef = useRef<{ counter: string; ticket: string }[]>([]);
  const isProcessingRef = useRef<boolean>(false);

  const processQueue = useCallback(async () => {
    if (isProcessingRef.current || queueRef.current.length === 0) return;
    isProcessingRef.current = true;

    while (queueRef.current.length > 0) {
      const { counter, ticket } = queueRef.current.shift()!;
      playBuzz();
      await textToSpeech(counter, ticket);
      ticketBlink(counter, ticket);
    }

    isProcessingRef.current = false;
  }, []);

  const textToSpeech = useCallback((countercode: string, ticketno: string) => {
    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(
        `Ticket number, ${ticketno}, please proceed to counter ${countercode}`
      );
      utterance.onend = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  }, []);

  const playBuzz = useCallback(() => {
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
  }, [buzz]);

  const ticketBlink = (countercode: string, ticketno: string) => {
    const intervalId = setInterval(() => {
      setStack((prevStack) =>
        prevStack.map((item) =>
          item.counter === countercode && item.ticket === ticketno
            ? { ...item, blink: !item.blink }
            : item
        )
      );
    }, 800);

    setTimeout(() => {
      clearInterval(intervalId);
      setStack((prevStack) =>
        prevStack.map((item) =>
          item.counter === countercode && item.ticket === ticketno
            ? { ...item, blink: false }
            : item
        )
      );
    }, 4000);
  };

  const handleTakeNumber = useCallback(() => {
    if (countercode && ticketno && type === "TAKE_NUMBER") {
      const newStack = [...stack];
      const isNotInStack = !newStack.some(
        (item) => item.counter === countercode && item.ticket === ticketno
      );

      if (isNotInStack) {
        if (newStack.length < numItems) {
          newStack.unshift({
            counter: countercode,
            ticket: ticketno,
            blink: true,
          });
          setStack(newStack);
          queueRef.current.push({ counter: countercode, ticket: ticketno });
          processQueue();
        } else {
          console.log("Queue is full.");
        }
      }
    }
  }, [stack, countercode, ticketno, type, numItems, processQueue]);

  const handleBuzzNumber = useCallback(() => {
    if (countercode && ticketno && type === "BUZZ_NUMBER") {
      const matchFoundIndex = stack.findIndex(
        (item) => item.counter === countercode && item.ticket === ticketno
      );
      if (matchFoundIndex !== -1) {
        textToSpeech(countercode, ticketno);
      }
    }
  }, [stack, countercode, ticketno, type, textToSpeech]);

  const handleConsumeNumber = useCallback(() => {
    if (type === "CONSUME_NUMBER" && countercode && ticketno) {
      const indexToRemove = stack.findIndex(
        (item) => item.counter === countercode && item.ticket === ticketno
      );

      if (indexToRemove !== -1) {
        const updatedStack = [...stack];
        updatedStack.splice(indexToRemove, 1);
        setStack(updatedStack);
      }
    }
  }, [stack, countercode, ticketno, type]);

  useEffect(() => {
    handleTakeNumber();
    handleBuzzNumber();
    handleConsumeNumber();
  }, [handleTakeNumber, handleBuzzNumber, handleConsumeNumber]);

  return (
    <div id={componentType} className="p-5 flex flex-col gap-10">
      <div style={containerStyle}>
        <div style={{ fontFamily: fontFamily }}>
          <SubTitle
            text="now serving"
            className={`text-[28px] leading-3 absolute top-0 !font-bold uppercase text-star`}
          />
        </div>
        {stack.map((item, index) => (
          <QueueItem
            key={index}
            countercode={item.counter}
            ticketno={item.ticket}
            bgColor={bgColor}
            fontFamily={fontFamily}
            blink={item.blink}
          />
        ))}
      </div>
    </div>
  );
};

export default QueueGroups;
