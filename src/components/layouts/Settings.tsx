// components/Sidebar.tsx
import React, { useEffect, useRef, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useColorContext } from "../../service/context/color-context";
import { useWindowContext } from "../../service/context/window-context";
import { useVideoContext } from "../../service/context/video-context";
import TextBox from "../ui/TextBox";
import Title from "../ui/Title";
import ToggleBtn from "../ui/ToggleBtn";
import UploadImage from "../ui/UploadBgImage";
import ColorPicker from "../ui/ColorPicker";
import Button from "../ui/Button";
import { useBackgroundImageContext } from "../../service/context/bgimage-context";
import { useLogoImageContext } from "../../service/context/logo-context";
import { IoClose } from "react-icons/io5";
import Flex from "../ui/Flex";
import SubTitle from "../ui/SubTitle";
import UploadLogo from "../ui/UploadLogo";
import FontFamilyPicker from "../ui/FontFamilyPicker";
import { useFontFamilyContext } from "../../service/context/font-context";
import UploadVideo from "../ui/UploadVideo";

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
    windowColor,
    handleHeaderColorChange,
    handleMainColorChange,
    handleFooterColorChange,
    handleWindowColorChange,
  } = useColorContext();
  const { showVideo, toggleVideo, handleVideoUpload } = useVideoContext();
  // const sidebarRef = useRef<HTMLDivElement>(null);
  const { handleImageLogoUploaded, logo } = useLogoImageContext();
  const {
    mainBackground,
    handleImageUploaded,
    setBackgroundSize,
    autoClicked,
    setAutoClicked,
    containClicked,
    setContainClicked,
    coverClicked,
    setCoverClicked,
    backgroundSize,
  } = useBackgroundImageContext();

  const { handleFontFamilyChange, fontFamily } = useFontFamilyContext();

  // useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     if (
  //       sidebarRef.current &&
  //       !sidebarRef.current.contains(event.target as Node)
  //     ) {
  //       toggleSidebar();
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleOutsideClick);
  //   } else {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [isOpen, toggleSidebar]);

  const saveSettingsToLocalStorage = () => {
    localStorage.setItem("headerColor", headerColor);
    localStorage.setItem("mainColor", mainColor);
    localStorage.setItem("footerColor", footerColor);
    localStorage.setItem("windowColor", windowColor);
    localStorage.setItem("fontFamily", fontFamily);

    localStorage.setItem("sentNumber", JSON.stringify(numberOfWindows));
    localStorage.setItem(
      "sentVerticalRows",
      JSON.stringify(numberOfVerticalRows)
    );
    localStorage.setItem(
      "sentHorizontalCols",
      JSON.stringify(numberOfHorizontalCols)
    );
    if (logo != null) {
      localStorage.setItem("logoImage", logo);
    }

    if (mainBackground !== null) {
      localStorage.setItem("backgroundImage", mainBackground);
    }
    localStorage.setItem("backgroundSize", backgroundSize);
    window.location.reload();
  };
  const setBackgroundSizeHandler = (size: string) => {
    setBackgroundSize(size);
  };

  const resetSettings = () => {
    const defaultHeaderColor = "#0a5366";
    const defaultMainColor = "#ffffff";
    const defaultFooterColor = "#0a5366";
    const defaultWindowColor = "#ffffff";
    const defaultFontFamily = "Arial";
    const defaultNumberOfWindows = 4;
    const defaultLogo = "/images/lgu-logo.png";
    const defaultNumberOfVerticalRows = 1;
    const defaultNumberOfHorizontalCols = 1;
    const defaultBackgroundImage = "";
    const defaultBackgroundSize = "auto";
    handleHeaderColorChange(defaultHeaderColor);
    handleMainColorChange(defaultMainColor);
    handleFooterColorChange(defaultFooterColor);
    handleWindowColorChange(defaultWindowColor);
    handleFontFamilyChange(defaultFontFamily);
    handleWindowChange(defaultNumberOfWindows);
    handleImageLogoUploaded(defaultLogo);
    handleVerticalChange(defaultNumberOfVerticalRows);
    handleHorizontalChange(defaultNumberOfHorizontalCols);
    handleImageUploaded(defaultBackgroundImage);
    setBackgroundSize(defaultBackgroundSize);
  };

  return (
    <div
      id={componentType}
      className={`h-screen w-[25%] bg-gray-700 text-white flex flex-col gap-3 justify-start items-center pt-3 fixed top-0 left-0 transition-all duration-500 z-[1] ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition duration-300"
      >
        <IoClose size={20} />
      </button>
      <div className="flex items-start gap-4 pt-5">
        <div className="flex flex-col items-center justify-start gap-1 h-[195px] w-[170px] bg-gray-800 p-2 rounded">
          <Title
            text={"Background Colors"}
            className="text-[12px] uppercase border-b-2 px-2 py-1 leading-none"
          />
          <ColorPicker
            onChangeColor={handleHeaderColorChange}
            label="header color"
            initialColor={headerColor}
          />
          <ColorPicker
            onChangeColor={handleMainColorChange}
            label="main color"
            initialColor={mainColor}
          />
          <ColorPicker
            onChangeColor={handleFooterColorChange}
            label="footer color"
            initialColor={footerColor}
          />
          <ColorPicker
            onChangeColor={handleWindowColorChange}
            label="window color"
            initialColor={windowColor}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-[170px] gap-2 bg-gray-800 p-2 rounded ">
          <Title
            text={"Windows"}
            className="text-[12px] uppercase border-b-2 px-2 py-1 leading-none"
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
            label="Number of Windows"
            placeholder={` ${
              orientation === "vertical"
                ? ` ${sentNumberOfWindows}`
                : `${sentNumberOfWindows}`
            }`}
            onChange={handleWindowChange}
          />
          <TextBox
            value={sentNumberOfVerticalRows}
            label="Vertical Rows"
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
            label="Horizontal Columns"
            placeholder={` ${
              orientation === "vertical"
                ? `${sentNumberOfHorizontalCols}`
                : `${sentNumberOfHorizontalCols}`
            }`}
            onChange={handleHorizontalChange}
            className={isVerticalClicked ? "bg-gray-500" : ""}
            disabled={isVerticalClicked}
          />
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="bg-gray-800 flex w-[170px] h-[195px] flex-col gap-2 p-2 justify-start items-center rounded">
          <Title
            text={"background image"}
            className="text-[12px] leading-none uppercase border-b-2 px-2 py-1"
          />
          <UploadImage onImageUploaded={handleImageUploaded} />
          <SubTitle
            text={"background size"}
            className="uppercase text-[8px] leading-none !p-0"
          />
          <Flex className="gap-2">
            <Button
              text="auto"
              className={`!p-1 !px-2 rounded-sm text-[8px] leading-none ${
                autoClicked ? "bg-slate-500" : ""
              }`}
              onClick={() => {
                setBackgroundSizeHandler("auto");
                setAutoClicked(true);
                setContainClicked(false);
                setCoverClicked(false);
              }}
            />
            <Button
              text="contain"
              className={`!p-1 !px-2 rounded-sm text-[8px] leading-none ${
                containClicked ? "bg-slate-500" : ""
              }`}
              onClick={() => {
                setBackgroundSizeHandler("contain");
                setAutoClicked(false);
                setContainClicked(true);
                setCoverClicked(false);
              }}
            />
            <Button
              text="cover"
              className={`!p-1 !px-2 rounded-sm text-[8px] leading-none ${
                coverClicked ? "bg-slate-500" : ""
              }`}
              onClick={() => {
                setBackgroundSizeHandler("cover");
                setAutoClicked(false);
                setContainClicked(false);
                setCoverClicked(true);
              }}
            />
          </Flex>
        </div>

        <div className="bg-gray-800 w-[170px] h-[195px] flex flex-col gap-2 p-2 justify-start items-center rounded">
          <Title
            text={"Logo"}
            className="text-[12px] uppercase border-b-2 px-2 py-1 leading-none"
          />
          <UploadLogo onLogoUploaded={handleImageLogoUploaded} />

          <Title
            text={"Font Family"}
            className="text-[12px] uppercase border-b-2 px-2 py-1 leading-none"
          />
          <FontFamilyPicker onChangeFontFamily={handleFontFamilyChange} />
        </div>
      </div>
      <div className="bg-gray-800 w-[170px] h-[195px] flex flex-col gap-2 p-2 justify-start items-center rounded ">
        <Title
          text={"video"}
          className="text-[12px] uppercase border-b-2 px-2 leading-none py-1"
        />
        <UploadVideo onVideoUploaded={handleVideoUpload} />
        <ToggleBtn
          onClick={toggleVideo}
          isActive={showVideo}
          className=" "
          text={showVideo ? "hide video" : "show video"}
        />
      </div>
      <Button
        onClick={() => {
          saveSettingsToLocalStorage();
        }}
        text="Save"
        className="text-[10px] !px-3 !py-1 !rounded leading-none absolute bottom-2 right-2 hover:bg-slate-500 transition duration-200"
      />
      <Button
        onClick={() => {
          resetSettings();
        }}
        text="Reset to Default"
        className="text-[10px] !px-3 !py-1 !rounded leading-none absolute bottom-2 right-16 hover:bg-slate-500 transition duration-200"
      />
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
      className=" absolute bottom-2 right-2 text-gray-400 z-10"
    >
      <div className="flex items-center justify-center text-center flex-col hover:text-gray-100">
        <IoSettingsOutline size={18} />
        <p className="text-[10px] "> {children}</p>
      </div>
    </button>
  );
};
