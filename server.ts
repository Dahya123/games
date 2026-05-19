import express from "express";

import cors from "cors";
import gplay from "google-play-scraper";
import store from "app-store-scraper";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
//const PORT = process.env.PORT || 3000;
const PORT: number = Number(process.env.PORT) || 3000;
// IMPORTANT: allow frontend requests
app.use(cors());
app.use(express.json());

// ---------------- API ----------------

app.get("/api/apps/top", async (req, res) => {
  try {
    const results = await gplay.list({
      category: "GAME" as any,
      collection: "TOP_FREE" as any,
      num: 30,
      country: "us"
    });

    res.json(results);
  } catch (err) {
    res.json([]);
  }
});

app.get("/api/search", async (req, res) => {
  const term = req.query.term as string;

  if (!term) return res.status(400).json({ error: "term required" });

  try {
    const results = await gplay.search({
      term,
      num: 30,
      country: "us"
    });

    res.json(results);
  } catch (err) {
    res.json([]);
  }
});

// ---------------- FRONTEND (VITE BUILD) ----------------

const distPath = path.join(process.cwd(), "dist");

app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ---------------- START ----------------

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});