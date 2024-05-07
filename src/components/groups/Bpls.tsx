import React, { useState } from "react";
import { useBplsData } from "../../service/context/bplsdatas-context";
import Flex from "../ui/Flex";
import Button from "../ui/Button";
import ColorPicker from "../ui/ColorPicker";
import InputBox from "../ui/InputBox";
import XyAxis from "../ui/XyAxis";
import Title from "../ui/Title";
import UploadImage from "../ui/UploadImage";
import ToggleButton from "../ui/ToggleBtn";

interface BplsProps {
  title?: string;
}

const Bpls: React.FC<BplsProps> = ({ title }) => {
  const {
    bplsdata,
    handleChange,
    handleSubmit,
    handleSelect,
    toggleVideo,
    updateBgUrl,
    removeBgUrl,
    updateBgSize,
  } = useBplsData();
  const [selectedBgSize, setSelectedBgSize] = useState<
    "auto" | "contain" | "cover"
  >(bplsdata.bpls.bgSize);
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
          value={bplsdata.bpls.color}
          onChange={handleChange}
          label="header and footer color"
        />
        <ColorPicker
          name={"windowColor"}
          value={bplsdata.bpls.windowColor}
          onChange={handleChange}
          label="window color"
        />
        <XyAxis
          value={bplsdata.bpls.xyAxis}
          onChange={handleSelect}
          name={"xyAxis"}
          label="Window X & Y axis"
        />
        <InputBox
          label="Window Count"
          type="number"
          name="windowCount"
          value={bplsdata.bpls.windowCount}
          onChange={handleChange}
          className="h-6 w-28 text-center"
        />
        <InputBox
          label="verticalRowsCount"
          type="number"
          name="verticalRowsCount"
          value={bplsdata.bpls.verticalRowsCount}
          onChange={handleChange}
          className={`h-6 w-28 text-center ${
            bplsdata.bpls.xyAxis === "horizontal"
              ? "bg-gray-400 opacity-50 border-none"
              : ""
          }`}
          disabled={bplsdata.bpls.xyAxis === "horizontal"}
        />
        <InputBox
          label="horizontalColsCount"
          type="number"
          name="horizontalColsCount"
          value={bplsdata.bpls.horizontalColsCount}
          onChange={handleChange}
          className={`h-6 w-28 text-center ${
            bplsdata.bpls.xyAxis === "vertical"
              ? "bg-gray-400 opacity-50 border-none"
              : ""
          }`}
          disabled={bplsdata.bpls.xyAxis === "vertical"}
        />
        <ToggleButton
          isActive={bplsdata.bpls.showVideo}
          onClick={toggleVideo}
          caption={bplsdata.bpls.showVideo ? "Hide Video" : "Show Video"}
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

export default Bpls;
