// Turn full article content into a short, readable preview
// Removes extra whitespace
// Cut off after maxLength
// Add "…" so the user knows it's shortened

export const toExcerpt = (content: string, maxLength = 100) => {
  if (!content) return "";

  const cleaned = content.replace(/\s+/g, " ").trim();

  if (cleaned.length <= maxLength) return cleaned;

  const clipped = cleaned.slice(0, maxLength).replace(/\s+\S*$/, "");

  return `${clipped}...`;
};
