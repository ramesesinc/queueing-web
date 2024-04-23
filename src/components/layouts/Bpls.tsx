import React from "react";
import { useData } from "../../service/context/data-context";
import Flex from "../ui/Flex";
import Button from "../ui/Button";
import ColorPicker from "../ui/ColorPicker";
import FontFamilyPicker from "../ui/FontFamilyPicker";
import InputBox from "../ui/InputBox";
import XyAxis from "../ui/XyAxis";
import Title from "../ui/Title";

interface BplsProps {
  title: string;
}

const Bpls: React.FC<BplsProps> = ({ title }) => {
  const { datas, handleChange, handleSubmit, handleSelect } = useData();
  return (
    <form onSubmit={handleSubmit}>
      <Title text={title} className="text-center text-xl" />
      <Flex className="flex-col items-center gap-3">
        <ColorPicker
          name={"color"}
          value={datas.color}
          onChange={handleChange}
        />
        <FontFamilyPicker
          value={datas.fontFamily}
          onChange={handleSelect}
          name={"fontFamily"}
        />
        <XyAxis value={datas.xyAxis} onChange={handleSelect} name={"xyAxis"} />
        <InputBox
          label="Window Count"
          type="number"
          name="windowCount"
          value={datas.windowCount}
          onChange={handleChange}
        />
        <InputBox
          label="verticalRowsCount"
          type="number"
          name="verticalRowsCount"
          value={datas.verticalRowsCount}
          onChange={handleChange}
        />
        <InputBox
          label="horizontalColsCount"
          type="number"
          name="horizontalColsCount"
          value={datas.horizontalColsCount}
          onChange={handleChange}
        />
        <Button
          caption="Update"
          type="submit"
          className="!p-0 !m-0 text-[10px] w-[20%] !rounded-md"
        />
      </Flex>
    </form>
  );
};

export default Bpls;
