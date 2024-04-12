import React, { createContext, useContext, useState, useEffect } from "react";

interface BackgroundImage {
  children: React.ReactNode;
}

interface BackgroundImageContextType {
  mainBackground: string | null;
  backgroundSize: string;
  fillClicked: boolean;
  containClicked: boolean;
  coverClicked: boolean;
  handleImageUploaded: (image: string) => void;
  setBackgroundSize: (size: string) => void;
  setFillClicked: (clicked: boolean) => void;
  setContainClicked: (clicked: boolean) => void;
  setCoverClicked: (clicked: boolean) => void;
}

const BackgroundImageContext = createContext<BackgroundImageContextType>({
  mainBackground: null,
  backgroundSize: "contain",
  fillClicked: false,
  containClicked: false,
  coverClicked: false,
  handleImageUploaded: () => {},
  setBackgroundSize: () => {},
  setFillClicked: () => {},
  setContainClicked: () => {},
  setCoverClicked: () => {},
});

export const useBackgroundImageContext = () =>
  useContext(BackgroundImageContext);

export const BackgroundImageProvider: React.FC<BackgroundImage> = ({
  children,
}) => {
  const [mainBackground, setMainBackground] = useState<string | null>(null);
  const [backgroundSize, setBackgroundSize] = useState("contain");
  const [fillClicked, setFillClicked] = useState(false);
  const [containClicked, setContainClicked] = useState(false);
  const [coverClicked, setCoverClicked] = useState(false);

  useEffect(() => {
    const storedBackgroundImage = localStorage.getItem("backgroundImage");
    const storedBackgroundSize = localStorage.getItem("backgroundSize");
    if (storedBackgroundImage) {
      setMainBackground(storedBackgroundImage);
    }
    if (storedBackgroundSize) {
      setBackgroundSize(storedBackgroundSize);
    }
  }, []);

  const handleImageUploaded = (image: string) => {
    localStorage.setItem("backgroundImage", image);
    setMainBackground(image);
  };

  const handleBackgroundSizeChange = (size: string) => {
    localStorage.setItem("backgroundSize", size);
    setBackgroundSize(size);
  };

  return (
    <BackgroundImageContext.Provider
      value={{
        mainBackground,
        backgroundSize,
        handleImageUploaded,
        setBackgroundSize: handleBackgroundSizeChange,
        fillClicked,
        containClicked,
        coverClicked,
        setFillClicked,
        setContainClicked,
        setCoverClicked,
      }}
    >
      {children}
    </BackgroundImageContext.Provider>
  );
};
