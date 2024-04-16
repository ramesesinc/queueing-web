// QueueItem.tsx
import React from "react";
import Number from "../ui/Number";

export type QueueItemProps = {
  queueTicket?: string;
  counter: string;
  isBlinking?: boolean;
  bgColor?: React.CSSProperties;
  fontFamily?: string;
};

const QueueItem: React.FC<QueueItemProps> = ({
  counter,
  queueTicket,
  isBlinking = false,
  bgColor,
  fontFamily,
}) => {
  const itemStyle: React.CSSProperties = {
    backgroundColor: isBlinking ? "red" : "white", // Change background color when isBlinking is true
    ...(bgColor && {
      ...bgColor,
      backgroundColor: `${bgColor.backgroundColor} !important`,
    }),
  };

  return (
    <div
      className={`bg-white w-[300px] rounded-xl shadow-md border-2 p-2 max-md:w-[200px] `}
      style={bgColor}
    >
      <div
        className="flex flex-row h-24 max-md:h-16 gap-x-2"
        style={{ fontFamily: fontFamily }}
      >
        <div className="flex flex-col justify-center items-center text-center p-1">
          <Number
            number={counter}
            className="text-5xl max-xl:text-3xl max-md:text-4xl"
          />
        </div>
        <div className="border border-black border-solid m-2"></div>
        <div
          className="flex flex-col justify-center items-center text-center w-full"
          style={itemStyle}
        >
          <Number
            number={queueTicket}
            className="text-5xl max-xl:text-3xl max-md:text-4xl"
          />
        </div>
      </div>
    </div>
  );
};

export default QueueItem;
