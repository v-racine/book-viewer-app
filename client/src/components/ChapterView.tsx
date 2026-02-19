interface Props {
  chapter: string;
  content: string | null;
  error: string | null;
  onBack: () => void;
}

function ChapterView({ chapter, content, error, onBack }: Props) {
  return (
    <div className="chapter">
      <button onClick={onBack}>← Back to Table of Contents</button>
      <h2>{chapter}</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : content ? (
        <pre>{content}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ChapterView;
