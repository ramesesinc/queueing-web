import React from "react";
import { useBplsData } from "../../service/context/bplsdatas-context";
import Button from "../ui/Button";
import Flex from "../ui/Flex";
import FontFamilyPicker from "../ui/FontFamilyPicker";
import UploadImage from "../ui/UploadImage";
import Title from "../ui/Title";

interface GeneralProps {
  title?: string;
}

const General: React.FC<GeneralProps> = ({ title }) => {
  const { bplsdata, updateLogoUrl, removeLogoUrl, handleSelect, handleSubmit } =
    useBplsData();
  return (
    <div className="!text-lg">
      <Title text={title || "General"} className="text-start pb-5 text-xl" />
      <form onSubmit={handleSubmit}>
        <Flex className="gap-10 flex-col justify-center items-center">
          <FontFamilyPicker
            value={bplsdata.bpls.fontFamily}
            onChange={handleSelect}
            name={"fontFamily"}
            title="Font Style"
          />
          <UploadImage
            onLogoUploaded={updateLogoUrl}
            removeLogoImage={removeLogoUrl}
            title="Logo"
          />

          <Button
            caption="Save"
            type="submit"
            className="px-5 m-0 text-[10px] absolute bottom-2 right-2 w-[60px] h-[25px] text-center flex items-center justify-center !rounded-md bg-blue-500 hover:bg-blue-600 text-white"
          />
        </Flex>
      </form>
    </div>
  );
};

export default General;
