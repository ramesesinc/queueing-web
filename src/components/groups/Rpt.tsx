import React, { useState } from "react";
import { useRptData } from "../../service/context/rptdata-context";
import Flex from "../ui/Flex";
import Button from "../ui/Button";
import ColorPicker from "../ui/ColorPicker";
import InputBox from "../ui/InputBox";
import XyAxis from "../ui/XyAxis";
import Title from "../ui/Title";
import UploadImage from "../ui/UploadImage";

interface RptProps {
  title?: string;
}

const Rpt: React.FC<RptProps> = ({ title }) => {
  const {
    rptdata,
    handleChange,
    handleSubmit,
    handleSelect,
    toggleVideo,
    updateBgUrl,
    removeBgUrl,
    updateBgSize,
  } = useRptData();
  const [selectedBgSize, setSelectedBgSize] = useState<
    "auto" | "contain" | "cover"
  >("auto");
  const handleBgSizeChange = (bgSize: "auto" | "contain" | "cover") => {
    updateBgSize(bgSize);
    setSelectedBgSize(bgSize);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Title text={title || ""} className="text-center text-xl" />
      <Flex className="flex-col items-center gap-1">
        <ColorPicker
          name={"color"}
          value={rptdata.rpt.color}
          onChange={handleChange}
          label="header and footer color"
        />
        <ColorPicker
          name={"windowColor"}
          value={rptdata.rpt.windowColor}
          onChange={handleChange}
          label="window color"
        />
        <XyAxis
          value={rptdata.rpt.xyAxis}
          onChange={handleSelect}
          name={"xyAxis"}
          label="Window X & Y axis"
        />
        <InputBox
          label="Window Count"
          type="number"
          name="windowCount"
          value={rptdata.rpt.windowCount}
          onChange={handleChange}
          className="h-5 w-28 text-center"
        />
        <InputBox
          label="verticalRowsCount"
          type="number"
          name="verticalRowsCount"
          value={rptdata.rpt.verticalRowsCount}
          onChange={handleChange}
          className={`h-5 w-28 text-center ${
            rptdata.rpt.xyAxis === "horizontal"
              ? "bg-gray-400 opacity-50 border-none"
              : ""
          }`}
          disabled={rptdata.rpt.xyAxis === "horizontal"}
        />

        <InputBox
          label="horizontalColsCount"
          type="number"
          name="horizontalColsCount"
          value={rptdata.rpt.horizontalColsCount}
          onChange={handleChange}
          className={`h-5 w-28 text-center ${
            rptdata.rpt.xyAxis === "vertical"
              ? "bg-gray-400 opacity-50 border-none"
              : ""
          }`}
          disabled={rptdata.rpt.xyAxis === "vertical"}
        />
        <Button
          caption={rptdata.rpt.showVideo ? "Hide Video" : "Show Video"}
          className={`!p-0 !m-0 text-[10px] w-[25%] !rounded-md border-none ${
            rptdata.rpt.showVideo ? "bg-blue-200" : "bg-gray-300"
          }`}
          onClick={toggleVideo}
        />
        <UploadImage
          onLogoUploaded={updateBgUrl}
          removeLogoImage={removeBgUrl}
        />
        <Flex className=" gap-5 w-full items-center justify-center">
          <Button
            caption="contain"
            className={`!p-0 !m-0 text-[10px] w-[20%] h-[25px] text-center flex items-center justify-center !rounded-md ${
              selectedBgSize === "contain" ? "bg-gray-400" : ""
            }`}
            onClick={() => handleBgSizeChange("contain")}
          />
          <Button
            caption="cover"
            className={`!p-0 !m-0 text-[10px] w-[20%] h-[25px] text-center flex items-center justify-center !rounded-md ${
              selectedBgSize === "cover" ? "bg-gray-400" : ""
            }`}
            onClick={() => handleBgSizeChange("cover")}
          />
          <Button
            caption="auto"
            className={`!p-0 !m-0 text-[10px] w-[20%] h-[25px] text-center flex items-center justify-center !rounded-md ${
              selectedBgSize === "auto" ? "bg-gray-400" : ""
            }`}
            onClick={() => handleBgSizeChange("auto")}
          />
        </Flex>
        <Button
          caption="Save"
          type="submit"
          className="!p-0 !m-0 text-[10px] w-[15%] h-[25px] text-center flex items-center justify-center !rounded-md absolute bottom-2 right-2"
        />
      </Flex>
    </form>
  );
};

export default Rpt;
