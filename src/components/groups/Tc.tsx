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
import { VideoPosition, WindowPosition } from "../ui/MainConPosition";
import Buzz from "../ui/Buzz";

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
    resetData,
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
        <div className="grid grid-cols-2 grid-flow-row gap-2 items-center justify-center">
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
          <WindowPosition
            value={tcdata.tc.windowposition}
            onChange={handleSelect}
            name="windowposition"
            winLabel="window position"
          />
          <VideoPosition
            value={tcdata.tc.videoposition}
            onChange={handleSelect}
            name={"videoposition"}
            vidLabel="video position"
          />
          <InputBox
            label="videoUrl"
            type="text"
            name="videoUrl"
            value={tcdata.tc.videoUrl}
            onChange={handleChange}
            className="h-6 w-28 text-center"
          />
          <Buzz
            value={tcdata.tc.buzz}
            onChange={handleSelect}
            name={"buzz"}
            label="Buzz Sound"
          />
        </div>
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
            className={`!p-0 !m-0 text-[10px] w-[8%] max-xl:w-[6%] h-[25px] text-center flex items-center justify-center !rounded-md ${
              selectedBgSize === "contain" ? "bg-gray-400" : ""
            }`}
            onClick={() => handleBgSizeChange("contain")}
          />
          <Button
            caption="cover"
            className={`!p-0 !m-0 text-[10px] w-[8%] max-xl:w-[6%] h-[25px] text-center flex items-center justify-center !rounded-md ${
              selectedBgSize === "cover" ? "bg-gray-400" : ""
            }`}
            onClick={() => handleBgSizeChange("cover")}
          />
          <Button
            caption="auto"
            className={`!p-0 !m-0 text-[10px] w-[8%] max-xl:w-[6%] h-[25px] text-center flex items-center justify-center !rounded-md ${
              selectedBgSize === "auto" ? "bg-gray-400" : ""
            }`}
            onClick={() => handleBgSizeChange("auto")}
          />
        </Flex>
        <Flex className="gap-10 absolute bottom-2 right-2">
          <Button
            caption="Reset"
            className="px-5 m-0 text-[10px] w-[60px] h-[25px] text-center flex items-center justify-center !rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
            onClick={resetData}
          />
          <Button
            caption="Save"
            type="submit"
            className="px-5 m-0 text-[10px] w-[60px] h-[25px] text-center flex items-center justify-center !rounded-md bg-blue-500 hover:bg-blue-600 text-white"
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default Tc;
