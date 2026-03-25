'use client';

import React from 'react';
import { AlgorithmInfo, AlgorithmSelector, ColorLegend, ControlPanel, SpeedSlider } from '@/components';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sortingAlgorithmInfo, sortingAlgorithms, sortingLegendItems } from '@/constants';
import { useSortingVisualizer } from '@/hooks';
import { ArrayBars } from '@/features/visualizer/components';
import { SortingAlgorithm } from '@/types';

export default function SortingPage() {
  const {
    algorithm,
    arraySize,
    currentStep,
    isPlaying,
    speed,
    setAlgorithm,
    setArraySize,
    setSpeed,
    generateNewArray,
    handlePause,
    handlePlay,
    handleReset,
  } = useSortingVisualizer();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Sorting Algorithms</h1>
        <p className="text-gray-400">Visualize how different sorting algorithms work step by step</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <ArrayBars
            array={currentStep.array}
            comparingIndices={currentStep.comparingIndices}
            swappingIndices={currentStep.swappingIndices}
            sortedIndices={currentStep.sortedIndices}
          />

          <ColorLegend items={sortingLegendItems} />

          <ControlPanel
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onReset={handleReset}
            onGenerateNew={generateNewArray}
            disabled={isPlaying}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-800 rounded-lg">
            <AlgorithmSelector
              algorithms={[...sortingAlgorithms]}
              value={algorithm}
              onChange={(value) => {
                if (!isPlaying) {
                  setAlgorithm(value as SortingAlgorithm);
                  handleReset();
                }
              }}
              disabled={isPlaying}
            />

            <SpeedSlider value={speed} onChange={setSpeed} disabled={false} />
          </div>

          <div className="p-4 bg-gray-800 rounded-lg">
            <Label htmlFor="arraySize" className="text-gray-300">
              Array Size: {arraySize}
            </Label>
            <Input
              id="arraySize"
              type="range"
              min="5"
              max="100"
              value={arraySize}
              onChange={(event) => {
                const size = parseInt(event.target.value, 10);
                if (size >= 5 && size <= 100) {
                  setArraySize(size);
                }
              }}
              disabled={isPlaying}
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <AlgorithmInfo info={sortingAlgorithmInfo[algorithm]} />
        </div>
      </div>
    </div>
  );
}
