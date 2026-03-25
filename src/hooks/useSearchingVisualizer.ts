'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimationSpeed,
  SearchingAlgorithm,
  SearchingStep,
  SPEED_MAP,
} from '@/types';
import { generateSortedArray } from '@/utils/arrayGenerator';
import { binarySearch, linearSearch } from '@/features/algorithms/searching';

export function useSearchingVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [targetValue, setTargetValue] = useState<number>(50);
  const [currentStep, setCurrentStep] = useState<SearchingStep>({
    array: [],
    currentIndex: -1,
  });
  const [algorithm, setAlgorithm] = useState<SearchingAlgorithm>('linear');
  const [speed, setSpeed] = useState<AnimationSpeed>('normal');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const generatorRef = useRef<AsyncGenerator<SearchingStep> | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const clearAnimation = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    clearAnimation();
    setCurrentStep({ array, currentIndex: -1 });
    setIsComplete(false);
    generatorRef.current = null;
  }, [array, clearAnimation]);

  const generateNewArray = useCallback(() => {
    const nextArray = generateSortedArray(15, 10, 100);
    setArray(nextArray);
    setTargetValue(nextArray[Math.floor(Math.random() * nextArray.length)]);
    setCurrentStep({ array: nextArray, currentIndex: -1 });
    setIsPlaying(false);
    setIsComplete(false);
    generatorRef.current = null;
    clearAnimation();
  }, [clearAnimation]);

  const getAlgorithmGenerator = useCallback(
    (selectedAlgorithm: SearchingAlgorithm, inputArray: number[], target: number) => {
      switch (selectedAlgorithm) {
        case 'binary':
          return binarySearch(inputArray, target);
        case 'linear':
        default:
          return linearSearch(inputArray, target);
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

    setCurrentStep(value);

    if (isPlaying) {
      animationRef.current = setTimeout(runNextStep, SPEED_MAP[speed]);
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
  }, [algorithm, array, getAlgorithmGenerator, handleReset, isComplete, targetValue]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    clearAnimation();
  }, [clearAnimation]);

  const setRandomTarget = useCallback(() => {
    if (array.length > 0 && !isPlaying) {
      const randomValue = array[Math.floor(Math.random() * array.length)];
      setTargetValue(randomValue);
      handleReset();
    }
  }, [array, handleReset, isPlaying]);

  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);

  useEffect(() => {
    if (isPlaying) {
      runNextStep();
    }
  }, [isPlaying, runNextStep]);

  useEffect(() => () => clearAnimation(), [clearAnimation]);

  return {
    algorithm,
    array,
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
  };
}
