// QueueGroup.tsx
import React, { useEffect, useState } from "react";
import QueueItem from "./QueueItem";

interface QueueGroupsProps {
  numberOfItems: number;
  componentType?: string | undefined;
  orientation: "vertical" | "horizontal";
  verticalRows: number | string;
  horizontalCols: number | string;
  queueType: string;
  queueCounter: string;
  queueTicket: string;
  bgColor: React.CSSProperties;
  fontFamily?: string | undefined;
}

const QueueGroups: React.FC<QueueGroupsProps> = ({
  numberOfItems,
  componentType,
  orientation = "vertical",
  verticalRows,
  horizontalCols,
  queueType,
  queueCounter,
  queueTicket,
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
  const numItems = typeof numberOfItems === "number" ? numberOfItems : 0;
  const [stack, setStack] = useState<{ counter: string; ticket: string }[]>([]);
  const [blinkCount, setBlinkCount] = useState(0);

  const speakQueueItem = (counter: string, ticket: string) => {
    const utterance = new SpeechSynthesisUtterance(
      `Ticket number, ${ticket}, please proceed to counter ${counter}`
    );
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (queueType && queueCounter && queueTicket) {
      const newStack = [...stack];

      if (queueType === "TAKE_NUMBER") {
        const isNotInStack = !newStack.some(
          (item) => item.counter === queueCounter && item.ticket === queueTicket
        );
        if (isNotInStack) {
          if (newStack.length < numItems) {
            newStack.unshift({ counter: queueCounter, ticket: queueTicket });
            setStack(newStack);
            speakQueueItem(queueCounter, queueTicket);
            setBlinkCount(10);
          } else {
            console.log("Queue is full. Cannot add more items.");
          }
        }
      } else if (queueType === "BUZZ_NUMBER") {
        const matchFound = newStack.some(
          (item) => item.counter === queueCounter && item.ticket === queueTicket
        );

        if (matchFound) {
          setBlinkCount(10);
          speakQueueItem(queueCounter, queueTicket);
        }
      } else if (queueType === "CONSUME_NUMBER") {
        const filteredStack = newStack.filter(
          (item) => item.counter !== queueCounter || item.ticket !== queueTicket
        );
        setStack(filteredStack);
      }
    }
  }, [queueType, queueCounter, queueTicket]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (blinkCount > 0) {
      intervalId = setInterval(() => {
        setBlinkCount((prevCount) => prevCount - 1); // Decrement blink count
      }, 500);
    }

    // Cleanup function to clear the interval when blinkCount reaches 0
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [blinkCount]);

  return (
    <div id={componentType} className="p-5 flex flex-col gap-10">
      <div style={containerStyle}>
        {stack.map((item, index) => (
          <QueueItem
            key={index}
            counter={item.counter}
            queueTicket={item.ticket}
            bgColor={bgColor}
            fontFamily={fontFamily}
            blinkCount={item.ticket === queueTicket ? blinkCount : 0}
          />
        ))}
      </div>
    </div>
  );
};

export default QueueGroups;
