import { SortingStep, AlgorithmInfo } from '@/types';

export async function* bubbleSort(array: number[]): AsyncGenerator<SortingStep> {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        array: [...arr],
        comparingIndices: [j, j + 1],
        sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
      };

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        yield {
          array: [...arr],
          swappingIndices: [j, j + 1],
          sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
        };
      }
    }
  }

  yield {
    array: [...arr],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
  };
}

export const bubbleSortInfo: AlgorithmInfo = {
  name: 'Bubble Sort',
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
  },
  spaceComplexity: 'O(1)',
  description:
    'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
};
