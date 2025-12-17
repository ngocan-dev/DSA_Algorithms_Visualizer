import { SearchingStep, AlgorithmInfo } from '@/types';

export async function* linearSearch(
  array: number[],
  target: number
): AsyncGenerator<SearchingStep> {
  for (let i = 0; i < array.length; i++) {
    yield {
      array: [...array],
      currentIndex: i,
      searchIndices: [i],
    };

    if (array[i] === target) {
      yield {
        array: [...array],
        currentIndex: i,
        foundIndex: i,
      };
      return;
    }
  }

  yield {
    array: [...array],
    currentIndex: array.length - 1,
    foundIndex: -1,
  };
}

export const linearSearchInfo: AlgorithmInfo = {
  name: 'Linear Search',
  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
  },
  spaceComplexity: 'O(1)',
  description:
    'Linear Search sequentially checks each element of the list until a match is found or the whole list has been searched. It works on both sorted and unsorted arrays.',
};
