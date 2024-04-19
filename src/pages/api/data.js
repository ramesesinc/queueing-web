// pages/api/data.js
import fs from "fs";

export default function handler(req, res) {
    try {
        const datas = fs.readFileSync("./data.json", "utf-8");
        const parsedDatas = JSON.parse(datas);
        res.status(200).json(parsedDatas);
    } catch (error) {
        console.error("Error reading data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
}
