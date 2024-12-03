"use client";

type ErrorProps = {
  msg?: string;
};

const Error: React.FC<ErrorProps> = ({ msg }) => {
  if (!msg) return null;

  return (
    <div className="text-[#b00020] text-sm text-center bg-[#f5f5dc] p-2 rounded border mb-4">
      {msg}
    </div>
  );
};

export default Error;
