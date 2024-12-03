import React from "react";
import Number from "../ui/Number";

export type QueueItemProps = {
  ticketno: string;
  countercode: string;
  section?: string;
  bgColor?: React.CSSProperties;
  fontFamily?: string;
  className?: string;
};

const QueueItem: React.FC<QueueItemProps> = ({ countercode, ticketno, section, bgColor, fontFamily, className }) => {
  const itemStyle: React.CSSProperties = {
    ...(bgColor && {
      ...bgColor,
      backgroundColor: `${bgColor.backgroundColor} !important`,
    }),
  };

  return (
    <div className={` ${className}`}>
      <div className="bg-white rounded-xl shadow-md border-2 p-2" style={bgColor}>
        <div className="flex flex-row h-20 max-md:h-16 gap-x-2" style={{ fontFamily: fontFamily }}>
          <div className="flex flex-col justify-center items-center text-center pl-2 w-10 ">
            <Number number={countercode} className="~text-lg/5xl" />
          </div>
          <div className="border border-black border-solid m-2" />
          <div className="flex flex-col justify-center items-center text-center w-full" style={itemStyle}>
            <Number number={ticketno} className={`~text-lg/5xl`} />
            <p className="uppercase">{section}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueItem;
