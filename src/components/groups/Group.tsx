import React from "react";
import ColorPicker from "../ui/ColorPicker";
import { useData } from "@/context/DataContext";

const Group = () => {
  const { groups, handleSubmit, handleChange } = useData();
  return (
    <form onSubmit={handleSubmit}>
      <ColorPicker
        name={"color"}
        value={groups.color}
        onChange={handleChange}
        label="Choose Color"
      />
    </form>
  );
};

export default Group;
