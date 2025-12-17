'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { SortingAlgorithm, SortingStep, AnimationSpeed, SPEED_MAP } from '@/types';
import { generateRandomArray } from '@/utils/arrayGenerator';
import { bubbleSort, bubbleSortInfo } from '@/algorithms/sorting/bubbleSort';
import { insertionSort, insertionSortInfo } from '@/algorithms/sorting/insertionSort';
import { mergeSort, mergeSortInfo } from '@/algorithms/sorting/mergeSort';
import ArrayBars from '@/components/visualizers/ArrayBars';
import ControlPanel from '@/components/ControlPanel';
import AlgorithmSelector from '@/components/AlgorithmSelector';
import SpeedSlider from '@/components/SpeedSlider';
import AlgorithmInfo from '@/components/AlgorithmInfo';
import ColorLegend from '@/components/ColorLegend';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ALGORITHMS = [
  { value: 'bubble', label: 'Bubble Sort' },
  { value: 'insertion', label: 'Insertion Sort' },
  { value: 'merge', label: 'Merge Sort' },
];

const ALGORITHM_INFO = {
  bubble: bubbleSortInfo,
  insertion: insertionSortInfo,
  merge: mergeSortInfo,
};

const LEGEND_ITEMS = [
  { color: 'bg-blue-500', label: 'Unsorted' },
  { color: 'bg-yellow-500', label: 'Comparing' },
  { color: 'bg-red-500', label: 'Swapping' },
  { color: 'bg-green-500', label: 'Sorted' },
];

export default function SortingPage() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(20);
  const [currentStep, setCurrentStep] = useState<SortingStep>({ array: [] });
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [speed, setSpeed] = useState<AnimationSpeed>('normal');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const generatorRef = useRef<AsyncGenerator<SortingStep> | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = useCallback(() => {
    const newArray = generateRandomArray(arraySize, 10, 100);
    setArray(newArray);
    setCurrentStep({ array: newArray });
    setIsPlaying(false);
    setIsComplete(false);
    generatorRef.current = null;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  }, [arraySize]);

  const getAlgorithmGenerator = (
    algo: SortingAlgorithm,
    arr: number[]
  ): AsyncGenerator<SortingStep> => {
    switch (algo) {
      case 'bubble':
        return bubbleSort(arr);
      case 'insertion':
        return insertionSort(arr);
      case 'merge':
        return mergeSort(arr);
      default:
        return bubbleSort(arr);
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
      generateNewArray();
      return;
    }

    if (!generatorRef.current) {
      generatorRef.current = getAlgorithmGenerator(algorithm, array);
    }

    setIsPlaying(true);
  }, [algorithm, array, isComplete, generateNewArray]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  }, []);

  const handleReset = useCallback(() => {
    handlePause();
    setCurrentStep({ array });
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

  const handleArraySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    if (size >= 5 && size <= 100) {
      setArraySize(size);
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      generateNewArray();
    }
  }, [arraySize]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Sorting Algorithms</h1>
        <p className="text-gray-400">
          Visualize how different sorting algorithms work step by step
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <ArrayBars
            array={currentStep.array}
            comparingIndices={currentStep.comparingIndices}
            swappingIndices={currentStep.swappingIndices}
            sortedIndices={currentStep.sortedIndices}
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
              onChange={handleArraySizeChange}
              disabled={isPlaying}
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <AlgorithmInfo info={ALGORITHM_INFO[algorithm]} />
        </div>
      </div>
    </div>
  );
}
