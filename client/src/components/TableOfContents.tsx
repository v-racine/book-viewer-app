import type { TableOfContents as TOCType } from "../types";

interface Props {
  toc: TOCType | null;
  selectedChapter: string | null;
  onSelectChapter: (chapter: string) => void;
}

function TableOfContents({ toc, selectedChapter, onSelectChapter }: Props) {
  if (!toc)
    return (
      <div id="menu">
        <p>Loading...</p>
      </div>
    );

  return (
    <div id="menu">
      <div className="pure-menu">
        <span className="pure-menu-heading">Chapters</span>
        <ul className="pure-menu-list">
          {toc.chapters.map((chapter) => (
            <li
              key={chapter}
              className={`pure-menu-item ${selectedChapter === chapter ? "pure-menu-selected" : ""}`}
            >
              <a
                href="#"
                role="button"
                className="pure-menu-link"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  onSelectChapter(chapter);
                }}
              >
                {chapter}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TableOfContents;
