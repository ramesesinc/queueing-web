import React from "react";
import { fontitem, FontFamily } from "../../stores/fontfamily-items";

interface FontFamilySelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
}

const FontFamilySelect: React.FC<FontFamilySelectProps> = ({
  value,
  onChange,
  name,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      name={name}
      className="border border-blue-500 w-[25%] rounded"
    >
      {fontitem.map((font: FontFamily) => (
        <option key={font.id} value={font.family}>
          {font.id}
        </option>
      ))}
    </select>
  );
};

export default FontFamilySelect;
