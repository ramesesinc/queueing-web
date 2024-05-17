import React, { useCallback, useEffect, useState } from "react";
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

  const textToSpeech = (countercode: string, ticketno: string) => {
    const audio = new Audio("/buzz.mp3");
    audio.addEventListener("ended", () => {
      const utterance = new SpeechSynthesisUtterance(
        `Ticket number ${ticketno} please proceed to counter ${countercode}`
      );
      window.speechSynthesis.speak(utterance);
    });
    audio.play().catch((error) => console.error("Error playing audio:", error));
  };

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
          textToSpeech(countercode, ticketno);
          ticketBlink(countercode, ticketno);
        } else {
          console.log("Queue is full.");
        }
      }
    }
  }, [stack, countercode, ticketno, type, numItems, textToSpeech, ticketBlink]);

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
