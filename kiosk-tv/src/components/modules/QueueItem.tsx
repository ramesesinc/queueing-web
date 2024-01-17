// QueueItem.tsx
import React from "react";
import SubTitle from "../ui/SubTitle";
import Number from "../ui/Number";

export type QueueItemProps = {
  queueSection?: number;
  queueTicket?: number;
  counter: number;
};

const QueueItem: React.FC<QueueItemProps> = ({
  counter,
  queueTicket,
  queueSection,
}) => {
  return (
    <div className="bg-white w-[300px] rounded-xl shadow-md border-2 p-2 max-md:w-[200px] ">
      <div className="flex flex-row gap-2 h-24 max-md:h-16">
        <div className="flex flex-col justify-center items-center text-center p-[5px]">
          <Number
            number={counter}
            className="text-5xl max-xl:text-3xl max-md:text-2xl"
          />
          <SubTitle
            text={"Counter"}
            className="uppercase text-[14px] max-xl:text-[11px] max-md:text-[9px]"
          />
        </div>
        <div className="border border-black border-solid ml-2 h-14 mt-3 mr-8 max-md:mr-0 max-md:mt-2 max-md:h-8"></div>
        <div className="flex flex-col justify-center items-center text-center w-full p-[5px]">
          <Number
            number={queueTicket}
            className="text-5xl max-xl:text-3xl max-md:text-2xl"
          />
          <SubTitle
            text={queueSection}
            className="uppercase text-[14px] max-xl:text-[11px] max-md:text-[9px]"
          />
        </div>
      </div>
    </div>
  );
};

export default QueueItem;
