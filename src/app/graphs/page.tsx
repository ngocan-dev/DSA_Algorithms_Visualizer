'use client';

import React from 'react';
import { AlgorithmInfo, AlgorithmSelector, ColorLegend, ControlPanel, SpeedSlider } from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { graphAlgorithmInfo, graphAlgorithms, graphLegendItems } from '@/constants';
import { useGraphVisualizer } from '@/hooks';
import { GraphCanvas } from '@/features/visualizer/components';

export default function GraphsPage() {
  const {
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
  } = useGraphVisualizer();

  if (!graphData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Graph Algorithms</h1>
        <p className="text-gray-400">Visualize how graph traversal algorithms explore nodes and edges</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <GraphCanvas nodes={graphData.nodes} edges={graphData.edges} width={800} height={500} />

          <ColorLegend items={graphLegendItems} />

          {graphData.queue !== undefined && (
            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-300">
                <strong>Queue:</strong> {graphData.queue.length > 0 ? `[${graphData.queue.join(', ')}]` : 'Empty'}
              </div>
            </div>
          )}

          {graphData.stack !== undefined && (
            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-300">
                <strong>Stack:</strong> {graphData.stack.length > 0 ? `[${graphData.stack.join(', ')}]` : 'Empty'}
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
              algorithms={[...graphAlgorithms]}
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
          <AlgorithmInfo info={graphAlgorithmInfo[algorithm]} />
        </div>
      </div>
    </div>
  );
}
