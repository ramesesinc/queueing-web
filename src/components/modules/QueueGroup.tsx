// QueueGroup.tsx
import React, { useEffect, useState } from "react";
import QueueItem from "./QueueItem";

interface QueueGroupsProps {
  numberOfItems: number;
  componentType?: string | undefined;
  orientation: "vertical" | "horizontal";
  verticalRows: number;
  horizontalCols: number;
  queueType: string;
  queueCounter: string;
  queueTicket: string;
  bgColor: React.CSSProperties;
  fontFamily?: string;
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

  const [windowTickets, setWindowTickets] = useState<string[]>(
    Array(numItems).fill("")
  );

  useEffect(() => {
    if (queueType && queueCounter && queueTicket) {
      const windowIndex = parseInt(queueCounter.substring(1)) - 1;
      const newWindowTickets = [...windowTickets];

      if (queueType === "TAKE_NUMBER") {
        if (!newWindowTickets[windowIndex]) {
          newWindowTickets[windowIndex] = queueTicket;

          const intervalId = setInterval(() => {
            setWindowTickets((prevWindowTickets) => {
              const newWindowTickets = [...prevWindowTickets];
              newWindowTickets[windowIndex] =
                newWindowTickets[windowIndex] === "" ? queueTicket : "";
              return newWindowTickets;
            });
          }, 300);

          setTimeout(() => {
            clearInterval(intervalId);
          }, 2000);
        }
      } else if (queueType === "BUZZ_NUMBER") {
        if (
          newWindowTickets[windowIndex] === queueTicket &&
          newWindowTickets[windowIndex] !== ""
        ) {
          const playBuzzSound = () => {
            const takeSound = new Audio("/buzz.mp3");
            takeSound.play();
          };

          playBuzzSound();
          const intervalId = setInterval(() => {
            setWindowTickets((prevWindowTickets) => {
              const newWindowTickets = [...prevWindowTickets];
              newWindowTickets[windowIndex] =
                newWindowTickets[windowIndex] === "" ? queueTicket : "";
              return newWindowTickets;
            });
          }, 300);

          // Clear the interval after 2 seconds
          setTimeout(() => {
            clearInterval(intervalId);
          }, 2000);
        }
      } else if (queueType === "CONSUME_NUMBER") {
        // Delete the ticket number if it matches the counter code
        if (newWindowTickets[windowIndex] === queueTicket) {
          newWindowTickets[windowIndex] = "";
        }
      }

      setWindowTickets(newWindowTickets);
    }
  }, [queueType, queueCounter, queueTicket]);

  return (
    <div id={componentType} className="p-5 flex flex-col gap-10">
      <div style={containerStyle}>
        {windowTickets.map((ticket, index) => (
          <QueueItem
            key={index}
            counter={`W${index + 1}`}
            queueTicket={ticket}
            bgColor={bgColor}
            fontFamily={fontFamily}
          />
        ))}
      </div>
    </div>
  );
};

export default QueueGroups;
