import React from "react";

type InputBox = {
  type?: string;
  name?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

const InputBox: React.FC<InputBox> = ({
  type,
  name,
  value,
  onChange,
  label,
}) => {
  return (
    <div>
      <label htmlFor="" className="flex gap-2 flex-col">
        {label}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="border border-blue-500 rounded p-1"
        />
      </label>
    </div>
  );
};

export default InputBox;
