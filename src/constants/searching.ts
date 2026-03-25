import { binarySearchInfo, linearSearchInfo } from '@/features/algorithms/searching';

export const searchingAlgorithms = [
  { value: 'linear', label: 'Linear Search' },
  { value: 'binary', label: 'Binary Search' },
] as const;

export const searchingAlgorithmInfo = {
  linear: linearSearchInfo,
  binary: binarySearchInfo,
};

export const searchingLegendItems = [
  { color: 'bg-blue-500', label: 'Active' },
  { color: 'bg-yellow-500', label: 'Searching' },
  { color: 'bg-green-500', label: 'Found' },
  { color: 'bg-gray-700', label: 'Eliminated' },
];
