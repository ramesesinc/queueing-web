import React from "react";
import Title from "../ui/Title";

type FooterProps = {
  componentType?: string | undefined;
};

const Footer: React.FC<FooterProps> = ({ componentType }) => {
  return (
    <div id={componentType}>
      <Title
        text="QueueEtracs is a complete enterprise software system for customer queue management system."
        className="text-[20px] p-2 text-center text-white"
      />
    </div>
  );
};

export default Footer;
