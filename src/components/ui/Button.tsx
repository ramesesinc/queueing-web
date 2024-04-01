import React from "react";
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
}: {
  text?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  display?: string;
  value?: string;
  icon?: React.ReactNode;
}) {
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
      className={`text-2xl px-20 py-4 rounded-xl border border-gray-400 uppercase ${className} ${display}`}
      onClick={onClick}
    >
      {icon}
      {text}
      {children}
    </button>
  );
}

export default Button;
