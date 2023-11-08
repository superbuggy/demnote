export const formatSeconds = (durationInSeconds: number): string => {
  const minutesExact = durationInSeconds / 60;
  const minutes = Math.floor(minutesExact);
  const seconds = `${Math.round(60 * (minutesExact - minutes))}`.padStart(
    2,
    "0"
  );
  return `${minutes}:${seconds}`;
};

export const lexicalizeWith = (keys: string[], values: any[]): Record<string, any> =>
  Object.fromEntries(
    Array.from({ length: keys.length }, (_, i) => [keys[i], values[i]])
  );


  export const selectIn = (field, things) => things.map(thing => thing[field])
