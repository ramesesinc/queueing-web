// components/Sidebar.tsx
import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useColorContext } from "../../service/context/color-context";
import { useWindowContext } from "../../service/context/window-context";
import { useVideoContext } from "../../service/context/video-context";
import TextBox from "../ui/TextBox";
import Title from "../ui/Title";
import ToggleBtn from "../ui/ToggleBtn";
import ImageUpload from "../ui/UploadImage";
import ColorPicker from "./ColorPicker";
import Button from "../ui/Button";
import { useBackgroundImageContext } from "../../service/context/image-context";

interface SettingProps {
  isOpen: boolean;
  componentType?: string;
  toggleSidebar: () => void;
  children?: React.ReactNode;
}

interface OpenSettingsProps {
  componentType?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Settings: React.FC<SettingProps> = ({
  isOpen,
  componentType,
  children,
}) => {
  const {
    numberOfWindows,
    numberOfHorizontalCols,
    numberOfVerticalRows,
    sentNumberOfWindows,
    sentNumberOfVerticalRows,
    sentNumberOfHorizontalCols,
    handleWindowChange,
    handleHorizontalChange,
    handleVerticalChange,
    isVerticalClicked,
    isHorizontalClicked,
    orientation,
    handleVerticalClick,
    handleHorizontalClick,
  } = useWindowContext();

  const {
    headerColor,
    mainColor,
    footerColor,
    handleHeaderColorChange,
    handleMainColorChange,
    handleFooterColorChange,
  } = useColorContext();

  const { showVideo, toggleVideo, savedShowVideo } = useVideoContext();

  const { mainBackground, handleImageUploaded } = useBackgroundImageContext();

  const saveSettingsToLocalStorage = () => {
    localStorage.setItem("headerColor", headerColor);
    localStorage.setItem("mainColor", mainColor);
    localStorage.setItem("footerColor", footerColor);
    localStorage.setItem("showVideo", savedShowVideo.toString());
    localStorage.setItem("sentNumber", JSON.stringify(numberOfWindows));
    localStorage.setItem(
      "sentVerticalRows",
      JSON.stringify(numberOfVerticalRows)
    );
    localStorage.setItem(
      "sentHorizontalCols",
      JSON.stringify(numberOfHorizontalCols)
    );

    if (mainBackground !== null) {
      localStorage.setItem("backgroundImage", mainBackground);
    }

    window.location.reload();
  };

  return (
    <div
      id={componentType}
      className={`h-screen w-[20%] bg-gray-800 text-white flex flex-col gap-2 justify-start items-center pt-3 fixed top-0 left-0 transition-all duration-500 z-[1] ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Title text={"Colors"} className="text-lg uppercase" />
      <ColorPicker
        className="header"
        onChangeColor={handleHeaderColorChange}
        label="header"
      />
      <ColorPicker
        className="header"
        onChangeColor={handleMainColorChange}
        label="main"
      />
      <ColorPicker
        className="footer"
        onChangeColor={handleFooterColorChange}
        label="footer"
      />
      <Title text={"Windows"} className="text-lg uppercase" />
      <Button
        text="vertical"
        className={`!p-1 !px-5 rounded-sm text-[8px] leading-none ${
          isVerticalClicked ? "bg-slate-500" : ""
        }`}
        onClick={handleVerticalClick}
      />
      <Button
        text="horizontal"
        className={`!p-1 !px-[13px] rounded-sm text-[8px] leading-none ${
          isHorizontalClicked ? "bg-slate-500" : ""
        }`}
        onClick={handleHorizontalClick}
      />
      <TextBox
        value={sentNumberOfWindows}
        label="number of windows"
        placeholder={` ${
          orientation === "vertical"
            ? ` ${sentNumberOfWindows}`
            : `${sentNumberOfWindows}`
        }`}
        onChange={handleWindowChange}
      />
      <TextBox
        value={sentNumberOfVerticalRows}
        label="vertical rows"
        placeholder={`${
          orientation === "horizontal"
            ? `${sentNumberOfVerticalRows}`
            : `${sentNumberOfVerticalRows}`
        }`}
        onChange={handleVerticalChange}
        className={isHorizontalClicked ? "bg-gray-500" : ""}
        disabled={isHorizontalClicked}
      />

      <TextBox
        value={sentNumberOfHorizontalCols}
        label="horizontal columns"
        placeholder={` ${
          orientation === "vertical"
            ? `${sentNumberOfHorizontalCols}`
            : `${sentNumberOfHorizontalCols}`
        }`}
        onChange={handleHorizontalChange}
        className={isVerticalClicked ? "bg-gray-500" : ""}
        disabled={isVerticalClicked}
      />

      <Title text={"video"} className="text-lg uppercase" />
      <ToggleBtn
        onClick={toggleVideo}
        isActive={showVideo}
        className=" "
        text={showVideo ? "hide video" : "show video"}
      />

      <Button
        onClick={() => {
          saveSettingsToLocalStorage();
        }}
        text="Save"
        className="text-[10px] !px-3 !py-1 !rounded leading-none absolute bottom-2 right-2 hover:bg-slate-500 transition duration-200"
      />
      <ImageUpload onImageUploaded={handleImageUploaded} />
      {children}
    </div>
  );
};

export const OpenSettings: React.FC<OpenSettingsProps> = ({
  componentType,
  children,
  onClick,
}) => {
  return (
    <button
      id={componentType}
      onClick={onClick}
      className=" absolute bottom-2 right-2 text-gray-400"
    >
      <div className="flex items-center justify-center text-center flex-col hover:text-gray-100">
        <IoSettingsOutline size={18} />
        <p className="text-[10px] "> {children}</p>
      </div>
    </button>
  );
};
