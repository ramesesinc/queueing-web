// DataContext.ts
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the interface for your context data
interface DataContextValue {
  datas: {
    color: string;
    fontFamily: string;
    windowCount: number;
    xyAxis: string;
    verticalRowsCount: number;
    horizontalColsCount: number;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleGetData: () => void;
}

interface Datacontext {
  children: React.ReactNode;
}

// Create the context with a default value
const DataContext = createContext<DataContextValue>({
  datas: {
    color: "",
    fontFamily: "",
    windowCount: 0,
    xyAxis: "",
    verticalRowsCount: 0,
    horizontalColsCount: 0,
  },
  handleChange: () => {},
  handleSelect: () => {},
  handleSubmit: () => {},
  handleGetData: () => {},
});

// Create a custom hook to consume the context
export const useData = () => useContext(DataContext);

// Define the DataProvider component
export const DataProvider: React.FC<Datacontext> = ({ children }) => {
  const [datas, setDatas] = useState({
    color: "",
    fontFamily: "",
    windowCount: 0,
    xyAxis: "",
    verticalRowsCount: 0,
    horizontalColsCount: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setDatas(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDatas({
      ...datas,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDatas({
      ...datas,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      });
      const newData = await response.json();
      console.log(newData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleGetData = () => {
    fetchData();
  };

  return (
    <DataContext.Provider
      value={{ datas, handleChange, handleSubmit, handleGetData, handleSelect }}
    >
      {children}
    </DataContext.Provider>
  );
};
