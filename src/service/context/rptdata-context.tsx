// DataContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the interface for your context data
interface RptDataContextValue {
  rptdata: {
    rpt: {
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
  handleGetRptData: () => void;
  toggleVideo: () => void;
  updateLogoUrl: (logoUrl: string) => void;
  removeLogoUrl: () => void;
  updateBgUrl: (bgUrl: string) => void;
  removeBgUrl: () => void;
  updateBgSize: (bgSize: "auto" | "contain" | "cover") => void;
}

interface RptDatacontext {
  children: React.ReactNode;
}

const RptDataContext = createContext<RptDataContextValue>({
  rptdata: {
    rpt: {
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
  handleGetRptData: () => {},
  toggleVideo: () => {},
  updateLogoUrl: () => {},
  removeLogoUrl: () => {},
  updateBgUrl: () => {},
  removeBgUrl: () => {},
  updateBgSize: () => {},
});

export const useRptData = () => useContext(RptDataContext);

export const RptDataProvider: React.FC<RptDatacontext> = ({ children }) => {
  const [rptdata, setRptData] = useState<RptDataContextValue["rptdata"]>({
    rpt: {
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
    fetchRptData();
  }, []);

  const fetchRptData = () => {
    fetch("/api/data/getData")
      .then((response) => response.json())
      .then((rptdata) => setRptData(rptdata))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRptData({
      ...rptdata,
      rpt: {
        ...rptdata.rpt,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRptData({
      ...rptdata,
      rpt: {
        ...rptdata.rpt,
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
        body: JSON.stringify({ rpt: rptdata.rpt }),
      });
      const newRptData = await response.json();
      console.log(newRptData);
    } catch (error) {
      console.error("Error updating data rpt:", error);
    }
  };

  const handleGetRptData = () => {
    fetchRptData();
  };

  const toggleVideo = () => {
    setRptData({
      ...rptdata,
      rpt: {
        ...rptdata.rpt,
        showVideo: !rptdata.rpt.showVideo,
      },
    });
  };

  const updateLogoUrl = (logoUrl: string) => {
    setRptData({
      ...rptdata,
      rpt: {
        ...rptdata.rpt,
        logoUrl: logoUrl,
      },
    });
  };

  const removeLogoUrl = () => {
    setRptData({
      ...rptdata,
      rpt: {
        ...rptdata.rpt,
        logoUrl: "",
      },
    });
  };

  const updateBgUrl = (bgUrl: string) => {
    setRptData({
      ...rptdata,
      rpt: {
        ...rptdata.rpt,
        bgUrl: bgUrl,
      },
    });
  };

  const removeBgUrl = () => {
    setRptData({
      ...rptdata,
      rpt: {
        ...rptdata.rpt,
        bgUrl: "",
      },
    });
  };

  const updateBgSize = (bgSize: "auto" | "contain" | "cover") => {
    setRptData({
      ...rptdata,
      rpt: {
        ...rptdata.rpt,
        bgSize: bgSize,
      },
    });
  };

  return (
    <RptDataContext.Provider
      value={{
        rptdata,
        handleChange,
        handleSubmit,
        handleGetRptData,
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
    </RptDataContext.Provider>
  );
};
