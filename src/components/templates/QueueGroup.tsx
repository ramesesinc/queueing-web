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

  const totalTickets = props.length;
  const maxMain = Number(windowCount);
  const reserveSlots = 5;

  // Determine how many go to main vs reserve
  let mainTickets: Record<string, any>[] = [];
  let reserveTickets: Record<string, any>[] = [];

  if (totalTickets > maxMain) {
    // Show the first `windowCount` in main, rest in reserve
    mainTickets = props.slice(0, maxMain);
    reserveTickets = props.slice(maxMain);
  } else {
    mainTickets = props;
    reserveTickets = [];
  }

  // Pad reserve with empty slots to always show 4
  const paddedReserveTickets = Array.from(
    { length: reserveSlots },
    (_, index) => {
      return reserveTickets[index] || {}; // Fill with empty object if no ticket
    }
  );

  if (numColumnCount <= 0 || numRowCount <= 0) {
    console.error("Invalid columnCount or rowCount", { columnCount, rowCount });
    return null;
  }

  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns:
      orientation === "horizontal"
        ? `repeat(${numColumnCount}, minmax(0, 1fr))`
        : undefined,
    gridTemplateRows:
      orientation === "vertical"
        ? `repeat(${numRowCount}, minmax(0, 1fr))`
        : undefined,
    gridAutoFlow: orientation === "vertical" ? "column" : undefined,
    gridAutoColumns: "minmax(0, 1fr)",
  };

  return (
    <div id={componentType} className="w-full">
      <Text className="text-[28px] leading-6 absolute top-[90px] !font-bold uppercase text-start">
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

        {Array.from({ length: numWindowCount }, (_, index) => {
          const ticket = mainTickets[index];
          return (
            <QueueItem
              key={index}
              props={ticket || {}}
              className={ticket?.ticketno === blinkingTicket ? "blinking" : ""}
            />
          );
        })}
      </div>
      {/* Reserve Queue Display */}
      {/* <div className="absolute bottom-16 left-0 grid grid-cols-5 w-full gap-5 px-5">
        {paddedReserveTickets.map((ticket, index) => (
          <QueueItem
            key={index}
            props={ticket || {}}
            className={`${ticket.ticketno ? "" : "opacity-50"} ${
              ticket?.ticketno === blinkingTicket ? "blinking" : ""
            }`}
            height="70px"
            textSize="!text-3xl"
            borderLine="pt-8"
            counterCodeWidth="w-auto"
            hideSectionTitle
          />
        ))}
      </div> */}
    </div>
  );
};

export default QueueGroup;