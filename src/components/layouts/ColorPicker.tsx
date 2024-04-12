import React, { useState } from "react";

type ColorPickerProps = {
  className?: string;
  onChangeColor?: (color: string) => void;
  label?: string;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  className,
  onChangeColor,
  label,
}) => {
  const [color, setColor] = useState("#ffffff");
  const [pointerPosition, setPointerPosition] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    console.log("New color:", newColor);
    setColor(newColor);
    if (onChangeColor) onChangeColor(newColor);

    // Calculate pointer position based on color selection
    const input = e.target;
    const max = input.offsetWidth;
    const value = parseInt(input.value.substring(1), 16);
    const position = (value / 0xffffff) * max;
    setPointerPosition(position);
  };

  return (
    <div className={`color-picker flex ${className}`}>
      <label className="flex flex-col items-center justify-center leading-none pb-2">
        <p className="leading-none text-[12px]">{label}</p>
        <div className="relative">
          <div
            className="absolute w-3 h-3 cursor-pointer rounded-full border-nonee shadow-md"
            style={{
              backgroundColor: color,
              left: `${pointerPosition}px`,
              top: "67.3%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
          <input
            type="color"
            value={color}
            onChange={handleChange}
            className="h-3 w-28 cursor-pointer text-black "
          />
        </div>
      </label>
    </div>
  );
};

export default ColorPicker;
