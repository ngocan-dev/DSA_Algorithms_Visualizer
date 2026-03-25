'use client';

import React from 'react';
import { AlgorithmInfo, AlgorithmSelector, ColorLegend, ControlPanel, SpeedSlider } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { searchingAlgorithmInfo, searchingAlgorithms, searchingLegendItems } from '@/constants';
import { useSearchingVisualizer } from '@/hooks';
import { SearchVisualizer } from '@/features/visualizer/components';
import { SearchingAlgorithm } from '@/types';

export default function SearchingPage() {
  const {
    algorithm,
    currentStep,
    isPlaying,
    speed,
    targetValue,
    setAlgorithm,
    setSpeed,
    setTargetValue,
    generateNewArray,
    handlePause,
    handlePlay,
    handleReset,
    setRandomTarget,
  } = useSearchingVisualizer();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Searching Algorithms</h1>
        <p className="text-gray-400">Visualize how different searching algorithms find elements in arrays</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <SearchVisualizer
            array={currentStep.array}
            currentIndex={currentStep.currentIndex}
            foundIndex={currentStep.foundIndex}
            searchIndices={currentStep.searchIndices}
            left={currentStep.left}
            right={currentStep.right}
          />

          <ColorLegend items={searchingLegendItems} />

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
              algorithms={[...searchingAlgorithms]}
              value={algorithm}
              onChange={(value) => {
                if (!isPlaying) {
                  setAlgorithm(value as SearchingAlgorithm);
                  handleReset();
                }
              }}
              disabled={isPlaying}
            />

            <SpeedSlider value={speed} onChange={setSpeed} disabled={false} />
          </div>

          <div className="p-4 bg-gray-800 rounded-lg space-y-4">
            <div>
              <Label htmlFor="targetValue" className="text-gray-300">
                Target Value: {targetValue}
              </Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="targetValue"
                  type="number"
                  value={targetValue}
                  onChange={(event) => {
                    const parsedValue = parseInt(event.target.value, 10);
                    if (!Number.isNaN(parsedValue)) {
                      setTargetValue(parsedValue);
                      handleReset();
                    }
                  }}
                  disabled={isPlaying}
                  className="flex-1"
                />
                <Button onClick={setRandomTarget} disabled={isPlaying} variant="outline">
                  Random
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <AlgorithmInfo info={searchingAlgorithmInfo[algorithm]} />
        </div>
      </div>
    </div>
  );
}
