"use client";

import Sidebar2 from "@/components/templates/Sidebar2";
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

  return (
    <div className="flex h-screen">
      <Sidebar2
        onItemClick={handleItemClick}
        items={data}
        handleGroupChange={handleGroupChange}
      />

      <div className="w-full p-4 bg-gray-200 pl-20">
        <form onSubmit={handleSubmit}>
          {groupId !== "gen" ? (
            <div className="flex flex-col items-start w-full">
              <div>
                <Text className="text-start font-semibold text-xl uppercase">
                  Theme
                </Text>
                <div className="pl-10 py-3 flex">
                  <div>
                    <ImageUpload
                      onLogoUploaded={updateBgUrl}
                      removeLogoImage={removeBgUrl}
                      title="Upload Bg"
                      imgUrl={groups.bgUrl}
                    />
              
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
               
                  <div>
            <div className="hidden">div</div>
                    <ColorPicker
                      name={"color"}
                      value={groups.color}
                      onChange={handleChange}
                      label="Choose Color"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Text className="text-start font-semibold text-xl uppercase">
                  Window
                </Text>
                <div className="pl-10 py-3">
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
                  <WindowPosition
                    value={groups.windowposition}
                    onChange={(e) =>
                      handlePositionChange("windowposition", e.target.value)
                    }
                    name="windowposition"
                    winLabel="Window Position"
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
                </div>
              </div>

              <div>
                <Text className="text-start font-semibold text-xl uppercase">
                  Video
                </Text>
                <div className="pl-10 py-3 flex gap-5">
                  <div>
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

                  <div>
                    <ToggleButton
                      isActive={groups.showVideo}
                      onClick={toggleVideo}
                      caption="Visibility"
                      text={groups.showVideo ? "Hide Video" : "Show Video"}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {groupId === "gen" ? (
            <>
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
              <InputBox
                label="LGU Name"
                name="lguname"
                value={general.lguname}
                onChange={handleChange}
              />
              <InputBox
                label="Slide Message"
                name="slidemessage"
                value={general.slidemessage}
                onChange={handleChange}
              />
            </>
          ) : null}

          <div className="flex gap-x-10">
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
        </form>
      </div>
    </div>
  );
}
