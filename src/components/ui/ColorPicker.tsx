import React, { useState, useEffect } from "react";

type ColorPickerProps = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  name,
  value,
  label,
  onChange,
}) => {
  return (
    <div className={`color-picker flex`}>
      <label className="flex flex-col items-center justify-center leading-none pb-2">
        <p className="leading-none text-[12px] pb-1">{label}</p>
        <input
          type="color"
          name={name}
          value={value}
          onChange={onChange}
          className="h-3 w-28 cursor-pointer text-black rounded"
        />
      </label>
    </div>
  );
};

export default ColorPicker;
