import { GraphNode, GraphEdge, GraphStep, AlgorithmInfo } from '@/types';

export async function* dfs(
  nodes: Map<string, GraphNode>,
  edges: GraphEdge[],
  startNodeId: string
): AsyncGenerator<GraphStep> {
  const visited = new Set<string>();
  const stack: string[] = [startNodeId];

  const adjacencyList = new Map<string, string[]>();
  edges.forEach((edge) => {
    if (!adjacencyList.has(edge.from)) adjacencyList.set(edge.from, []);
    if (!adjacencyList.has(edge.to)) adjacencyList.set(edge.to, []);
    adjacencyList.get(edge.from)!.push(edge.to);
    adjacencyList.get(edge.to)!.push(edge.from);
  });

  while (stack.length > 0) {
    const currentId = stack.pop()!;

    if (visited.has(currentId)) continue;

    visited.add(currentId);

    const currentNodes = new Map(nodes);
    currentNodes.forEach((node, id) => {
      if (id === currentId) {
        node.state = 'current';
      } else if (visited.has(id)) {
        node.state = 'visited';
      } else if (stack.includes(id)) {
        node.state = 'visiting';
      } else {
        node.state = 'default';
      }
    });

    yield {
      nodes: currentNodes,
      edges: [...edges],
      currentNode: currentId,
      visitedNodes: new Set(visited),
      stack: [...stack],
    };

    const neighbors = adjacencyList.get(currentId) || [];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighborId = neighbors[i];
      if (!visited.has(neighborId) && !stack.includes(neighborId)) {
        stack.push(neighborId);

        const updatedNodes = new Map(nodes);
        updatedNodes.forEach((node, id) => {
          if (id === neighborId) {
            node.state = 'visiting';
          } else if (id === currentId) {
            node.state = 'current';
          } else if (visited.has(id)) {
            node.state = 'visited';
          } else {
            node.state = 'default';
          }
        });

        yield {
          nodes: updatedNodes,
          edges: [...edges],
          currentNode: currentId,
          visitedNodes: new Set(visited),
          stack: [...stack],
        };
      }
    }
  }

  const finalNodes = new Map(nodes);
  finalNodes.forEach((node, id) => {
    node.state = visited.has(id) ? 'visited' : 'default';
  });

  yield {
    nodes: finalNodes,
    edges: [...edges],
    visitedNodes: new Set(visited),
    stack: [],
  };
}

export const dfsInfo: AlgorithmInfo = {
  name: 'Depth-First Search',
  timeComplexity: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)',
  },
  spaceComplexity: 'O(V)',
  description:
    'DFS explores as far as possible along each branch before backtracking. It uses a stack data structure and is useful for detecting cycles, topological sorting, and finding connected components.',
};
