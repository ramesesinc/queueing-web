import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface Colors {
  id: string;
  hfcolor: string;
}

interface ColorsContextType {
  hfcolors: Colors[];
  refreshColors: () => Promise<void>;
  addColor: (hfcolor: string) => Promise<void>;
  deleteColor: (id: string) => Promise<void>;
  showAlert: (message: string) => void;
  newHfColor: string;
  setNewHfColor: React.Dispatch<React.SetStateAction<string>>;
}

interface ColorProps {
  children: React.ReactNode;
}

const ColorsContext = createContext<ColorsContextType | undefined>(undefined);

export const useColorsContext = () => {
  const context = useContext(ColorsContext);
  if (!context) {
    throw new Error("useColorsContext must be used within a ColorsProvider");
  }
  return context;
};

export const ColorsProvider: React.FC<ColorProps> = ({ children }) => {
  const [hfcolors, setHfColors] = useState<Colors[]>([]);
  const [newHfColor, setNewHfColor] = useState("");

  const API_URL = "http://localhost:5038/";

  const showAlert = useCallback((message: string) => {
    alert(message);
  }, []);

  const refreshColors = useCallback(async () => {
    try {
      const response = await fetch(API_URL + "api/queueingweb/GetColors");
      const data = await response.json();
      setHfColors(data);
    } catch (error) {
      console.error("Error refreshing colors:", error);
      // showAlert("Error refreshing colors");
    }
  }, [API_URL, showAlert]);

  const addColor = async (hfcolor: string) => {
    try {
      if (hfcolor.trim() === "") {
        // showAlert("Please select a color.");
        return;
      }

      const data = new FormData();
      data.append("newHfColors", hfcolor);
      await fetch(API_URL + "api/queueingweb/AddColors", {
        method: "POST",
        body: data,
      });
      await refreshColors();
    } catch (error) {
      console.error("Error adding color:", error);
      // showAlert("Error adding color");
    }
  };

  const deleteColor = async (id: string) => {
    try {
      await fetch(`${API_URL}api/queueingweb/DeleteColors?id=${id}`, {
        method: "DELETE",
      });
      await refreshColors();
    } catch (error) {
      console.error("Error deleting color:", error);
      // showAlert("Error deleting color");
    }
  };

  useEffect(() => {
    refreshColors();
  }, [refreshColors]);

  return (
    <ColorsContext.Provider
      value={{
        hfcolors,
        refreshColors,
        addColor,
        deleteColor,
        showAlert,
        newHfColor,
        setNewHfColor,
      }}
    >
      {children}
    </ColorsContext.Provider>
  );
};
