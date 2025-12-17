import { GraphNode, GraphEdge, GraphStep, AlgorithmInfo } from '@/types';

export async function* bfs(
  nodes: Map<string, GraphNode>,
  edges: GraphEdge[],
  startNodeId: string
): AsyncGenerator<GraphStep> {
  const visited = new Set<string>();
  const queue: string[] = [startNodeId];
  visited.add(startNodeId);

  const adjacencyList = new Map<string, string[]>();
  edges.forEach((edge) => {
    if (!adjacencyList.has(edge.from)) adjacencyList.set(edge.from, []);
    if (!adjacencyList.has(edge.to)) adjacencyList.set(edge.to, []);
    adjacencyList.get(edge.from)!.push(edge.to);
    adjacencyList.get(edge.to)!.push(edge.from);
  });

  while (queue.length > 0) {
    const currentId = queue.shift()!;

    const currentNodes = new Map(nodes);
    currentNodes.forEach((node, id) => {
      if (id === currentId) {
        node.state = 'current';
      } else if (visited.has(id)) {
        node.state = 'visited';
      } else if (queue.includes(id)) {
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
      queue: [...queue],
    };

    const neighbors = adjacencyList.get(currentId) || [];
    for (const neighborId of neighbors) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        queue.push(neighborId);

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
          queue: [...queue],
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
    queue: [],
  };
}

export const bfsInfo: AlgorithmInfo = {
  name: 'Breadth-First Search',
  timeComplexity: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)',
  },
  spaceComplexity: 'O(V)',
  description:
    'BFS explores all vertices at the present depth before moving to vertices at the next depth level. It uses a queue data structure and is useful for finding shortest paths in unweighted graphs.',
};
