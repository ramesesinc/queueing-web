"use client";

import React, { ReactNode } from "react";

type ActionBarProps = {
  children: ReactNode;
  className?: string;
};

const ActionBar: React.FC<ActionBarProps> = ({ children, className }) => {
  const childrenCount = React.Children.count(children);
  // console.log(`The ActionBar has ${childrenCount} child(ren).`);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-gray-300 w-full h-[0.5px] mt-8" />
      <div
        className={`flex ${
          childrenCount > 1 ? "justify-between" : "justify-end"
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ActionBar;
