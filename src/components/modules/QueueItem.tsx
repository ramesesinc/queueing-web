// QueueItem.tsx
import React, { useEffect, useState } from "react";
import Number from "../ui/Number";

export type QueueItemProps = {
  queueTicket?: string;
  counter: string;
  bgColor?: React.CSSProperties;
  fontFamily?: string;
  blinkCount: number;
};

const QueueItem: React.FC<QueueItemProps> = ({
  counter,
  queueTicket,
  bgColor,
  fontFamily,
  blinkCount,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (blinkCount > 0) {
      intervalId = setInterval(() => {
        setIsVisible((prevVisible) => !prevVisible);
      }, 500);
    } else {
      setIsVisible(true);
      if (intervalId) {
        clearInterval(intervalId);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [blinkCount]);

  const itemStyle: React.CSSProperties = {
    ...(bgColor && {
      ...bgColor,
      backgroundColor: `${bgColor.backgroundColor} !important`,
    }),
  };

  return (
    <div
      className={`bg-white w-[300px] rounded-xl shadow-md border-2 p-2 max-xl:w-[250px] max-lg:w-[200px] `}
      style={bgColor}
    >
      <div
        className="flex flex-row h-24 max-md:h-16 gap-x-2"
        style={{ fontFamily: fontFamily }}
      >
        <div className="flex flex-col justify-center items-center text-center p-1">
          <Number
            number={counter}
            className="text-5xl max-xl:text-3xl max-lg:text-2xl"
          />
        </div>
        <div className="border border-black border-solid m-2"></div>
        <div
          className="flex flex-col justify-center items-center text-center w-full"
          style={itemStyle}
        >
          <Number
            number={queueTicket}
            className={`text-5xl max-xl:text-3xl max-lg:text-3xl ${
              blinkCount > 0 && !isVisible ? "invisible" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default QueueItem;
