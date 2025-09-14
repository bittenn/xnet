export const relTime = (input: Date): string => {
  const now = new Date();
  const diff = input.getTime() - now.getTime();
  const abs = Math.abs(diff);

  if (abs < 60 * 1000) return diff < 0 ? "방금 전" : "곧";

  const rtf = new Intl.RelativeTimeFormat("ko");
  if (abs < 60 * 60 * 1000)
    return rtf.format(Math.round(diff / 60000), "minute");
  if (abs < 24 * 60 * 60 * 1000)
    return rtf.format(Math.round(diff / 3600000), "hour");
  return rtf.format(Math.round(diff / 86400000), "day");
};
