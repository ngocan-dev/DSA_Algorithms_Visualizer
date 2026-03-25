export function generateRandomArray(
  size: number,
  min: number = 10,
  max: number = 100
): number[] {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1) + min)
  );
}

export function generateSortedArray(
  size: number,
  min: number = 10,
  max: number = 100
): number[] {
  const arr = generateRandomArray(size, min, max);
  return arr.sort((a, b) => a - b);
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
