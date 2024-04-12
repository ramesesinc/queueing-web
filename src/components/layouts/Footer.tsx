import Image from "next/image";
import React from "react";

type HeaderProps = {
  componentType?: string | undefined;
};

const Header: React.FC<HeaderProps> = ({ componentType }) => {
  return (
    <div id={componentType}>
      <Image
        src={"/images/etracs-logo.png"}
        alt={"etracs logo"}
        width={0}
        height={0}
        style={{ width: 150, height: 50 }}
        priority
        unoptimized
      />
    </div>
  );
};

export default Header;
