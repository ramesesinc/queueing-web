import React, { useState, useEffect } from "react";

interface ToggleButtonProps {
  text?: string;
  isActive: boolean;
  onClick: () => void;
  componentType: string;
  className?: string | undefined;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  text,
  isActive,
  onClick,
  componentType,
  className,
}) => {
  const [circlePosition, setCirclePosition] = useState(
    isActive ? "translate-x-full" : "translate-x-0"
  );

  const [circleColor, setCircleColor] = useState(
    isActive ? "bg-sky-400" : "bg-gray-400"
  );

  useEffect(() => {
    setCirclePosition(isActive ? "translate-x-full" : "translate-x-0");
    setCircleColor(isActive ? "bg-sky-400" : "bg-gray-400");
  }, [isActive]);

  const handleClick = () => {
    onClick();
    setCirclePosition((prevPosition) =>
      prevPosition === "translate-x-full" ? "translate-x-full" : "translate-x-0"
    );
    setCircleColor((prevColor) =>
      prevColor === "bg-sky-400" ? "bg-gray-400" : "bg-sky-400"
    );
  };

  return (
    <div
      id={componentType}
      className={` relative flex items-center flex-col${className}`}
    >
      <button
        className={`relative ${
          isActive ? "bg-sky-200" : "bg-gray-200"
        } px-[12px] py-[6px] rounded-full outline-none focus:outline-none text-[5px]`}
        onClick={handleClick}
      >
        <span
          className={`absolute left-0 top-0 w-3 h-3 rounded-full shadow-md transform transition-transform ${circlePosition} ${circleColor}`}
        >
          <p className="hover:bg-gray-500 hover:bg-opacity-30 rounded-full py-[9px] px-[9px] absolute left-[-3px] top-[-3px] z-[1px]"></p>
        </span>
      </button>
      <p
        className={`text-[6px] uppercase pt-1 ${
          isActive ? "text-sky-300" : "text-gray-200"
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default ToggleButton;
