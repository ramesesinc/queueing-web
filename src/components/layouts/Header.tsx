import Image from "next/image";
import React from "react";
import SubTitle from "../ui/SubTitle";
import Title from "../ui/Title";

type HeaderProps = {
  componentType?: string | undefined;
  groupName: string | string[] | undefined;
  groupAddr: string | undefined;
  src: string | null | undefined;
  fontFamily?: string;
};

const Header: React.FC<HeaderProps> = ({ componentType, groupName, groupAddr, src, fontFamily }) => {
  const defaultLogo = "/images/lgu-logo.png";

  return (
    <div id={componentType} className="text-white text-center flex items-center justify-between px-5">
      <div>
        <Image src={src || defaultLogo} alt={"etracs logo"} width={0} height={0} style={{ width: 70, height: 70 }} priority unoptimized className="leading-none !p-0 !m-0" />
      </div>
      <div className="flex flex-col" style={{ fontFamily: fontFamily }}>
        <Title text={groupName || ""} className="uppercase text-[18px] leading-[15px]" />
        <SubTitle text={groupAddr || ""} className="font-normal uppercase text-[14px] leading-[20px]" />
      </div>
      <div>
        <Image src={"/images/etracs-logo.png"} alt={"etracs logo"} width={0} height={0} style={{ width: 120, height: 35 }} priority unoptimized />
      </div>
    </div>
  );
};

export default Header;
