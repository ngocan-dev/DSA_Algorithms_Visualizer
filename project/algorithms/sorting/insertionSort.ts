import { SortingStep, AlgorithmInfo } from '@/types';

export async function* insertionSort(
  array: number[]
): AsyncGenerator<SortingStep> {
  const arr = [...array];
  const n = arr.length;

  yield {
    array: [...arr],
    sortedIndices: [0],
  };

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    yield {
      array: [...arr],
      comparingIndices: [i],
      sortedIndices: Array.from({ length: i }, (_, k) => k),
    };

    while (j >= 0 && arr[j] > key) {
      yield {
        array: [...arr],
        comparingIndices: [j, j + 1],
        sortedIndices: Array.from({ length: i }, (_, k) => k),
      };

      arr[j + 1] = arr[j];

      yield {
        array: [...arr],
        swappingIndices: [j, j + 1],
        sortedIndices: Array.from({ length: i }, (_, k) => k),
      };

      j--;
    }

    arr[j + 1] = key;

    yield {
      array: [...arr],
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
    };
  }

  yield {
    array: [...arr],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
  };
}

export const insertionSortInfo: AlgorithmInfo = {
  name: 'Insertion Sort',
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
  },
  spaceComplexity: 'O(1)',
  description:
    'Insertion Sort builds the final sorted array one item at a time. It iterates through an input array and removes one element per iteration, finds the place it belongs in the sorted list, and inserts it there.',
};
