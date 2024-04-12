import React, { createContext, useContext, useEffect, useState } from "react";

interface WindowContextType {
  numberOfWindows: number;
  sentNumberOfWindows: number | null;
  numberOfVerticalRows: number;
  sentNumberOfVerticalRows: number | null;
  numberOfHorizontalCols: number;
  sentNumberOfHorizontalCols: number | null;
  handleWindowChange: (window: number) => void;
  handleVerticalChange: (vertical: number) => void;
  handleHorizontalChange: (horizontal: number) => void;
  isVerticalClicked: boolean;
  isHorizontalClicked: boolean;
  orientation: "vertical" | "horizontal";
  handleVerticalClick: () => void;
  handleHorizontalClick: () => void;
}

interface WindowProviderProps {
  children: React.ReactNode;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const useWindowContext = (): WindowContextType => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindowContext must be used within a WindowProvider");
  }
  return context;
};

export const WindowProvider: React.FC<WindowProviderProps> = ({ children }) => {
  const [numberOfWindows, setNumberOfWindows] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const storedNumberOfWindows = localStorage.getItem("sentNumber");
      return storedNumberOfWindows ? JSON.parse(storedNumberOfWindows) : 4;
    }
    return 4;
  });
  const [numberOfVerticalRows, setVerticalRows] = useState(() => {
    if (typeof window !== "undefined") {
      const storedNumberOfVerticalRows =
        localStorage.getItem("sentVerticalRows");
      return storedNumberOfVerticalRows
        ? JSON.parse(storedNumberOfVerticalRows)
        : 4;
    }
    return 4;
  });
  const [numberOfHorizontalCols, setHorizontalCols] = useState(() => {
    if (typeof window !== "undefined") {
      const storedNumberOfHorizontalCols =
        localStorage.getItem("sentHorizontalCols");
      return storedNumberOfHorizontalCols
        ? JSON.parse(storedNumberOfHorizontalCols)
        : 4;
    }
    return 4;
  });
  const [sentNumberOfWindows, setSentNumberOfWindows] = useState<number | null>(
    null
  );
  const [sentNumberOfVerticalRows, setSentNumberOfVerticalRows] = useState<
    number | null
  >(null);
  const [sentNumberOfHorizontalCols, setSentNumberOfHorizontalCols] = useState<
    number | null
  >(null);
  const [isVerticalClicked, setIsVerticalClicked] = useState(false);
  const [isHorizontalClicked, setIsHorizontalClicked] = useState(false);
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">(
    "horizontal"
  );

  const handleWindowChange = (windowValue: number) => {
    setNumberOfWindows(windowValue);
    if (typeof window !== "undefined") {
      localStorage.setItem("sentNumber", JSON.stringify(windowValue));
    }
  };

  const handleVerticalChange = (verticalValue: number) => {
    setVerticalRows(verticalValue);
    if (typeof window !== "undefined") {
      localStorage.setItem("sentVerticalRows", JSON.stringify(verticalValue));
    }
  };

  const handleHorizontalChange = (horizontalValue: number) => {
    setHorizontalCols(horizontalValue);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "sentHorizontalCols",
        JSON.stringify(horizontalValue)
      );
    }
  };

  const handleVerticalClick = () => {
    setIsVerticalClicked(true);
    setIsHorizontalClicked(false);
    setOrientation("vertical");

    localStorage.setItem("isVerticalClicked", "true");
    localStorage.setItem("isHorizontalClicked", "false");
    localStorage.setItem("orientation", "vertical");
  };

  const handleHorizontalClick = () => {
    setIsHorizontalClicked(true);
    setIsVerticalClicked(false);
    setOrientation("horizontal");

    localStorage.setItem("isVerticalClicked", "false");
    localStorage.setItem("isHorizontalClicked", "true");
    localStorage.setItem("orientation", "horizontal");
  };

  useEffect(() => {
    const storedIsVerticalClicked = localStorage.getItem("isVerticalClicked");
    if (storedIsVerticalClicked !== null) {
      setIsVerticalClicked(storedIsVerticalClicked === "true");
    }
    const storedIsHorizontalClicked = localStorage.getItem(
      "isHorizontalClicked"
    );
    if (storedIsHorizontalClicked !== null) {
      setIsHorizontalClicked(storedIsHorizontalClicked === "true");
    }
    const storedOrientation = localStorage.getItem("orientation");
    if (storedOrientation !== null) {
      setOrientation(storedOrientation as "vertical" | "horizontal");
    }
  }, []);

  useEffect(() => {
    const storedSentNumber = localStorage.getItem("sentNumber");
    if (storedSentNumber) {
      setSentNumberOfWindows(JSON.parse(storedSentNumber));
    }
  }, []);

  useEffect(() => {
    const storedSentNumberVertical = localStorage.getItem("sentVerticalRows");
    if (storedSentNumberVertical) {
      setSentNumberOfVerticalRows(JSON.parse(storedSentNumberVertical));
    }
  }, []);

  useEffect(() => {
    const storedSentNumberHorizontal =
      localStorage.getItem("sentHorizontalCols");
    if (storedSentNumberHorizontal) {
      setSentNumberOfHorizontalCols(JSON.parse(storedSentNumberHorizontal));
    }
  }, []);

  const contextValue: WindowContextType = {
    numberOfWindows,
    sentNumberOfWindows,
    numberOfVerticalRows,
    sentNumberOfVerticalRows,
    numberOfHorizontalCols,
    sentNumberOfHorizontalCols,
    handleWindowChange,
    handleVerticalChange,
    handleHorizontalChange,
    isVerticalClicked,
    isHorizontalClicked,
    orientation,
    handleVerticalClick,
    handleHorizontalClick,
  };

  return (
    <WindowContext.Provider value={contextValue}>
      {children}
    </WindowContext.Provider>
  );
};
