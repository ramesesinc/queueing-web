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
import { VideoPosition, WindowPosition } from "../ui/MainConPosition";
import Buzz from "../ui/Buzz";

interface BplsProps {
  title?: string;
  themeValue: string;
  themeOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  windowValueCount?: string | number;
  windowOnChangeCount?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  windowColorValue: string;
  windowOnChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => void;
  xyAxisValue: string;
  xyAxisOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  windowPositionValue?: string;
  windowPositionOnChange?: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  xyAxisVerticalRowsCountValue?: string | number;
  xyAxisVerticalRowsOnChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  xyAxisVerticalRowsClassName?: string;
  xyAxisVerticalRowsDisabled: boolean | string;
  xyAxisHorizontalColsCountValue?: string | number;
  xyAxisHorizontalColsDisabled: boolean | string;
  xyAxisHorizontalColsOnChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  xyAxisHorizontalColsClassName?: string;
  videoUrlValue?: string | number;
  videoUrlOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  videoPositionValue?: string;
  videoPositionOnChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  showVideoIsActive: boolean;
  showVideoOnClick: () => void;
  showVideoText?: string;
  buzzValue: string;
  buzzOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  bgUrlUpload: (image: string) => void;
  bgUrlRemove: () => void;
  bgSize?: any;
  resetDatas?: () => void;
}

const Bpls: React.FC<BplsProps> = ({
  title,
  themeValue,
  themeOnChange,
  windowValueCount,
  windowOnChangeCount,
  windowColorValue,
  windowOnChangeColor,
  windowPositionOnChange,
  windowPositionValue,
  xyAxisHorizontalColsClassName,
  xyAxisHorizontalColsCountValue,
  xyAxisHorizontalColsDisabled,
  xyAxisHorizontalColsOnChange,
  xyAxisOnChange,
  xyAxisValue,
  xyAxisVerticalRowsClassName,
  xyAxisVerticalRowsCountValue,
  xyAxisVerticalRowsDisabled,
  xyAxisVerticalRowsOnChange,
  videoPositionOnChange,
  videoPositionValue,
  videoUrlOnChange,
  videoUrlValue,
  showVideoIsActive,
  showVideoOnClick,
  showVideoText,
  buzzOnChange,
  buzzValue,
  bgSize,
  bgUrlRemove,
  bgUrlUpload,
  resetDatas,
}) => {
  const {
    bplsdata,
    handleChange,
    handleSubmit,
    handleSelect,
    toggleVideo,
    updateBgUrl,
    removeBgUrl,
    updateBgSize,
    resetData,
    setBplsData,
  } = useBplsData();

  const [selectedBgSize, setSelectedBgSize] = useState<
    "auto" | "contain" | "cover"
  >(bgSize);

  const handleBgSizeChange = (bgSize: "auto" | "contain" | "cover") => {
    updateBgSize(bgSize);
    setSelectedBgSize(bgSize);
  };

  const handlePositionChange = (name: string, value: string) => {
    if (name === "windowposition") {
      const newVideoPosition =
        value === "main-left" ? "main-right" : "main-left";
      setBplsData({
        ...bplsdata,
        bpls: {
          ...bplsdata.bpls,
          windowposition: value,
          videoposition: newVideoPosition,
        },
      });
    } else if (name === "videoposition") {
      const newWindowPosition =
        value === "main-left" ? "main-right" : "main-left";
      setBplsData({
        ...bplsdata,
        bpls: {
          ...bplsdata.bpls,
          videoposition: value,
          windowposition: newWindowPosition,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Title text={title || ""} className="text-start pb-5 text-xl" />
      <Flex className="flex-col items-start gap-1">
        <Title text={"Theme"} className="text-start font-semibold text-xl" />
        <ColorPicker
          name={"color"}
          value={themeValue}
          onChange={themeOnChange}
          label=""
        />
        <div>
          <Title
            text={"Window"}
            className="text-start pb-2 font-semibold text-xl"
          />
          <div className="flex gap-5 justify-center item-center pl-5">
            <InputBox
              label="Number of Windows"
              type="number"
               name="windowCount"
              value={windowValueCount}
              onChange={windowOnChangeCount}
              className="h-6 w-28 text-center"
            />
            <ColorPicker
              name={"windowColor"}
              value={windowColorValue}
              onChange={windowOnChangeColor}
              label="window color"
            />
          </div>
        </div>
        <div className="flex gap-5 pl-5">
          <div className="flex flex-col">
            <Title
              text={"Window Position"}
              className="text-start font-normal text-xl"
            />
            <XyAxis
              value={xyAxisValue}
              onChange={xyAxisOnChange}
              name={"xyAxis"}
              label=""
            />

            <WindowPosition
              value={bplsdata.bpls.windowposition}
              onChange={(e) =>
                handlePositionChange("windowposition", e.target.value)
              }
              name="windowposition"
              winLabel=""
            />
          </div>
          <div>
            <Title
              text={"X & Y axis"}
              className="text-start font-normal text-xl"
            />
            <InputBox
              label=""
              type="number"
              name="verticalRowsCount"
              value={xyAxisVerticalRowsCountValue}
              onChange={xyAxisVerticalRowsOnChange}
              className={`h-6 w-28 text-center ${
                xyAxisVerticalRowsClassName === "horizontal"
                  ? "bg-gray-400 opacity-50 border-none"
                  : ""
              }`}
              disabled={xyAxisVerticalRowsDisabled === "horizontal"}
            />

            <InputBox
              label=""
              type="number"
              name="horizontalColsCount"
              value={xyAxisHorizontalColsCountValue}
              onChange={xyAxisHorizontalColsOnChange}
              className={`h-6 w-28 text-center ${
                xyAxisHorizontalColsClassName === "vertical"
                  ? "bg-gray-400 opacity-50 border-none"
                  : ""
              }`}
              disabled={xyAxisHorizontalColsDisabled === "vertical"}
            />
          </div>
        </div>
        <Title text={"Video"} className="text-start font-semibold text-xl" />
        <div className="flex gap-5 pl-5">
          <div>
            <InputBox
              label="URL"
              type="text"
              name="videoUrl"
              value={videoUrlValue}
              onChange={videoUrlOnChange}
              className="h-6 w-28 text-center"
            />
            <VideoPosition
              value={bplsdata.bpls.videoposition}
              onChange={(e) =>
                handlePositionChange("videoposition", e.target.value)
              }
              name={"videoposition"}
              vidLabel="Position"
            />
          </div>
          <div>
            <ToggleButton
              isActive={showVideoIsActive}
              onClick={showVideoOnClick}
              caption={"Visibility "}
              text={showVideoText ? "Hide Video" : "Show Video"}
            />
            <Buzz
              value={buzzValue}
              onChange={buzzOnChange}
              name={"buzz"}
              label="Buzz Sound"
            />
          </div>
        </div>
        <div>
          <Title
            text="Background"
            className="text-start pt-3 font-semibold text-xl"
          />
          <div className="flex flex-col pl-5">
            <div className="flex items-center justify-center gap-5">
              <Title text="Image" className="text-start font-normal text-xl" />
              <UploadImage
                onLogoUploaded={bgUrlUpload}
                removeLogoImage={bgUrlRemove}
                title=""
              />
            </div>

            <Flex className=" gap-5 w-full items-start justify-start">
              <Title
                text="Position"
                className="text-start font-normal text-xl"
              />
              <div className="flex w-full gap-2">
                <Button
                  caption="contain"
                  className={`!p-0 !m-0 text-[10px] w-[30%] h-[25px] text-center flex items-center justify-center !rounded-md ${
                    selectedBgSize === "contain" ? "bg-gray-400" : ""
                  }`}
                  onClick={() => handleBgSizeChange("contain")}
                />
                <Button
                  caption="cover"
                  className={`!p-0 !m-0 text-[10px] w-[30%] h-[25px] text-center flex items-center justify-center !rounded-md ${
                    selectedBgSize === "cover" ? "bg-gray-400" : ""
                  }`}
                  onClick={() => handleBgSizeChange("cover")}
                />
                <Button
                  caption="auto"
                  className={`!p-0 !m-0 text-[10px] w-[30%] h-[25px] text-center flex items-center justify-center !rounded-md ${
                    selectedBgSize === "auto" ? "bg-gray-400" : ""
                  }`}
                  onClick={() => handleBgSizeChange("auto")}
                />
              </div>
            </Flex>
          </div>
        </div>
        <Flex className="gap-10 absolute bottom-10 left-20">
          <Button
            caption="Reset"
            className="px-5 m-0 text-[10px] w-[60px] h-[25px] text-center flex items-center justify-center !rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
            onClick={resetDatas}
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

export default Bpls;
