"use client";

import Sidebar from "@/components/templates/Sidebar";
import Button from "@/components/ui/Button";
import ColorPicker from "@/components/ui/ColorPicker";
import FontFamilyPicker from "@/components/ui/FontFamilyPicker";
import InputBox from "@/components/ui/InputBox";
import { VideoPosition, WindowPosition } from "@/components/ui/Position";
import ToggleButton from "@/components/ui/ToggleButton";
import ImageUpload from "@/components/ui/UploadImage";
import XyAxis from "@/components/ui/XyAxis";
import { useData } from "@/context/DataContext";
import { lookupService } from "@/lib/client";
import { ReactElement, useEffect, useState } from "react";
import Text from "@/components/ui/Text";
import Buzz from "@/components/ui/Buzz";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<ReactElement | null>(null);
  const [data, setData] = useState<Record<string, any>[]>([]);
  const svc = lookupService("QueueService");
  const {
    groups,
    handleSubmit,
    handleChange,
    handleSelect,
    handlePositionChange,
    handleBgSizeChange,
    toggleVideo,
    updateLogoUrl,
    updateBgUrl,
    removeLogoUrl,
    removeBgUrl,
    resetData,
    setGroupId,
    groupId,
    general,
  } = useData();
  const selectedBgSize = groups.bgSize;

  const fetchGroups = async () => {
    const res = await svc?.invoke("getQueueGroup");
    setData(res);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleGroupChange = (groupId: string) => {
    setGroupId(groupId);
  };

  const handleItemClick = (item: ReactElement) => {
    setSelectedItem(item);
    fetchGroups();
  };

  const selectedGroup = data.find(
    (group) => group.objid.toLowerCase() === groupId
  );

  return (
    <div className="relative flex min-h-screen">
      <Sidebar
        onItemClick={handleItemClick}
        items={data}
        handleGroupChange={handleGroupChange}
      />

      <div className="w-full p-4 bg-gray-200 pl-12">
        <Text className="text-xl">
          {selectedGroup?.title || "No Group Selected"}
        </Text>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.alert("Settings saved successfully!");
            handleSubmit(e);
          }}
          className=""
        >
          {groupId !== "gen" ? (
            <div className="flex flex-col items-center w-full border border-black rounded mt-5 p-5">
              <div className="flex justify-center">
                <div className="border-r border-b-2 border-black/20">
                  <div className="w-full text-center">
                    <Text className="inline-block font-semibold text-xl uppercase p-0 border-b-2 border-black/50">
                      Theme
                    </Text>
                  </div>
                  <div className=" p-5 h-[350px] w-[400px] flex flex-col items-center justify-center">
                    <div>
                      <ImageUpload
                        onLogoUploaded={updateBgUrl}
                        removeLogoImage={removeBgUrl}
                        title="Background Image"
                        imgUrl={groups.bgUrl}
                      />
                      <div className="">
                        <Text className="text-center font-normal text-lg pb-1">
                          Background Position
                        </Text>
                        <div className="flex w-full gap-2">
                          <Button
                            caption="contain"
                            className={`!p-0 !m-0 text-[10px] w-[30%] h-[25px] text-center flex items-center justify-center !rounded-md ${
                              selectedBgSize === "contain"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                            onClick={() => handleBgSizeChange("contain")}
                          />
                          <Button
                            caption="cover"
                            className={`!p-0 !m-0 text-[10px] w-[30%] h-[25px] text-center flex items-center justify-center !rounded-md ${
                              selectedBgSize === "cover"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                            onClick={() => handleBgSizeChange("cover")}
                          />
                          <Button
                            caption="auto"
                            className={`!p-0 !m-0 text-[10px] w-[30%] h-[25px] text-center flex items-center justify-center !rounded-md ${
                              selectedBgSize === "auto"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                            onClick={() => handleBgSizeChange("auto")}
                          />
                        </div>
                      </div>
                      <ColorPicker
                        name={"color"}
                        value={groups.color}
                        onChange={handleChange}
                        label="Choose Color"
                      />
                    </div>
                  </div>
                </div>
                <div className="border-l border-b-2 border-black/20">
                  <div className="w-full text-center">
                    <Text className="inline-block font-semibold text-xl uppercase p-0 border-b-2 border-black/50">
                      Window
                    </Text>
                  </div>

                  <div className=" p-5 h-[350px] w-[400px] flex flex-col items-center justify-center">
                    <div className="">
                      <InputBox
                        label="Number of Windows"
                        type="number"
                        name="windowCount"
                        value={groups.windowCount}
                        onChange={handleChange}
                        className="h-6 w-28 text-center"
                      />
                      <XyAxis
                        value={groups.xyAxis}
                        onChange={handleSelect}
                        name="xyAxis"
                        label="Window Orientation"
                      />
                      {/* Conditional rendering for Rows Count and Columns Count based on xyAxis */}
                      {groups.xyAxis === "horizontal" ? (
                        <InputBox
                          label="Columns Count"
                          name="columnCount"
                          type="number"
                          value={groups.columnCount}
                          onChange={handleChange}
                        />
                      ) : null}

                      {groups.xyAxis === "vertical" ? (
                        <InputBox
                          label="Rows Count"
                          name="rowCount"
                          type="number"
                          value={groups.rowCount}
                          onChange={handleChange}
                        />
                      ) : null}
                      <WindowPosition
                        value={groups.windowposition}
                        onChange={(e) =>
                          handlePositionChange("windowposition", e.target.value)
                        }
                        name="windowposition"
                        winLabel="Window Position"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="border-r border-black/20">
                  <div className="w-full text-center">
                    <Text className="inline-block font-semibold text-xl uppercase p-0 border-b-2 border-black/50">
                      Video
                    </Text>
                  </div>
                  <div className=" p-5 h-[350px] w-[400px] flex flex-col items-center justify-center">
                    <ToggleButton
                      isActive={groups.showVideo}
                      onClick={toggleVideo}
                      caption="Visibility"
                      text={groups.showVideo ? "Hide Video" : "Show Video"}
                    />
                    <InputBox
                      label="URL"
                      type="text"
                      name="videoUrl"
                      value={groups.videoUrl}
                      onChange={handleChange}
                      className="h-6 w-28 text-center"
                    />
                    <VideoPosition
                      value={groups.videoposition}
                      onChange={(e) =>
                        handlePositionChange("videoposition", e.target.value)
                      }
                      name={"videoposition"}
                      vidLabel="Video Position"
                    />
                  </div>
                </div>
                <div className="border-l border-black/20">
                  <Text className="text-center text-transparent font-semibold text-xl uppercase p-0">
                    Video
                  </Text>
                  <div className=" p-5 h-[350px] w-[400px] flex flex-col items-center justify-center"></div>
                </div>
              </div>
            </div>
          ) : null}

          {groupId === "gen" ? (
            <div className="flex flex-col w-full border border-black rounded mt-5 p-5">
              <div className="flex justify-center ">
                <div className="border-r border-b-2 border-black/20 p-5 h-[350px] w-[400px] flex flex-col items-center justify-center gap-5">
                  <FontFamilyPicker
                    value={general.fontFamily || "Arial"}
                    onChange={handleSelect}
                    name={"fontFamily"}
                    title="Font Style"
                  />
                  <ImageUpload
                    onLogoUploaded={updateLogoUrl}
                    removeLogoImage={removeLogoUrl}
                    title="Upload Logo"
                    imgUrl={general.logoUrl}
                  />
                </div>
                <div className="border-l border-b-2 border-black/20 p-5 h-[350px] w-[400px] flex flex-col items-center justify-center gap-5">
                  <InputBox
                    label="LGU Name"
                    name="lguname"
                    value={general.lguname}
                    onChange={handleChange}
                    textArea
                  />
                  <InputBox
                    label="Slide Message"
                    name="slidemessage"
                    value={general.slidemessage}
                    onChange={handleChange}
                    textArea
                  />
                </div>
              </div>
              <div className="flex justify-center ">
                <div className="border-r border-black/20 p-5 h-[300px] w-[400px] flex flex-col items-center justify-center gap-5">
                  <Buzz
                    value={general.buzz}
                    onChange={handleSelect}
                    name={"buzz"}
                    label="Buzz Sound"
                  />
                </div>
                <div className="border-l border-black/20 p-5 h-[300px] w-[400px] flex flex-col items-center justify-center gap-5">
                  {/* 4th content   */}
                </div>
              </div>
            </div>
          ) : null}

          <div className="absolute top-4 right-4">
            <div className="flex gap-x-5">
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
