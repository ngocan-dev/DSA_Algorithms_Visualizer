import { bubbleSortInfo, insertionSortInfo, mergeSortInfo } from '@/features/algorithms/sorting';

export const sortingAlgorithms = [
  { value: 'bubble', label: 'Bubble Sort' },
  { value: 'insertion', label: 'Insertion Sort' },
  { value: 'merge', label: 'Merge Sort' },
] as const;

export const sortingAlgorithmInfo = {
  bubble: bubbleSortInfo,
  insertion: insertionSortInfo,
  merge: mergeSortInfo,
};

export const sortingLegendItems = [
  { color: 'bg-blue-500', label: 'Unsorted' },
  { color: 'bg-yellow-500', label: 'Comparing' },
  { color: 'bg-red-500', label: 'Swapping' },
  { color: 'bg-green-500', label: 'Sorted' },
];
