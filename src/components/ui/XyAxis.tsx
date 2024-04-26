import React from "react";

interface XyAxisSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  label?: string;
}

const XyAxis: React.FC<XyAxisSelectProps> = ({
  value,
  onChange,
  name,
  label,
}) => {
  return (
    <div>
      <label
        htmlFor=""
        className="flex flex-col items-center justify-center leading-none pb-2"
      >
        <p className="leading-none text-[12px] pb-1">{label}</p>
        <select
          name={name}
          onChange={onChange}
          value={value}
          className="rounded border border-gray-500 w-28 focus:border-blue-500 focus:outline-none"
        >
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
        </select>
      </label>
    </div>
  );
};

export default XyAxis;
