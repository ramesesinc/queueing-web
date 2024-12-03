"use client";

import React from "react";

type TextProps = {
  className?: string;
  children?: React.ReactNode;
};

const Text: React.FC<TextProps> = ({ className, children }) => {
  return (
    <p className={`~text-sm/base ${className}`}>
      <span>{children}</span>
    </p>
  );
};

export default Text;
