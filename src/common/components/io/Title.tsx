"use client";

import React from "react";

type TitleProps = {
  className?: string;
  children?: React.ReactNode;
};

const Title: React.FC<TitleProps> = ({ className, children }) => {
  return (
    <p className={`font-bold ~text-lg/2xl ${className}`}>
      <span>{children}</span>
    </p>
  );
};

export default Title;
