export const findLeftElements = <T>(a1: T[], a2: T[]): T[] => {
  const set = new Set(a2);
  return a1.filter((item) => !set.has(item));
};
