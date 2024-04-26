// DataContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the interface for your context data
interface BplsDataContextValue {
  bplsdata: {
    bpls: {
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
  handleGetBplsData: () => void;
  toggleVideo: () => void;
  updateLogoUrl: (logoUrl: string) => void;
  removeLogoUrl: () => void;
  updateBgUrl: (bgUrl: string) => void;
  removeBgUrl: () => void;
  updateBgSize: (bgSize: "auto" | "contain" | "cover") => void;
}

interface BplsDatacontext {
  children: React.ReactNode;
}

const BplsDataContext = createContext<BplsDataContextValue>({
  bplsdata: {
    bpls: {
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
  handleGetBplsData: () => {},
  toggleVideo: () => {},
  updateLogoUrl: () => {},
  removeLogoUrl: () => {},
  updateBgUrl: () => {},
  removeBgUrl: () => {},
  updateBgSize: () => {},
});

export const useBplsData = () => useContext(BplsDataContext);

export const BplsDataProvider: React.FC<BplsDatacontext> = ({ children }) => {
  const [bplsdata, setBplsData] = useState<BplsDataContextValue["bplsdata"]>({
    bpls: {
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
    fetchBplsData();
  }, []);

  const fetchBplsData = () => {
    fetch("/api/data/getData")
      .then((response) => response.json())
      .then((bplsdata) => setBplsData(bplsdata))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBplsData({
      ...bplsdata,
      bpls: {
        ...bplsdata.bpls,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBplsData({
      ...bplsdata,
      bpls: {
        ...bplsdata.bpls,
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
        body: JSON.stringify({ bpls: bplsdata.bpls }),
      });
      const newBplsData = await response.json();
      console.log(newBplsData);
    } catch (error) {
      console.error("Error updating data bpls:", error);
    }
  };

  const handleGetBplsData = () => {
    fetchBplsData();
  };

  const toggleVideo = () => {
    setBplsData({
      ...bplsdata,
      bpls: {
        ...bplsdata.bpls,
        showVideo: !bplsdata.bpls.showVideo,
      },
    });
  };

  const updateLogoUrl = (logoUrl: string) => {
    setBplsData({
      ...bplsdata,
      bpls: {
        ...bplsdata.bpls,
        logoUrl: logoUrl,
      },
    });
  };

  const removeLogoUrl = () => {
    setBplsData({
      ...bplsdata,
      bpls: {
        ...bplsdata.bpls,
        logoUrl: "",
      },
    });
  };

  const updateBgUrl = (bgUrl: string) => {
    setBplsData({
      ...bplsdata,
      bpls: {
        ...bplsdata.bpls,
        bgUrl: bgUrl,
      },
    });
  };

  const removeBgUrl = () => {
    setBplsData({
      ...bplsdata,
      bpls: {
        ...bplsdata.bpls,
        bgUrl: "",
      },
    });
  };

  const updateBgSize = (bgSize: "auto" | "contain" | "cover") => {
    setBplsData({
      ...bplsdata,
      bpls: {
        ...bplsdata.bpls,
        bgSize: bgSize,
      },
    });
  };

  return (
    <BplsDataContext.Provider
      value={{
        bplsdata,
        handleChange,
        handleSubmit,
        handleGetBplsData,
        handleSelect,
        toggleVideo,
        updateLogoUrl,
        removeLogoUrl,
        updateBgUrl,
        removeBgUrl,
        updateBgSize,
      }}
    >
      {children}
    </BplsDataContext.Provider>
  );
};