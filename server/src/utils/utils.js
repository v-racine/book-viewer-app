export function chapterToFilename(title) {
  return (
    title
      .toLowerCase()
      .replace(/[-\s]+/g, "_")
      .replace(/[^a-z0-9_]/g, "") + ".txt"
  );
}

export function urlParamToChapterTitle(param) {
  return param
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace(/ Headed/, "-headed");
}
