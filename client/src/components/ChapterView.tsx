interface Props {
  chapter: string;
  content: string | null;
  onBack: () => void;
}

function ChapterView({ chapter, content, onBack }: Props) {
  return (
    <div className="chapter">
      <button onClick={onBack}>← Back to Table of Contents</button>
      <h2>{chapter}</h2>
      {content ? <pre>{content}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default ChapterView;
