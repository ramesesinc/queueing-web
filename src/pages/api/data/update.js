// pages/api/update.js
import fs from "fs";

export default function handler(req, res) {
    const { bpls, rpt, tc } = req.body;
    const datas = {
        bpls,
        rpt,
        tc
    };
    try {
        fs.writeFileSync("./data.json", JSON.stringify(datas, null, 2));
        res.status(200).json({ message: "Data updated successfully!" });
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ error: "Failed to update data" });
    }
}