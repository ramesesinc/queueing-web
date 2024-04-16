import React, { createContext, useContext, useState, useEffect } from "react";

interface LogoImage {
  children: React.ReactNode;
}

interface LogoImageContextType {
  logo: string | null;
  handleImageLogoUploaded: (image: string) => void;
  removeLogoImage: () => void;
}

const LogoImageContext = createContext<LogoImageContextType>({
  logo: null,
  handleImageLogoUploaded: () => {},
  removeLogoImage: () => {},
});

export const useLogoImageContext = () => useContext(LogoImageContext);

export const LogoImageProvider: React.FC<LogoImage> = ({ children }) => {
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    const storedLogoImage = localStorage.getItem("logoImage");

    if (storedLogoImage) {
      setLogo(storedLogoImage);
    }
  }, []);

  const handleImageLogoUploaded = (image: string) => {
    setLogo(image);
  };

  const removeLogoImage = () => {
    localStorage.removeItem("logoImage");
    setLogo(null);
  };

  return (
    <LogoImageContext.Provider
      value={{
        logo,
        handleImageLogoUploaded,
        removeLogoImage,
      }}
    >
      {children}
    </LogoImageContext.Provider>
  );
};
