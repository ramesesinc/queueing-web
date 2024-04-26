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
    <>
      <Title text={title || ""} className="text-center text-xl" />
      <form onSubmit={handleSubmit}>
        <Flex className="gap-10 flex-col justify-center items-center">
          <FontFamilyPicker
            value={bplsdata.bpls.fontFamily}
            onChange={handleSelect}
            name={"fontFamily"}
          />
          <UploadImage
            onLogoUploaded={updateLogoUrl}
            removeLogoImage={removeLogoUrl}
          />
          <Button
            caption="Save"
            type="submit"
            className="!p-0 !m-0 text-[10px] w-[15%] h-[25px] text-center flex items-center justify-center !rounded-md absolute bottom-2 right-2"
          />
        </Flex>
      </form>
    </>
  );
};

export default General;
