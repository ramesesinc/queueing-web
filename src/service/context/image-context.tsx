// BackgroundImageContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface BackgroundImage {
  children: React.ReactNode;
}

interface BackgroundImageContextType {
  mainBackground: string | null;
  handleImageUploaded: (image: string) => void;
}

const BackgroundImageContext = createContext<BackgroundImageContextType>({
  mainBackground: null,
  handleImageUploaded: () => {},
});

export const useBackgroundImageContext = () =>
  useContext(BackgroundImageContext);

export const BackgroundImageProvider: React.FC<BackgroundImage> = ({
  children,
}) => {
  const [mainBackground, setMainBackground] = useState<string | null>(null);

  // Retrieve image URL from local storage when component mounts
  useEffect(() => {
    const storedBackgroundImage = localStorage.getItem("backgroundImage");
    if (storedBackgroundImage) {
      setMainBackground(storedBackgroundImage);
    }
  }, []);

  const handleImageUploaded = (image: string) => {
    // Save image URL to local storage
    localStorage.setItem("backgroundImage", image);
    setMainBackground(image);
  };

  return (
    <BackgroundImageContext.Provider
      value={{ mainBackground, handleImageUploaded }}
    >
      {children}
    </BackgroundImageContext.Provider>
  );
};
