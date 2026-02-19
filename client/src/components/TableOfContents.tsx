// import type { TableOfContents as TOCType } from "../types";

// interface Props {
//   toc: TOCType | null;
//   onSelectChapter: (chapter: string) => void;
// }

// function TableOfContents({ toc, onSelectChapter }: Props) {
//   if (!toc) return <p>Loading...</p>;

//   return (
//     <div id="toc">
//       <ul>
//         {toc.chapters.map((chapter) => (
//           <li key={chapter} onClick={() => onSelectChapter(chapter)}>
//             {chapter}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TableOfContents;

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
