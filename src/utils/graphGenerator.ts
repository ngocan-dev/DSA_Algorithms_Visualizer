import { GraphNode, GraphEdge } from '@/types';

export function generateRandomGraph(
  nodeCount: number,
  width: number,
  height: number,
  edgeProbability: number = 0.3
): { nodes: Map<string, GraphNode>; edges: GraphEdge[] } {
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];

  const padding = 100;
  const usableWidth = width - 2 * padding;
  const usableHeight = height - 2 * padding;

  for (let i = 0; i < nodeCount; i++) {
    const id = i.toString();
    nodes.set(id, {
      id,
      x: padding + Math.random() * usableWidth,
      y: padding + Math.random() * usableHeight,
      state: 'default',
    });
  }

  const nodeIds = Array.from(nodes.keys());
  for (let i = 0; i < nodeIds.length; i++) {
    for (let j = i + 1; j < nodeIds.length; j++) {
      if (Math.random() < edgeProbability) {
        edges.push({
          from: nodeIds[i],
          to: nodeIds[j],
          weight: Math.floor(Math.random() * 20) + 1,
          state: 'default',
        });
      }
    }
  }

  return { nodes, edges };
}

export function generateGridGraph(
  rows: number,
  cols: number,
  width: number,
  height: number
): { nodes: Map<string, GraphNode>; edges: GraphEdge[] } {
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];

  const padding = 80;
  const cellWidth = (width - 2 * padding) / (cols - 1);
  const cellHeight = (height - 2 * padding) / (rows - 1);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const id = `${row}-${col}`;
      nodes.set(id, {
        id,
        x: padding + col * cellWidth,
        y: padding + row * cellHeight,
        state: 'default',
      });
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const currentId = `${row}-${col}`;

      if (col < cols - 1) {
        edges.push({
          from: currentId,
          to: `${row}-${col + 1}`,
          weight: Math.floor(Math.random() * 10) + 1,
          state: 'default',
        });
      }

      if (row < rows - 1) {
        edges.push({
          from: currentId,
          to: `${row + 1}-${col}`,
          weight: Math.floor(Math.random() * 10) + 1,
          state: 'default',
        });
      }
    }
  }

  return { nodes, edges };
}
