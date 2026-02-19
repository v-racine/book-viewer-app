import { useState, useEffect } from "react";
import type { TableOfContents as TOCType } from "./types";
import TableOfContents from "./components/TableOfContents";
import ChapterView from "./components/ChapterView";

function App() {
  const [toc, setToc] = useState<TOCType | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [chapterContent, setChapterContent] = useState<string | null>(null);
  const [tocError, setTocError] = useState<string | null>(null);
  const [chapterError, setChapterError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/toc")
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to load table of contents. Status: ${res.status}`,
          );
        }
        return res.json();
      })
      .then((data) => setToc(data))
      .catch((error) => setTocError(error.message));
  }, []);

  useEffect(() => {
    if (!selectedChapter) return;
    setChapterError(null);

    const urlParam = selectedChapter.toLowerCase().replaceAll(" ", "-");
    fetch(`/api/${urlParam}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load chapter. Status: ${res.status}`);
        }
        return res.text();
      })
      .then((data) => setChapterContent(data))
      .catch((error) => setChapterError(error.message));
  }, [selectedChapter]);

  if (tocError) return <p>Error: {tocError}</p>;

  return (
    <div id="app">
      <h1>{toc?.book ?? "Loading..."}</h1>
      {selectedChapter ? (
        <ChapterView
          chapter={selectedChapter}
          content={chapterContent}
          error={chapterError}
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
