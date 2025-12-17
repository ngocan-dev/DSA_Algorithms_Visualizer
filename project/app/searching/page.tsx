'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { SearchingAlgorithm, SearchingStep, AnimationSpeed, SPEED_MAP } from '@/types';
import { generateSortedArray } from '@/utils/arrayGenerator';
import { linearSearch, linearSearchInfo } from '@/algorithms/searching/linearSearch';
import { binarySearch, binarySearchInfo } from '@/algorithms/searching/binarySearch';
import SearchVisualizer from '@/components/visualizers/SearchVisualizer';
import ControlPanel from '@/components/ControlPanel';
import AlgorithmSelector from '@/components/AlgorithmSelector';
import SpeedSlider from '@/components/SpeedSlider';
import AlgorithmInfo from '@/components/AlgorithmInfo';
import ColorLegend from '@/components/ColorLegend';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const ALGORITHMS = [
  { value: 'linear', label: 'Linear Search' },
  { value: 'binary', label: 'Binary Search' },
];

const ALGORITHM_INFO = {
  linear: linearSearchInfo,
  binary: binarySearchInfo,
};

const LEGEND_ITEMS = [
  { color: 'bg-blue-500', label: 'Active' },
  { color: 'bg-yellow-500', label: 'Searching' },
  { color: 'bg-green-500', label: 'Found' },
  { color: 'bg-gray-700', label: 'Eliminated' },
];

export default function SearchingPage() {
  const [array, setArray] = useState<number[]>([]);
  const [targetValue, setTargetValue] = useState<number>(50);
  const [currentStep, setCurrentStep] = useState<SearchingStep>({
    array: [],
    currentIndex: -1
  });
  const [algorithm, setAlgorithm] = useState<SearchingAlgorithm>('linear');
  const [speed, setSpeed] = useState<AnimationSpeed>('normal');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const generatorRef = useRef<AsyncGenerator<SearchingStep> | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = useCallback(() => {
    const newArray = generateSortedArray(15, 10, 100);
    setArray(newArray);
    setTargetValue(newArray[Math.floor(Math.random() * newArray.length)]);
    setCurrentStep({ array: newArray, currentIndex: -1 });
    setIsPlaying(false);
    setIsComplete(false);
    generatorRef.current = null;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  }, []);

  const getAlgorithmGenerator = (
    algo: SearchingAlgorithm,
    arr: number[],
    target: number
  ): AsyncGenerator<SearchingStep> => {
    switch (algo) {
      case 'linear':
        return linearSearch(arr, target);
      case 'binary':
        return binarySearch(arr, target);
      default:
        return linearSearch(arr, target);
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

    setCurrentStep(value);

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

    if (!generatorRef.current) {
      generatorRef.current = getAlgorithmGenerator(algorithm, array, targetValue);
    }

    setIsPlaying(true);
  }, [algorithm, array, targetValue, isComplete]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  }, []);

  const handleReset = useCallback(() => {
    handlePause();
    setCurrentStep({ array, currentIndex: -1 });
    setIsComplete(false);
    generatorRef.current = null;
  }, [array, handlePause]);

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

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setTargetValue(value);
      handleReset();
    }
  };

  const handleSetRandomTarget = () => {
    if (array.length > 0 && !isPlaying) {
      const randomValue = array[Math.floor(Math.random() * array.length)];
      setTargetValue(randomValue);
      handleReset();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Searching Algorithms</h1>
        <p className="text-gray-400">
          Visualize how different searching algorithms find elements in arrays
        </p>
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

          <ColorLegend items={LEGEND_ITEMS} />

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
              algorithms={ALGORITHMS}
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
                  onChange={handleTargetChange}
                  disabled={isPlaying}
                  className="flex-1"
                />
                <Button
                  onClick={handleSetRandomTarget}
                  disabled={isPlaying}
                  variant="outline"
                >
                  Random
                </Button>
              </div>
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
