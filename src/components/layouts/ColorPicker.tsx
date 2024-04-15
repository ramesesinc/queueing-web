import React, { useState, useEffect } from "react";

type ColorPickerProps = {
  className?: string;
  onChangeColor?: (color: string) => void;
  label?: string;
  initialColor?: string; // Add initialColor prop to set the initial color
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  className,
  onChangeColor,
  label,
  initialColor = "#ffffff", // Default initial color to white if not provided
}) => {
  const [color, setColor] = useState(initialColor);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    if (onChangeColor) onChangeColor(newColor);
  };

  return (
    <div className={`color-picker flex ${className}`}>
      <label className="flex flex-col items-center justify-center leading-none pb-2">
        <p className="leading-none text-[12px]">{label}</p>
        <input
          type="color"
          defaultValue={initialColor} // Use defaultValue instead of value
          onChange={handleChange}
          className="h-3 w-28 cursor-pointer text-black"
        />
      </label>
    </div>
  );
};

export default ColorPicker;
