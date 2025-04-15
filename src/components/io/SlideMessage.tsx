// components/SlideMessage.tsx
import { useEffect, useState } from "react";

type SlideMessageProps = {
  message: string;
  duration?: number;
  className?: string;
};

const SlideMessage = ({
  message,
  className,
  duration = 5000,
}: SlideMessageProps) => {
  return (
    <div
      className={`transform -translate-y-1/2 p-4 text-black rounded-lg animate-slide w-full text-start ${className}`}
      style={{ animationDuration: `${duration}ms` }}
    >
      {message}
    </div>
  );
};

export default SlideMessage;
