import React, { useState } from "react";
import { useBplsData } from "../../service/context/bplsdatas-context";
import Flex from "../ui/Flex";
import Button from "../ui/Button";
import ColorPicker from "../ui/ColorPicker";
import InputBox from "../ui/InputBox";
import XyAxis from "../ui/XyAxis";
import Title from "../ui/Title";
import UploadImage from "../ui/UploadImage";

interface BplsProps {
  title: string;
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
  >("auto");
  const handleBgSizeChange = (bgSize: "auto" | "contain" | "cover") => {
    updateBgSize(bgSize);
    setSelectedBgSize(bgSize);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Title text={title} className="text-center text-xl" />
      <Flex className="flex-col items-center gap-3">
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
          className="h-5 w-28 text-center"
        />
        <InputBox
          label="verticalRowsCount"
          type="number"
          name="verticalRowsCount"
          value={bplsdata.bpls.verticalRowsCount}
          onChange={handleChange}
          className={`h-5 w-28 text-center ${
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
          className={`h-5 w-28 text-center ${
            bplsdata.bpls.xyAxis === "vertical"
              ? "bg-gray-400 opacity-50 border-none"
              : ""
          }`}
          disabled={bplsdata.bpls.xyAxis === "vertical"}
        />

        <Button
          caption={bplsdata.bpls.showVideo ? "Hide Video" : "Show Video"}
          className={`!p-0 !m-0 text-[10px] w-[20%] !rounded-md border-none ${
            bplsdata.bpls.showVideo ? "bg-blue-200" : "bg-gray-300"
          }`}
          onClick={toggleVideo}
        />
        <UploadImage
          onLogoUploaded={updateBgUrl}
          removeLogoImage={removeBgUrl}
        />
        <Button
          caption="contain"
          className={`!p-0 !m-0 text-[10px] w-[20%] !rounded-md ${
            selectedBgSize === "contain" ? "bg-gray-400" : ""
          }`}
          onClick={() => handleBgSizeChange("contain")}
        />
        <Button
          caption="cover"
          className={`!p-0 !m-0 text-[10px] w-[20%] !rounded-md ${
            selectedBgSize === "cover" ? "bg-gray-400" : ""
          }`}
          onClick={() => handleBgSizeChange("cover")}
        />
        <Button
          caption="auto"
          className={`!p-0 !m-0 text-[10px] w-[20%] !rounded-md ${
            selectedBgSize === "auto" ? "bg-gray-400" : ""
          }`}
          onClick={() => handleBgSizeChange("auto")}
        />
        <Button
          caption="Save"
          type="submit"
          className="!p-0 !m-0 text-[10px] w-[20%] !rounded-md"
        />
      </Flex>
    </form>
  );
};

export default Bpls;
