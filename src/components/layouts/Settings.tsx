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
import { IoClose } from "react-icons/io5";
import Flex from "../ui/Flex";
import SubTitle from "../ui/SubTitle";

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
  toggleSidebar,
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

  const {
    mainBackground,
    handleImageUploaded,
    setBackgroundSize,
    fillClicked,
    setFillClicked,
    containClicked,
    setContainClicked,
    coverClicked,
    setCoverClicked,
  } = useBackgroundImageContext();

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

  const setBackgroundSizeHandler = (size: string) => {
    setBackgroundSize(size);
  };

  return (
    <div
      id={componentType}
      className={`h-screen w-[20%] bg-gray-800 text-white flex flex-col gap-2 justify-start items-center pt-3 fixed top-0 left-0 transition-all duration-500 z-[1] ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition duration-300"
      >
        <IoClose size={20} />
      </button>

      <Title
        text={"Colors"}
        className="text-lg uppercase border-b-2 px-2 py-1 leading-none"
      />
      <ColorPicker
        className="header"
        onChangeColor={handleHeaderColorChange}
        label="header background color"
      />
      <ColorPicker
        className="header"
        onChangeColor={handleMainColorChange}
        label="main background color"
      />
      <ColorPicker
        className="footer"
        onChangeColor={handleFooterColorChange}
        label="footer background color"
      />
      <Title
        text={"Windows"}
        className="text-lg uppercase border-b-2 px-2 py-1 leading-none"
      />
      <Flex className="gap-2">
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
      </Flex>

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

      <Title
        text={"video"}
        className="text-lg uppercase border-b-2 px-2 leading-none py-1"
      />
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
      <Title
        text={"background image"}
        className="text-[16px] leading-none uppercase border-b-2 px-2 py-1"
      />
      <SubTitle
        text={"background size"}
        className="uppercase text-[8px] leading-none !p-0"
      />
      <Flex className="gap-2">
        <Button
          text="fill"
          className={`!p-1 !px-5 rounded-sm text-[8px] leading-none ${
            fillClicked ? "bg-slate-500" : ""
          }`}
          onClick={() => {
            setBackgroundSizeHandler("fill");
            setFillClicked(true);
            setContainClicked(false);
            setCoverClicked(false);
          }}
        />
        <Button
          text="contain"
          className={`!p-1 !px-[13px] rounded-sm text-[8px] leading-none ${
            containClicked ? "bg-slate-500" : ""
          }`}
          onClick={() => {
            setBackgroundSizeHandler("contain");
            setFillClicked(false);
            setContainClicked(true);
            setCoverClicked(false);
          }}
        />
        <Button
          text="cover"
          className={`!p-1 !px-[13px] rounded-sm text-[8px] leading-none ${
            coverClicked ? "bg-slate-500" : ""
          }`}
          onClick={() => {
            setBackgroundSizeHandler("cover");
            setFillClicked(false);
            setContainClicked(false);
            setCoverClicked(true);
          }}
        />
      </Flex>
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
