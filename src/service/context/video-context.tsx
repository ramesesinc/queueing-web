import React, { createContext, useContext, useEffect, useState } from "react";

interface VideoContextType {
  showVideo: boolean;
  savedShowVideo: boolean;
  toggleVideo: () => void;
}

const initialVideoState = {
  showVideo: true,
  savedShowVideo: true,
  toggleVideo: () => {},
};

interface VideoProviderProps {
  children: React.ReactNode;
}

const VideoContext = createContext<VideoContextType>(initialVideoState);

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
  const [showVideo, setShowVideo] = useState<boolean>(true);
  const [savedShowVideo, setSavedShowVideo] = useState<boolean>(true);

  const toggleVideo = () => {
    const newShowVideo = !showVideo;
    setShowVideo(newShowVideo);
    setSavedShowVideo(newShowVideo);
  };

  useEffect(() => {
    const storedShowVideo = localStorage.getItem("showVideo");
    if (storedShowVideo !== null) {
      const showVideoValue = storedShowVideo === "true";
      setShowVideo(showVideoValue);
      setSavedShowVideo(showVideoValue);
    }
  }, []);

  return (
    <VideoContext.Provider value={{ showVideo, savedShowVideo, toggleVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
