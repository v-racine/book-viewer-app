interface Props {
  chapter: string | null;
  content: string | null;
  error: string | null;
}

function ChapterView({ chapter, content, error }: Props) {
  if (!chapter)
    return (
      <p className="content-subhead">Select a chapter to begin reading.</p>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="content-subhead">{chapter}</h2>
      {content ? <pre>{content}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default ChapterView;
