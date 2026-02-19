import type { TableOfContents as TOCType } from "../types";

interface Props {
  toc: TOCType | null;
  onSelectChapter: (chapter: string) => void;
}

function TableOfContents({ toc, onSelectChapter }: Props) {
  if (!toc) return <p>Loading...</p>;

  return (
    <div id="toc">
      <ul>
        {toc.chapters.map((chapter) => (
          <li key={chapter} onClick={() => onSelectChapter(chapter)}>
            {chapter}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TableOfContents;
