// pages/api/update.js
import fs from "fs";

export default function handler(req, res) {
    const { color, fontFamily, windowCount } = req.body;
    const datas = {
        color,
        fontFamily,
        windowCount,
    };
    try {
        fs.writeFileSync("./data.json", JSON.stringify(datas));
        res.status(200).json({ message: "Data updated successfully!" });
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ error: "Failed to update data" });
    }
}
