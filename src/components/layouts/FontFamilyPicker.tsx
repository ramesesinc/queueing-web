import React, { useState } from "react";

type FontFamilyPickerProps = {
  className?: string;
  onChangeFontFamily?: (fontFamily: string) => void;
  label?: string;
};

const FontFamilyPicker: React.FC<FontFamilyPickerProps> = ({
  className,
  onChangeFontFamily,
  label,
}) => {
  const [selectedFont, setSelectedFont] = useState("Arial");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontFamily = e.target.value;
    console.log("New font family:", newFontFamily);
    setSelectedFont(newFontFamily);
    if (onChangeFontFamily) onChangeFontFamily(newFontFamily);
  };

  const fontFamilies = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Bookman",
    "Comic Sans MS",
    "Trebuchet MS",
    "Arial Black",
    "Impact",
    "Lucida Sans Unicode",
    "Tahoma",
    "Geneva",
    "Courier",
    "Lucida Console",
    "Monaco",
    "Copperplate",
  ];

  return (
    <div className={`font-family-picker flex ${className} text-black`}>
      <label className="flex flex-col items-center justify-center leading-none pb-2">
        <p className="leading-none text-[12px]">{label}</p>
        <select
          value={selectedFont}
          onChange={handleChange}
          className="px-2 py-1 border border-gray-300 rounded-md"
        >
          {fontFamilies.map((fontFamily) => (
            <option key={fontFamily} value={fontFamily}>
              {fontFamily}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default FontFamilyPicker;
