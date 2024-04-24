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
  const soundEffect = new Audio("/buzz.mp3");
  const [playSound, setPlaySound] = useState(false);
  const [windowTickets, setWindowTickets] = useState<string[]>(
    Array(numItems).fill("")
  );

  const handlePlaySound = () => {
    // Set playSound to true to play the sound
    setPlaySound(true);
  };

  useEffect(() => {
    if (playSound) {
      soundEffect.play();
      setPlaySound(false);
    }

    if (queueType && queueCounter && queueTicket) {
      const windowIndex = parseInt(queueCounter.substring(1)) - 1;
      const newWindowTickets = [...windowTickets];

      if (queueType === "TAKE_NUMBER") {
        // Check if the window index is within the range of existing windows
        if (windowIndex >= 0 && windowIndex < numberOfItems) {
          // Check if the window doesn't already have a ticket number
          if (!newWindowTickets[windowIndex]) {
            // Check if the ticket number is not displayed in other windows
            const ticketAlreadyDisplayed = newWindowTickets.some(
              (ticket) => ticket === queueTicket
            );

            if (!ticketAlreadyDisplayed) {
              // Display the ticket number in the window
              newWindowTickets[windowIndex] = queueTicket;

              // Start the interval to simulate the ticket being taken
              const intervalId = setInterval(() => {
                setWindowTickets((prevWindowTickets) => {
                  // Toggle the visibility of the new ticket number
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
          }
        }
      } else if (queueType === "BUZZ_NUMBER") {
        if (
          newWindowTickets[windowIndex] === queueTicket &&
          newWindowTickets[windowIndex] !== ""
        ) {
          handlePlaySound();
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
