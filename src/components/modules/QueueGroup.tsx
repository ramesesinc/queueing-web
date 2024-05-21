import React, { useEffect, useState } from "react";
import QueueItem from "./QueueItem";
import SubTitle from "../ui/SubTitle";

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
  buzzSound: string;
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
  buzzSound,
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
  const [soundQueue, setSoundQueue] = useState<string[]>([]);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  useEffect(() => {
    if (soundQueue.length > 0 && !isPlayingSound) {
      const currentBuzzSound = soundQueue[0];
      const dingAudio = new Audio(currentBuzzSound);

      setIsPlayingSound(true);
      dingAudio
        .play()
        .then(() => {
          dingAudio.addEventListener("ended", () => {
            setSoundQueue((prevQueue) => prevQueue.slice(1));
            setIsPlayingSound(false);
          });
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          setSoundQueue((prevQueue) => prevQueue.slice(1));
          setIsPlayingSound(false);
        });
    }
  }, [soundQueue, isPlayingSound]);

  const speakMessage = () => {
    const utterance = new SpeechSynthesisUtterance(
      `Ticket number ${queueTicket} please proceed to counter ${queueCounter}`
    );
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (queueType && queueCounter && queueTicket) {
      setStack((prevStack) => {
        const newStack = [...prevStack];
        const isNotInStack = !newStack.some(
          (item) => item.counter === queueCounter && item.ticket === queueTicket
        );

        if (queueType === "TAKE_NUMBER" && isNotInStack) {
          if (newStack.length < numItems) {
            newStack.unshift({ counter: queueCounter, ticket: queueTicket });
            setBlinkCount(10);

            setSoundQueue((prevQueue) => [...prevQueue, buzzSound]);
            setTimeout(speakMessage, 1500);

            return newStack;
          } else {
            console.log("Queue is full. Cannot add more items.");
          }
        } else if (queueType === "BUZZ_NUMBER") {
          const matchFound = newStack.some(
            (item) =>
              item.counter === queueCounter && item.ticket === queueTicket
          );

          if (matchFound) {
            setBlinkCount(10);
            setSoundQueue((prevQueue) => [...prevQueue, buzzSound]);
          }
        } else if (queueType === "CONSUME_NUMBER") {
          return newStack.filter(
            (item) =>
              item.counter !== queueCounter || item.ticket !== queueTicket
          );
        }

        return prevStack;
      });
    }
  }, [queueType, queueCounter, queueTicket, numItems, buzzSound]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (blinkCount > 0) {
      intervalId = setInterval(() => {
        setBlinkCount((prevCount) => prevCount - 1);
      }, 500);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [blinkCount]);

  return (
    <div id={componentType} className="p-5 flex flex-col gap-10">
      <div style={{ fontFamily: fontFamily }}>
        <SubTitle
          text="now serving"
          className={`text-[28px] leading-3 absolute top-0 !font-bold uppercase text-star`}
        />
      </div>
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
