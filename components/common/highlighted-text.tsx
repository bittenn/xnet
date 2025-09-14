"use client";

const urlRegex =
  /((https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?)/gi;
const hashtagRegex = /#[\p{L}\p{N}_]+/giu;

export function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\s+)/);
  return (
    <span className="leading-relaxed whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (urlRegex.test(part)) {
          const href = part.startsWith("http") ? part : `https://${part}`;
          return (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="break-words text-blue-600 hover:underline"
            >
              {part}
            </a>
          );
        }
        if (hashtagRegex.test(part)) {
          return (
            <button
              key={i}
              type="button"
              className="text-blue-600 hover:underline"
            >
              {part}
            </button>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
