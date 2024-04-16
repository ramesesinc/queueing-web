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
  windowColor: string;
  handleHeaderColorChange: (color: string) => void;
  handleMainColorChange: (color: string) => void;
  handleFooterColorChange: (color: string) => void;
  handleWindowColorChange: (color: string) => void;
}

interface ColorProviderProps {
  children: ReactNode;
}

const ColorContext = createContext<ColorContextType>({
  headerColor: "#0a5366",
  mainColor: "#ffffff",
  footerColor: "#0a5366",
  windowColor: "#ffffff",
  handleHeaderColorChange: () => {},
  handleMainColorChange: () => {},
  handleFooterColorChange: () => {},
  handleWindowColorChange: () => {},
});

export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [headerColor, setHeaderColor] = useState("#0a5366");
  const [mainColor, setMainColor] = useState("#ffffff");
  const [footerColor, setFooterColor] = useState("#0a5366");
  const [windowColor, setWindowColor] = useState("#ffffff");

  const handleHeaderColorChange = (color: string) => {
    setHeaderColor(color);
  };

  const handleMainColorChange = (color: string) => {
    setMainColor(color);
  };

  const handleFooterColorChange = (color: string) => {
    setFooterColor(color);
  };

  const handleWindowColorChange = (color: string) => {
    setWindowColor(color);
  };

  useEffect(() => {
    const storedHeaderColor = localStorage.getItem("headerColor");
    const storedMainColor = localStorage.getItem("mainColor");
    const storedFooterColor = localStorage.getItem("footerColor");
    const storedWindowColor = localStorage.getItem("windowColor");

    if (storedHeaderColor !== null) {
      setHeaderColor(storedHeaderColor);
    }
    if (storedMainColor !== null) {
      setMainColor(storedMainColor);
    }
    if (storedFooterColor !== null) {
      setFooterColor(storedFooterColor);
    }
    if (storedWindowColor !== null) {
      setWindowColor(storedWindowColor);
    }
  }, []);

  return (
    <ColorContext.Provider
      value={{
        headerColor,
        mainColor,
        footerColor,
        windowColor,
        handleHeaderColorChange,
        handleMainColorChange,
        handleFooterColorChange,
        handleWindowColorChange,
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
