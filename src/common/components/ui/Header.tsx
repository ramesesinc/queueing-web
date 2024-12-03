import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Title from "../io/Title";

interface HeaderProps {
  lgucaption?: string;
  lguLogo: string;
  className?: string;
  href?: Url;
}

const Header: React.FC<HeaderProps> = ({
  lgucaption,
  lguLogo,
  className,
  href,
}) => {
  return (
    <header
      className={`${className} fixed top-0 z-10 h-14 w-full bg-[#2c3e50]`}
    >
      <div className="flex h-full items-center gap-2 ~pl-4/8">
        <Link href={href || ""}>
          <Image
            src={lguLogo ? lguLogo : "/assets/partner/lgu-logo.png"}
            quality={100}
            height={40}
            width={40}
            alt=""
            className="rounded-full bg-white"
            loading="eager"
            priority
            unoptimized
          />
        </Link>
        <Title className="text-white">{lgucaption || ""}</Title>
      </div>
    </header>
  );
};

export default Header;
