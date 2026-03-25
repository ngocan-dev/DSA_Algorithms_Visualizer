'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimationSpeed, GraphAlgorithm, GraphStep, SPEED_MAP } from '@/types';
import { generateGridGraph, generateRandomGraph } from '@/utils/graphGenerator';
import { bfs, dfs } from '@/features/algorithms/graph';

type GraphType = 'random' | 'grid';

export function useGraphVisualizer() {
  const [graphData, setGraphData] = useState<GraphStep | null>(null);
  const [algorithm, setAlgorithm] = useState<Extract<GraphAlgorithm, 'bfs' | 'dfs'>>('bfs');
  const [speed, setSpeed] = useState<AnimationSpeed>('normal');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [graphType, setGraphType] = useState<GraphType>('random');

  const generatorRef = useRef<AsyncGenerator<GraphStep> | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const initialGraphRef = useRef<GraphStep | null>(null);

  const clearAnimation = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const generateNewGraph = useCallback(() => {
    const { nodes, edges } =
      graphType === 'random'
        ? generateRandomGraph(8, 800, 500, 0.3)
        : generateGridGraph(3, 4, 800, 500);

    const nextGraphData: GraphStep = {
      nodes,
      edges,
      visitedNodes: new Set(),
    };

    setGraphData(nextGraphData);
    initialGraphRef.current = nextGraphData;
    setIsPlaying(false);
    setIsComplete(false);
    generatorRef.current = null;
    clearAnimation();
  }, [clearAnimation, graphType]);

  const getAlgorithmGenerator = useCallback(
    (selectedAlgorithm: Extract<GraphAlgorithm, 'bfs' | 'dfs'>, step: GraphStep) => {
      const startNode = Array.from(step.nodes.keys())[0];
      if (!startNode) {
        return null;
      }

      switch (selectedAlgorithm) {
        case 'dfs':
          return dfs(step.nodes, step.edges, startNode);
        case 'bfs':
        default:
          return bfs(step.nodes, step.edges, startNode);
      }
    },
    []
  );

  const runNextStep = useCallback(async () => {
    if (!generatorRef.current) {
      return;
    }

    const { value, done } = await generatorRef.current.next();

    if (done || !value) {
      setIsPlaying(false);
      setIsComplete(true);
      return;
    }

    setGraphData(value);

    if (isPlaying) {
      animationRef.current = setTimeout(runNextStep, SPEED_MAP[speed]);
    }
  }, [isPlaying, speed]);

  const handlePlay = useCallback(() => {
    if (isComplete) {
      handleReset();
      return;
    }

    if (!generatorRef.current && initialGraphRef.current) {
      generatorRef.current = getAlgorithmGenerator(algorithm, initialGraphRef.current);
    }

    setIsPlaying(true);
  }, [algorithm, getAlgorithmGenerator, isComplete]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    clearAnimation();
  }, [clearAnimation]);

  const handleReset = useCallback(() => {
    handlePause();
    setGraphData(initialGraphRef.current);
    setIsComplete(false);
    generatorRef.current = null;
  }, [handlePause]);

  useEffect(() => {
    generateNewGraph();
  }, [generateNewGraph]);

  useEffect(() => {
    if (isPlaying) {
      runNextStep();
    }
  }, [isPlaying, runNextStep]);

  useEffect(() => () => clearAnimation(), [clearAnimation]);

  return {
    algorithm,
    graphData,
    graphType,
    isPlaying,
    speed,
    setAlgorithm,
    setGraphType,
    setSpeed,
    generateNewGraph,
    handlePause,
    handlePlay,
    handleReset,
  };
}
