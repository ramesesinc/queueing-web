import React from "react";
import { useColorsContext } from "../service/context/colors-context";

const IndexPage = () => {
  const { colors, addColor, deleteColor, newColor, setNewColor } =
    useColorsContext();

  return (
    <div className="flex flex-col items-center p-5 gap-5">
      <h1>Queue App</h1>
      <input
        type="color"
        value={newColor}
        onChange={(e) => setNewColor(e.target.value)}
      />
      &nbsp;
      <button onClick={() => addColor(newColor)}>Add Color</button>
      {colors.map((color) => (
        <p key={color.id}>
          <b>*{color.color}</b>&nbsp;
          <button onClick={() => deleteColor(color.id)}>Delete Color</button>
        </p>
      ))}
      <header
        className="w-full h-[100px]"
        style={{
          backgroundColor: colors.length > 0 ? colors[0].color : "initial",
        }} // Set background color dynamically
      >
        this is head
      </header>
    </div>
  );
};

export default IndexPage;
