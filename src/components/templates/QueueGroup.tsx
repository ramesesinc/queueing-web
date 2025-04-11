import React from "react";
import QueueItem from "./QueueItem";
import Text from "@/components/ui/Text";

const QueueGroup = ({
  props,
  classname,
  componentType,
  orientation,
  columnCount = 1,
  rowCount = 1,
  windowCount = 1,
  blinkingTicket,
}: {
  props: Record<string, any>[];
  classname?: string;
  componentType?: string | undefined;
  orientation: "vertical" | "horizontal" | string;
  columnCount?: number | string;
  rowCount?: number | string;
  windowCount?: number | string;
  blinkingTicket?: string;
}) => {
  // Ensure columnCount and rowCount are numbers
  const numColumnCount = Number(columnCount);
  const numRowCount = Number(rowCount);
  const numWindowCount = Number(windowCount);


  if (numColumnCount <= 0 || numRowCount <= 0) {
    console.error("Invalid columnCount or rowCount", { columnCount, rowCount });
    return null;
  }

  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns:
      orientation === "horizontal" ? `repeat(${numColumnCount}, 1fr)` : undefined,
    gridTemplateRows:
      orientation === "vertical" ? `repeat(${numRowCount}, 1fr)` : undefined,
    gridAutoFlow: orientation === "vertical" ? "column" : undefined,
  };
  
  return (
    <div id={componentType}>
      <Text className="text-[28px] leading-6 absolute top-28 !font-bold uppercase text-start">
        now serving
      </Text>
      <div style={containerStyle} className={`${classname} gap-4`}>
        {/* {props.map((ticket: any, index: number) => (
          <QueueItem
            key={index}
            props={ticket}
            className={ticket.ticketno === blinkingTicket ? "blinking" : ""}
          />
        ))} */}

        {Array.from({ length: numWindowCount}, (_, index) => {
          const ticket = props[index];

          return (
            <QueueItem key={index} props={ticket || {}}  className={ticket?.ticketno === blinkingTicket ? "blinking" : ""} />
          )
        })}
      </div>
    </div>
  );
};

export default QueueGroup;

