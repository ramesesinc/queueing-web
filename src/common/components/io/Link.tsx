"use client";

type LinkProps = {
  label: string;
  href: string | undefined;
  target?: string;
  className?: string;
};

const Link: React.FC<LinkProps> = ({ label, href, target, className }) => {
  return (
    <>
      {" "}
      <a
        href={href}
        className={`font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline ${className}`}
        target={target}
      >
        {label}
      </a>
    </>
  );
};

export default Link;
