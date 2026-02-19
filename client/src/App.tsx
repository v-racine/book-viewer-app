import { useState, useEffect } from "react";
import type { TableOfContents as TOCType } from "./types";
import TableOfContents from "./components/TableOfContents";
import ChapterView from "./components/ChapterView";

function App() {
  const [toc, setToc] = useState<TOCType | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [chapterContent, setChapterContent] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/toc")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setToc(data))
      .catch((error) => console.error("Error fetching TOC:", error));
  }, []);

  useEffect(() => {
    if (!selectedChapter) return;
    const urlParam = selectedChapter.toLowerCase().replaceAll(" ", "-");
    fetch(`/api/${urlParam}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then((data) => setChapterContent(data))
      .catch((error) =>
        console.error(`Error fetching chapter ${selectedChapter}:`, error),
      );
  }, [selectedChapter]);

  return (
    <div id="app">
      <h1>{toc?.book ?? "Loading..."}</h1>
      {selectedChapter ? (
        <ChapterView
          chapter={selectedChapter}
          content={chapterContent}
          onBack={() => {
            setSelectedChapter(null);
            setChapterContent(null);
          }}
        />
      ) : (
        <TableOfContents toc={toc} onSelectChapter={setSelectedChapter} />
      )}
    </div>
  );
}

export default App;
