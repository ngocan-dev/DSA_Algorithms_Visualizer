export type AlgorithmType = 'sorting' | 'searching' | 'graph' | 'tree';

export type SortingAlgorithm = 'bubble' | 'merge' | 'insertion';
export type SearchingAlgorithm = 'linear' | 'binary';
export type GraphAlgorithm = 'bfs' | 'dfs' | 'dijkstra';

export interface ArrayElement {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'active' | 'found';
}

export interface SortingStep {
  array: number[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  sortedIndices?: number[];
}

export interface SearchingStep {
  array: number[];
  currentIndex: number;
  searchIndices?: number[];
  foundIndex?: number;
  left?: number;
  right?: number;
}

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  state: 'default' | 'visiting' | 'visited' | 'current' | 'path';
}

export interface GraphEdge {
  from: string;
  to: string;
  weight: number;
  state: 'default' | 'active' | 'path';
}

export interface GraphStep {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
  currentNode?: string;
  visitedNodes: Set<string>;
  queue?: string[];
  stack?: string[];
}

export interface AlgorithmInfo {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
}

export type AnimationSpeed = 'slow' | 'normal' | 'fast';

export const SPEED_MAP: Record<AnimationSpeed, number> = {
  slow: 1000,
  normal: 500,
  fast: 100,
};
