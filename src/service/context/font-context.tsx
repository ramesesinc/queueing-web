import React, { createContext, useContext, useState, useEffect } from "react";

interface FontFamilyContextType {
  fontFamily: string;
  handleFontFamilyChange: (newFontFamily: string) => void;
}

interface FontFamilyProps {
  children: React.ReactNode;
}

const FontFamilyContext = createContext<FontFamilyContextType>({
  fontFamily: "Arial",
  handleFontFamilyChange: () => {},
});

export const FontFamilyProvider: React.FC<FontFamilyProps> = ({ children }) => {
  const [fontFamily, setFontFamily] = useState("Arial");

  const handleFontFamilyChange = (newFontFamily: string) => {
    setFontFamily(newFontFamily);
  };

  useEffect(() => {
    const storedFontFamily = localStorage.getItem("fontFamily");
    if (storedFontFamily !== null) {
      setFontFamily(storedFontFamily);
    }
  }, []);

  return (
    <FontFamilyContext.Provider value={{ fontFamily, handleFontFamilyChange }}>
      {children}
    </FontFamilyContext.Provider>
  );
};

export const useFontFamilyContext = (): FontFamilyContextType => {
  const context = useContext(FontFamilyContext);
  if (!context) {
    throw new Error("useColorContext must be used within a ColorProvider");
  }
  return context;
};
