'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GraphStep, AnimationSpeed, SPEED_MAP } from '@/types';
import { generateRandomGraph, generateGridGraph } from '@/utils/graphGenerator';
import { bfs, bfsInfo } from '@/algorithms/graphs/bfs';
import { dfs, dfsInfo } from '@/algorithms/graphs/dfs';
import GraphCanvas from '@/components/visualizers/GraphCanvas';
import ControlPanel from '@/components/ControlPanel';
import AlgorithmSelector from '@/components/AlgorithmSelector';
import SpeedSlider from '@/components/SpeedSlider';
import AlgorithmInfo from '@/components/AlgorithmInfo';
import ColorLegend from '@/components/ColorLegend';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const ALGORITHMS = [
  { value: 'bfs', label: 'Breadth-First Search' },
  { value: 'dfs', label: 'Depth-First Search' },
];

const ALGORITHM_INFO = {
  bfs: bfsInfo,
  dfs: dfsInfo,
};

const LEGEND_ITEMS = [
  { color: 'bg-blue-500', label: 'Unvisited' },
  { color: 'bg-yellow-500', label: 'In Queue/Stack' },
  { color: 'bg-orange-500', label: 'Current' },
  { color: 'bg-green-500', label: 'Visited' },
];

export default function GraphsPage() {
  const [graphData, setGraphData] = useState<GraphStep | null>(null);
  const [algorithm, setAlgorithm] = useState<'bfs' | 'dfs'>('bfs');
  const [speed, setSpeed] = useState<AnimationSpeed>('normal');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [graphType, setGraphType] = useState<'random' | 'grid'>('random');

  const generatorRef = useRef<AsyncGenerator<GraphStep> | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const initialGraphRef = useRef<GraphStep | null>(null);

  useEffect(() => {
    generateNewGraph();
  }, []);

  const generateNewGraph = useCallback(() => {
    const { nodes, edges } =
      graphType === 'random'
        ? generateRandomGraph(8, 800, 500, 0.3)
        : generateGridGraph(3, 4, 800, 500);

    const newGraphData: GraphStep = {
      nodes,
      edges,
      visitedNodes: new Set(),
    };

    setGraphData(newGraphData);
    initialGraphRef.current = newGraphData;
    setIsPlaying(false);
    setIsComplete(false);
    generatorRef.current = null;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  }, [graphType]);

  const getAlgorithmGenerator = (
    algo: 'bfs' | 'dfs',
    step: GraphStep
  ): AsyncGenerator<GraphStep> | null => {
    const startNode = Array.from(step.nodes.keys())[0];
    if (!startNode) return null;

    switch (algo) {
      case 'bfs':
        return bfs(step.nodes, step.edges, startNode);
      case 'dfs':
        return dfs(step.nodes, step.edges, startNode);
      default:
        return bfs(step.nodes, step.edges, startNode);
    }
  };

  const runNextStep = useCallback(async () => {
    if (!generatorRef.current) return;

    const { value, done } = await generatorRef.current.next();

    if (done || !value) {
      setIsPlaying(false);
      setIsComplete(true);
      return;
    }

    setGraphData(value);

    if (isPlaying) {
      animationRef.current = setTimeout(() => {
        runNextStep();
      }, SPEED_MAP[speed]);
    }
  }, [isPlaying, speed]);

  const handlePlay = useCallback(() => {
    if (isComplete) {
      handleReset();
      return;
    }

    if (!generatorRef.current && initialGraphRef.current) {
      generatorRef.current = getAlgorithmGenerator(
        algorithm,
        initialGraphRef.current
      );
    }

    setIsPlaying(true);
  }, [algorithm, isComplete]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  }, []);

  const handleReset = useCallback(() => {
    handlePause();
    setGraphData(initialGraphRef.current);
    setIsComplete(false);
    generatorRef.current = null;
  }, [handlePause]);

  useEffect(() => {
    if (isPlaying) {
      runNextStep();
    }
  }, [isPlaying, runNextStep]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      generateNewGraph();
    }
  }, [graphType]);

  if (!graphData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Graph Algorithms</h1>
        <p className="text-gray-400">
          Visualize how graph traversal algorithms explore nodes and edges
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <GraphCanvas
            nodes={graphData.nodes}
            edges={graphData.edges}
            width={800}
            height={500}
          />

          <ColorLegend items={LEGEND_ITEMS} />

          {graphData.queue !== undefined && (
            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-300">
                <strong>Queue:</strong>{' '}
                {graphData.queue.length > 0
                  ? `[${graphData.queue.join(', ')}]`
                  : 'Empty'}
              </div>
            </div>
          )}

          {graphData.stack !== undefined && (
            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-300">
                <strong>Stack:</strong>{' '}
                {graphData.stack.length > 0
                  ? `[${graphData.stack.join(', ')}]`
                  : 'Empty'}
              </div>
            </div>
          )}

          <ControlPanel
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onReset={handleReset}
            onGenerateNew={generateNewGraph}
            disabled={isPlaying}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-800 rounded-lg">
            <AlgorithmSelector
              algorithms={ALGORITHMS}
              value={algorithm}
              onChange={(value) => {
                if (!isPlaying) {
                  setAlgorithm(value as 'bfs' | 'dfs');
                  handleReset();
                }
              }}
              disabled={isPlaying}
            />

            <SpeedSlider value={speed} onChange={setSpeed} disabled={false} />
          </div>

          <div className="p-4 bg-gray-800 rounded-lg">
            <Label className="text-gray-300 mb-2 block">Graph Type:</Label>
            <div className="flex gap-2">
              <Button
                onClick={() => setGraphType('random')}
                disabled={isPlaying}
                variant={graphType === 'random' ? 'default' : 'outline'}
              >
                Random Graph
              </Button>
              <Button
                onClick={() => setGraphType('grid')}
                disabled={isPlaying}
                variant={graphType === 'grid' ? 'default' : 'outline'}
              >
                Grid Graph
              </Button>
            </div>
          </div>
        </div>

        <div>
          <AlgorithmInfo info={ALGORITHM_INFO[algorithm]} />
        </div>
      </div>
    </div>
  );
}
