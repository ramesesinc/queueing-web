import React, { createContext, useContext, useState, useEffect } from "react";

interface BackgroundImage {
  children: React.ReactNode;
}

interface BackgroundImageContextType {
  mainBackground: string | null;
  backgroundSize: string;
  autoClicked: boolean;
  containClicked: boolean;
  coverClicked: boolean;
  handleImageUploaded: (image: string) => void;
  setBackgroundSize: (size: string) => void;
  setAutoClicked: (clicked: boolean) => void;
  setContainClicked: (clicked: boolean) => void;
  setCoverClicked: (clicked: boolean) => void;
  removeBackgroundImage: () => void;
}

const BackgroundImageContext = createContext<BackgroundImageContextType>({
  mainBackground: null,
  backgroundSize: "contain",
  autoClicked: false,
  containClicked: false,
  coverClicked: false,
  handleImageUploaded: () => {},
  setBackgroundSize: () => {},
  setAutoClicked: () => {},
  setContainClicked: () => {},
  setCoverClicked: () => {},
  removeBackgroundImage: () => {},
});

export const useBackgroundImageContext = () =>
  useContext(BackgroundImageContext);

export const BackgroundImageProvider: React.FC<BackgroundImage> = ({
  children,
}) => {
  const [mainBackground, setMainBackground] = useState<string | null>(null);
  const [backgroundSize, setBackgroundSize] = useState("contain");
  const [autoClicked, setAutoClicked] = useState(false);
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
      if (storedBackgroundSize === "auto") {
        setAutoClicked(true);
        setContainClicked(false);
        setCoverClicked(false);
      } else if (storedBackgroundSize === "contain") {
        setAutoClicked(false);
        setContainClicked(true);
        setCoverClicked(false);
      } else if (storedBackgroundSize === "cover") {
        setAutoClicked(false);
        setContainClicked(false);
        setCoverClicked(true);
      }
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

  const removeBackgroundImage = () => {
    localStorage.removeItem("backgroundImage");
    setMainBackground(null);
  };

  return (
    <BackgroundImageContext.Provider
      value={{
        mainBackground,
        backgroundSize,
        handleImageUploaded,
        setBackgroundSize: handleBackgroundSizeChange,
        autoClicked,
        containClicked,
        coverClicked,
        setAutoClicked,
        setContainClicked,
        setCoverClicked,
        removeBackgroundImage,
      }}
    >
      {children}
    </BackgroundImageContext.Provider>
  );
};
