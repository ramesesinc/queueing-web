import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    // Read existing data from data.json
    //const existingData = JSON.parse(fs.readFileSync("./data.json"));
    const filePath = path.join(process.cwd(), "public", "_custom", "style.json");
    const existingData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Update only the sections of data present in the request body
    if (req.body.bpls) {
      existingData.bpls = { ...existingData.bpls, ...req.body.bpls };
    }
    if (req.body.tc) {
      existingData.tc = { ...existingData.tc, ...req.body.tc };
    }
    if (req.body.rpt) {
      existingData.rpt = { ...existingData.rpt, ...req.body.rpt };
    }

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    res.status(200).json({ message: "Data updated successfully!" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Failed to update data" });
  }
}
