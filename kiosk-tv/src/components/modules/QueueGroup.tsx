// QueueGroup.tsx
import React from "react";
import QueueItem, { QueueItemProps } from "./QueueItem";
import { items } from "../../stores/queueitems";

interface QueueGroupsProps {
  numberOfItems: number;
  componentType?: string | undefined;
  orientation: "vertical" | "horizontal";
  verticalRows: number;
  horizontalCols: number;
  queueSections?: number;
  queueTicket?: number;
}

const QueueGroups: React.FC<QueueGroupsProps> = ({
  numberOfItems,
  componentType,
  orientation = "vertical",
  verticalRows,
  horizontalCols,
  queueSections,
  queueTicket,
}) => {
  const itemsToDisplay: QueueItemProps[] = Array.from(
    { length: numberOfItems },
    (_, index) => ({
      data: items[index] || { subtitle: "" },
      counter: index + 1,
    })
  );

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

  return (
    <div id={componentType} className="p-5 flex flex-col gap-10">
      <div style={containerStyle}>
        {itemsToDisplay.map((item, index) => (
          <QueueItem
            key={index + 1}
            {...item}
            queueSection={queueSections}
            queueTicket={queueTicket}
          />
        ))}
      </div>
    </div>
  );
};

export default QueueGroups;
