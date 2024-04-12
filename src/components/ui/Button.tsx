import React, { useState } from "react";
import Link from "next/link";

function Button({
  text,
  onClick,
  href,
  className,
  children,
  display,
  value,
  icon,
  componentType,
}: {
  text?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  display?: string;
  value?: string;
  icon?: React.ReactNode;
  componentType?: string;
}) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 350);
  };

  if (href) {
    return (
      <Link
        href={href}
        className={`text-2xl px-20 py-4 rounded-xl border border-gray-400 uppercase ${display} ${className}`}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      id={componentType}
      className={`text-2xl px-20 py-4 rounded-xl border border-gray-400 uppercase ${className} ${display} ${
        clicked ? "transform scale-90 transition-transform duration-300" : ""
      }`}
      onClick={handleClick}
    >
      {icon}
      {text}
      {children}
    </button>
  );
}

export default Button;
