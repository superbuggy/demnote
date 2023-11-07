export const formatSeconds = (durationInSeconds: number): string => {
  const minutesExact = durationInSeconds / 60;
  const minutes = Math.floor(minutesExact);
  const seconds = `${Math.round(60 * (minutesExact - minutes))}`.padStart(
    2,
    "0"
  );
  return `${minutes}:${seconds}`;
};