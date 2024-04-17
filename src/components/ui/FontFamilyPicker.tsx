import React, { useState, useEffect } from "react";
import { FontFamily, getFontFamily } from "../../stores/fontfamily-items";

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
  const [fontFamily, setFontFamily] = useState<FontFamily[]>([]);
  const [selectedFont, setSelectedFont] = useState<string>("Arial");

  useEffect(() => {
    const storedFontFamily = localStorage.getItem("selectedFontFamily");
    setSelectedFont(storedFontFamily || "Arial");
    async function fetchData() {
      const data = await getFontFamily();
      setFontFamily(data);
    }

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontFamily = e.target.value;
    setSelectedFont(newFontFamily);
    localStorage.setItem("selectedFontFamily", newFontFamily);
    if (onChangeFontFamily) onChangeFontFamily(newFontFamily);
  };

  return (
    <div className={`font-family-picker flex ${className} text-black`}>
      <label className="flex flex-col items-center justify-center leading-none pb-2">
        <p className="leading-none text-[12px]">{label}</p>
        <select
          value={selectedFont}
          onChange={handleChange}
          className="w-[140px] border border-gray-300 rounded"
        >
          {fontFamily &&
            fontFamily.map((fontitem) => (
              <option key={fontitem.id} value={fontitem.id}>
                {fontitem.family}
              </option>
            ))}
        </select>
      </label>
    </div>
  );
};

export async function getStaticProps() {
  const fontFamily = await getFontFamily();

  return {
    props: {
      fontFamily,
    },
  };
}

export default FontFamilyPicker;
