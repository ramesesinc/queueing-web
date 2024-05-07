import React, { useState, useEffect } from "react";

type ColorPickerProps = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  name,
  value,
  label,
  onChange,
  className,
}) => {
  return (
    <div className={`color-picker flex`}>
      <label className="flex flex-col items-center justify-center leading-none pb-2">
        <p className="leading-none text-lg pb-1">{label}</p>
        <input
          type="color"
          name={name}
          value={value}
          onChange={onChange}
          className={`h-3 w-48 cursor-pointer text-black rounded ${className}`}
        />
      </label>
    </div>
  );
};

export default ColorPicker;
