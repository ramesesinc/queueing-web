"use client";

type PageProps = {
  className?: string;
  children?: React.ReactNode;
};

const Page: React.FC<PageProps> = ({ children, className }) => {
  return (
    <div className={`flex items-center justify-center h-full ${className}`}>
      {children}
    </div>
  );
};

export default Page;
