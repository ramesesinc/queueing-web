import React, { useState } from "react";
import { useTcData } from "../../service/context/tcdata-context";
import Flex from "../ui/Flex";
import Button from "../ui/Button";
import ColorPicker from "../ui/ColorPicker";
import InputBox from "../ui/InputBox";
import XyAxis from "../ui/XyAxis";
import Title from "../ui/Title";
import UploadImage from "../ui/UploadImage";
import ToggleButton from "../ui/ToggleBtn";

interface TcProps {
  title?: string;
}

const Tc: React.FC<TcProps> = ({ title }) => {
  const {
    tcdata,
    handleChange,
    handleSubmit,
    handleSelect,
    toggleVideo,
    updateBgUrl,
    removeBgUrl,
    updateBgSize,
  } = useTcData();
  const [selectedBgSize, setSelectedBgSize] = useState<
    "auto" | "contain" | "cover"
  >(tcdata.tc.bgSize);
  const handleBgSizeChange = (bgSize: "auto" | "contain" | "cover") => {
    updateBgSize(bgSize);
    setSelectedBgSize(bgSize);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Title text={title || ""} className="text-start pb-5 text-xl" />
      <Flex className="flex-col items-center gap-1">
        <ColorPicker
          name={"color"}
          value={tcdata.tc.color}
          onChange={handleChange}
          label="header and footer color"
        />
        <ColorPicker
          name={"windowColor"}
          value={tcdata.tc.windowColor}
          onChange={handleChange}
          label="window color"
        />
        <XyAxis
          value={tcdata.tc.xyAxis}
          onChange={handleSelect}
          name={"xyAxis"}
          label="Window X & Y axis"
        />
        <InputBox
          label="Window Count"
          type="number"
          name="windowCount"
          value={tcdata.tc.windowCount}
          onChange={handleChange}
          className="h-6 w-28 text-center"
        />
        <InputBox
          label="verticalRowsCount"
          type="number"
          name="verticalRowsCount"
          value={tcdata.tc.verticalRowsCount}
          onChange={handleChange}
          className={`h-6 w-28 text-center ${
            tcdata.tc.xyAxis === "horizontal"
              ? "bg-gray-400 opacity-50 border-none"
              : ""
          }`}
          disabled={tcdata.tc.xyAxis === "horizontal"}
        />

        <InputBox
          label="horizontalColsCount"
          type="number"
          name="horizontalColsCount"
          value={tcdata.tc.horizontalColsCount}
          onChange={handleChange}
          className={`h-6 w-28 text-center ${
            tcdata.tc.xyAxis === "vertical"
              ? "bg-gray-400 opacity-50 border-none"
              : ""
          }`}
          disabled={tcdata.tc.xyAxis === "vertical"}
        />
        <ToggleButton
          isActive={tcdata.tc.showVideo}
          onClick={toggleVideo}
          caption={tcdata.tc.showVideo ? "Hide Video" : "Show Video"}
        />
        <UploadImage
          onLogoUploaded={updateBgUrl}
          removeLogoImage={removeBgUrl}
          title="background image"
        />
        <Flex className=" gap-5 w-full items-center justify-center">
          <Button
            caption="contain"
            className={`!p-0 !m-0 text-[10px] w-[10%] max-xl:w-[8%] h-[25px] text-center flex items-center justify-center !rounded-md ${
              selectedBgSize === "contain" ? "bg-gray-400" : ""
            }`}
            onClick={() => handleBgSizeChange("contain")}
          />
          <Button
            caption="cover"
            className={`!p-0 !m-0 text-[10px] w-[10%] max-xl:w-[8%] h-[25px] text-center flex items-center justify-center !rounded-md ${
              selectedBgSize === "cover" ? "bg-gray-400" : ""
            }`}
            onClick={() => handleBgSizeChange("cover")}
          />
          <Button
            caption="auto"
            className={`!p-0 !m-0 text-[10px] w-[10%] max-xl:w-[8%] h-[25px] text-center flex items-center justify-center !rounded-md ${
              selectedBgSize === "auto" ? "bg-gray-400" : ""
            }`}
            onClick={() => handleBgSizeChange("auto")}
          />
        </Flex>
        <Button
          caption="Save"
          type="submit"
          className="!p-0 !m-0 text-[10px] w-[8%] max-xl:w-[6%] h-[25px] text-center flex items-center justify-center !rounded-md absolute bottom-2 right-2"
        />
      </Flex>
    </form>
  );
};

export default Tc;
