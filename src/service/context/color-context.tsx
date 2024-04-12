import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ColorContextType {
  headerColor: string;
  mainColor: string;
  footerColor: string;
  handleHeaderColorChange: (color: string) => void;
  handleMainColorChange: (color: string) => void;
  handleFooterColorChange: (color: string) => void;
}

interface ColorProviderProps {
  children: ReactNode;
}

const ColorContext = createContext<ColorContextType>({
  headerColor: "#0a5366",
  mainColor: "#ffffff",
  footerColor: "#0a5366",
  handleHeaderColorChange: () => {},
  handleMainColorChange: () => {},
  handleFooterColorChange: () => {},
});

export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [headerColor, setHeaderColor] = useState("#0a5366");
  const [mainColor, setMainColor] = useState("#ffffff");
  const [footerColor, setFooterColor] = useState("#0a5366");

  const handleHeaderColorChange = (color: string) => {
    setHeaderColor(color);
  };

  const handleMainColorChange = (color: string) => {
    setMainColor(color);
  };

  const handleFooterColorChange = (color: string) => {
    setFooterColor(color);
  };

  useEffect(() => {
    const storedHeaderColor = localStorage.getItem("headerColor");
    const storedMainColor = localStorage.getItem("mainColor");
    const storedFooterColor = localStorage.getItem("footerColor");

    if (storedHeaderColor !== null) {
      setHeaderColor(storedHeaderColor);
    }
    if (storedMainColor !== null) {
      setMainColor(storedMainColor);
    }
    if (storedFooterColor !== null) {
      setFooterColor(storedFooterColor);
    }
  }, []);

  return (
    <ColorContext.Provider
      value={{
        headerColor,
        mainColor,
        footerColor,
        handleHeaderColorChange,
        handleMainColorChange,
        handleFooterColorChange,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = (): ColorContextType => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColorContext must be used within a ColorProvider");
  }
  return context;
};
