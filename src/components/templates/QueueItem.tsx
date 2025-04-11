import React from "react";
import Number from "@/components/ui/Number";

export type QueueItemProps = {
  props: Record<string, any>;
  section?: string;
  bgColor?: React.CSSProperties;
  fontFamily?: string;
  className?: string;
};
const QueueItem: React.FC<QueueItemProps> = ({
  props,
  section,
  bgColor,
  fontFamily,
  className,
}) => {
  const isEmpty = !props || Object.keys(props).length === 0;

  const itemStyle: React.CSSProperties = {
    ...(bgColor && {
      ...bgColor,
      backgroundColor: `${bgColor.backgroundColor} !important`,
    }),
  };

  return (
    <div className={className}>
      <div
        className="bg-white rounded-xl shadow-md border-2 p-2 h-32 flex items-center justify-center"
        style={itemStyle}
      >
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center text-gray-400 w-full">
            <p className="text-xl font-bold">_ _ _</p>
          </div>
        ) : (
          <div
            className="flex flex-row w-full h-full gap-x-2 items-center"
            style={{ fontFamily }}
          >
            <p className="font-bold text-5xl">{props.countercode}</p>
            <div className="border border-black border-solid pt-20" />
            <div className="flex flex-col items-center justify-center text-center w-full h-full">
              <p className="font-bold text-5xl">{props.ticketno}</p>
              <p className="uppercase">{props.sectiontitle}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueueItem;
