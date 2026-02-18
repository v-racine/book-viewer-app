import express from "express";
const router = express.Router();
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { urlParamToChapterTitle, chapterToFilename } from "../utils/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "..", "data");

const bookTitle = "The Adventures of Sherlock Holmes";
const chapters = [
  "A Scandal in Bohemia",
  "The Red-headed League",
  "A Case of Identity",
  "The Boscombe Valley Mystery",
  "The Five Orange Pips",
  "The Man with the Twisted Lip",
  "The Adventure of the Blue Carbuncle",
  "The Adventure of the Speckled Band",
  "The Adventure of the Engineer's Thumb",
  "The Adventure of the Noble Bachelor",
  "The Adventure of the Beryl Coronet",
  "The Adventure of the Copper Beeches",
];

router.get("/toc", (req, res) => {
  res.json({
    book: bookTitle,
    chapters: chapters,
  });
});

router.get("/:chapter", async (req, res) => {
  const chapterTitleFromUrl = urlParamToChapterTitle(req.params.chapter);

  const chapter = chapters.find(
    (title) => title.toLowerCase() === chapterTitleFromUrl.toLowerCase()
  );

  if (!chapter) {
    return res.status(404).send("Chapter not found");
  }

  const filename = chapterToFilename(chapter);
  try {
    const content = await fs.readFile(path.join(dataDir, filename), "utf-8");
    res.type("text/plain").send(content);
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).send("Error reading chapter");
  }
});
export default router;
