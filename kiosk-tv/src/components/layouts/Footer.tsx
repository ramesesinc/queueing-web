import React from "react";
import Title from "../ui/Title";
import SubTitle from "../ui/SubTitle";

type FooterProps = {
  componentType?: string | undefined;
  groupName: string | string[] | undefined;
  groupAddr: string | undefined;
};

const Footer: React.FC<FooterProps> = ({
  componentType,
  groupName,
  groupAddr,
}) => {
  return (
    <div id={componentType} className="text-white">
      <Title
        text={groupName || ""}
        className="uppercase text-[18px] leading-[15px]"
      />
      <SubTitle
        text={groupAddr || ""}
        className="font-normal uppercase text-[14px] leading-[20px]"
      />
    </div>
  );
};

export default Footer;
