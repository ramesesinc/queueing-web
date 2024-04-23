import React from "react";

interface XyAxisSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
}

const XyAxis: React.FC<XyAxisSelectProps> = ({ value, onChange, name }) => {
  return (
    <div>
      <select
        name={name}
        onChange={onChange}
        value={value}
        className="rounded border border-blue-500"
      >
        <option value="vertical">Vertical</option>
        <option value="horizontal">Horizontal</option>
      </select>
    </div>
  );
};

export default XyAxis;
