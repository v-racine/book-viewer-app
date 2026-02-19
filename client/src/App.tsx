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
      .then((res) => res.json())
      .then((data) => setToc(data));
  }, []);

  useEffect(() => {
    if (!selectedChapter) return;
    const urlParam = selectedChapter.toLowerCase().replaceAll(" ", "-");
    fetch(`/api/${urlParam}`)
      .then((res) => res.text())
      .then((data) => setChapterContent(data));
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
