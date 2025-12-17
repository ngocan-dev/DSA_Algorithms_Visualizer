import { SearchingStep, AlgorithmInfo } from '@/types';

export async function* binarySearch(
  array: number[],
  target: number
): AsyncGenerator<SearchingStep> {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    yield {
      array: [...array],
      currentIndex: mid,
      searchIndices: [mid],
      left,
      right,
    };

    if (array[mid] === target) {
      yield {
        array: [...array],
        currentIndex: mid,
        foundIndex: mid,
        left,
        right,
      };
      return;
    }

    if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  yield {
    array: [...array],
    currentIndex: -1,
    foundIndex: -1,
    left,
    right,
  };
}

export const binarySearchInfo: AlgorithmInfo = {
  name: 'Binary Search',
  timeComplexity: {
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)',
  },
  spaceComplexity: 'O(1)',
  description:
    'Binary Search finds the position of a target value within a sorted array by repeatedly dividing the search interval in half. It compares the target with the middle element and eliminates half of the remaining elements.',
};
