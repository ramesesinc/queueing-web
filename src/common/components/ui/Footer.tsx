import Text from "@/common/components/io/Text";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";

interface FooterProps {
  copyright: string;
  className?: string;
  filipizen: string;
  href?: Url;
}

const Footer: React.FC<FooterProps> = ({
  copyright,
  className,
  filipizen,
  href,
}) => {
  return (
    <footer className={`${className} w-full bg-gray-200 text-gray-400`}>
      <div className="border-t-2 border-black pb-[4px] pt-[4px] text-center">
        <Text className="~text-xs/sm">
          {copyright}
          <Link href={href || ""} className="hover:border-b hover:border-black">
            <span>{filipizen}</span>
          </Link>
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
