"use client";

import React from "react";

type SubtitleProps = {
  className?: string;
  children?: React.ReactNode;
};

const Subtitle: React.FC<SubtitleProps> = ({ className, children }) => {
  return (
    <p className={`~text-base/lg ${className}`}>
      <span>{children}</span>
    </p>
  );
};

export default Subtitle;
