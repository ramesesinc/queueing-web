import React from "react";
import Time from "./Time";
import DateComponent from "./DateComponent";

type TimeDateProps = {
  componentType: string | undefined;
  className?: string;
};

const TimeDate: React.FC<TimeDateProps> = ({ componentType, className }) => {
  return (
    <div
      id={componentType}
      className={`flex items-center justify-center gap-5 ${className}`}
    >
      <Time />
      <div className="h-[20px] bg-black w-[2px]"></div>
      <DateComponent />
    </div>
  );
};

export default TimeDate;
