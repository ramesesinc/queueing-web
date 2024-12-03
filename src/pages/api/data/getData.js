// pages/api/data.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    // const data = fs.readFileSync("/_custom/style.json", "utf-8");
    const filePath = path.join(process.cwd(), "public", "_custom", "style.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    res.status(200).json(parsedData);
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
