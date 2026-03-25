import { bfsInfo, dfsInfo } from '@/features/algorithms/graph';

export const graphAlgorithms = [
  { value: 'bfs', label: 'Breadth-First Search' },
  { value: 'dfs', label: 'Depth-First Search' },
] as const;

export const graphAlgorithmInfo = {
  bfs: bfsInfo,
  dfs: dfsInfo,
};

export const graphLegendItems = [
  { color: 'bg-blue-500', label: 'Unvisited' },
  { color: 'bg-yellow-500', label: 'In Queue/Stack' },
  { color: 'bg-orange-500', label: 'Current' },
  { color: 'bg-green-500', label: 'Visited' },
];
