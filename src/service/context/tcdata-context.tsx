// DataContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the interface for your context data
interface TcDataContextValue {
  tcdata: {
    tc: {
      color: string;
      fontFamily: string;
      windowCount: number;
      xyAxis: string;
      verticalRowsCount: number;
      horizontalColsCount: number;
      windowColor: string;
      showVideo: boolean;
      logoUrl: string;
      bgUrl: string;
      bgSize: "auto" | "contain" | "cover";
    };
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleGetTcData: () => void;
  toggleVideo: () => void;
  updateLogoUrl: (logoUrl: string) => void;
  removeLogoUrl: () => void;
  updateBgUrl: (bgUrl: string) => void;
  removeBgUrl: () => void;
  updateBgSize: (bgSize: "auto" | "contain" | "cover") => void;
}

interface TcDatacontext {
  children: React.ReactNode;
}

// Create the context with a default value
const TcDataContext = createContext<TcDataContextValue>({
  tcdata: {
    tc: {
      color: "",
      fontFamily: "",
      windowCount: 0,
      xyAxis: "",
      verticalRowsCount: 0,
      horizontalColsCount: 0,
      windowColor: "",
      showVideo: true,
      logoUrl: "",
      bgUrl: "",
      bgSize: "auto",
    },
  },
  handleChange: () => {},
  handleSelect: () => {},
  handleSubmit: () => {},
  handleGetTcData: () => {},
  toggleVideo: () => {},
  updateLogoUrl: () => {},
  removeLogoUrl: () => {},
  updateBgUrl: () => {},
  removeBgUrl: () => {},
  updateBgSize: () => {},
});

export const useTcData = () => useContext(TcDataContext);

export const TcDataProvider: React.FC<TcDatacontext> = ({ children }) => {
  const [tcdata, setTcData] = useState<TcDataContextValue["tcdata"]>({
    tc: {
      color: "",
      fontFamily: "",
      windowCount: 0,
      xyAxis: "",
      verticalRowsCount: 0,
      horizontalColsCount: 0,
      windowColor: "",
      showVideo: true,
      logoUrl: "",
      bgUrl: "",
      bgSize: "auto",
    },
  });

  useEffect(() => {
    fetchTcData();
  }, []);

  const fetchTcData = () => {
    fetch("/api/data/getData")
      .then((response) => response.json())
      .then((tcdata) => setTcData(tcdata))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTcData({
      ...tcdata,
      tc: {
        ...tcdata.tc,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTcData({
      ...tcdata,
      tc: {
        ...tcdata.tc,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/data/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tc: tcdata.tc }),
      });
      const newTcData = await response.json();
      console.log(newTcData);
    } catch (error) {
      console.error("Error updating data tc:", error);
    }
  };

  const handleGetTcData = () => {
    fetchTcData();
  };

  const toggleVideo = () => {
    setTcData({
      ...tcdata,
      tc: {
        ...tcdata.tc,
        showVideo: !tcdata.tc.showVideo,
      },
    });
  };

  const updateLogoUrl = (logoUrl: string) => {
    setTcData({
      ...tcdata,
      tc: {
        ...tcdata.tc,
        logoUrl: logoUrl,
      },
    });
  };

  const removeLogoUrl = () => {
    setTcData({
      ...tcdata,
      tc: {
        ...tcdata.tc,
        logoUrl: "",
      },
    });
  };

  const updateBgUrl = (bgUrl: string) => {
    setTcData({
      ...tcdata,
      tc: {
        ...tcdata.tc,
        bgUrl: bgUrl,
      },
    });
  };

  const removeBgUrl = () => {
    setTcData({
      ...tcdata,
      tc: {
        ...tcdata.tc,
        bgUrl: "",
      },
    });
  };

  const updateBgSize = (bgSize: "auto" | "contain" | "cover") => {
    setTcData({
      ...tcdata,
      tc: {
        ...tcdata.tc,
        bgSize: bgSize,
      },
    });
  };

  return (
    <TcDataContext.Provider
      value={{
        tcdata,
        handleChange,
        handleSubmit,
        handleGetTcData,
        handleSelect,
        toggleVideo,
        updateBgSize,
        updateBgUrl,
        updateLogoUrl,
        removeBgUrl,
        removeLogoUrl,
      }}
    >
      {children}
    </TcDataContext.Provider>
  );
};
