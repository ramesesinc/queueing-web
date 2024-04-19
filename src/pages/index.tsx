// pages/index.js
import { useData } from "../service/context/data-context";

export default function Home() {
  const { datas, handleChange, handleSubmit, handleGetData } = useData();

  return (
    <div>
      <h1>JSON Data Example</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={datas.color}
            onChange={handleChange}
            className="border border-blue-500"
          />
        </label>
        <br />
        <label>
          Font Family:
          <input
            type="text"
            name="fontFamily"
            value={datas.fontFamily}
            onChange={handleChange}
            className="border border-blue-500"
          />
        </label>
        <br />
        <label>
          Window Count:
          <input
            type="number"
            name="windowCount"
            value={datas.windowCount}
            onChange={handleChange}
            className="border border-blue-500"
          />
        </label>
        <br />
        <button type="submit">Update</button>
        <button onClick={handleGetData}>Get Data</button>
      </form>
      <p>Current Value: {datas.color}</p>
      <p>Current Font Family: {datas.fontFamily}</p>
      <p>Current Window Count: {datas.windowCount}</p>
    </div>
  );
}
