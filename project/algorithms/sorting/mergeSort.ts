import { SortingStep, AlgorithmInfo } from '@/types';

export async function* mergeSort(array: number[]): AsyncGenerator<SortingStep> {
  const arr = [...array];
  const steps: SortingStep[] = [];

  function mergeSortHelper(arr: number[], left: number, right: number): void {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    mergeSortHelper(arr, left, mid);
    mergeSortHelper(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }

  function merge(arr: number[], left: number, mid: number, right: number): void {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        comparingIndices: [left + i, mid + 1 + j],
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }

      steps.push({
        array: [...arr],
        swappingIndices: [k],
      });

      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      steps.push({
        array: [...arr],
        swappingIndices: [k],
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      steps.push({
        array: [...arr],
        swappingIndices: [k],
      });
      j++;
      k++;
    }
  }

  mergeSortHelper(arr, 0, arr.length - 1);

  for (const step of steps) {
    yield step;
  }

  yield {
    array: [...arr],
    sortedIndices: Array.from({ length: arr.length }, (_, i) => i),
  };
}

export const mergeSortInfo: AlgorithmInfo = {
  name: 'Merge Sort',
  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
  },
  spaceComplexity: 'O(n)',
  description:
    'Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the two sorted halves. It guarantees O(n log n) performance.',
};
