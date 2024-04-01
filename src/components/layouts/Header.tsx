import React from "react";
import Image from "next/image";

type HeaderProps = {
  componentType?: string | undefined;
};

const Header: React.FC<HeaderProps> = ({ componentType }) => {
  return (
    <div id={componentType}>
      <Image
        src={"/images/etracs-logo.png"}
        alt={"etracs logo"}
        width={150}
        height={150}
        quality={100}
      />
    </div>
  );
};

export default Header;
