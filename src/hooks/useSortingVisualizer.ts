'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimationSpeed,
  SortingAlgorithm,
  SortingStep,
  SPEED_MAP,
} from '@/types';
import { generateRandomArray } from '@/utils/arrayGenerator';
import {
  bubbleSort,
  insertionSort,
  mergeSort,
} from '@/features/algorithms/sorting';

export function useSortingVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(20);
  const [currentStep, setCurrentStep] = useState<SortingStep>({ array: [] });
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [speed, setSpeed] = useState<AnimationSpeed>('normal');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const generatorRef = useRef<AsyncGenerator<SortingStep> | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const clearAnimation = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const generateNewArray = useCallback(() => {
    const nextArray = generateRandomArray(arraySize, 10, 100);
    setArray(nextArray);
    setCurrentStep({ array: nextArray });
    setIsPlaying(false);
    setIsComplete(false);
    generatorRef.current = null;
    clearAnimation();
  }, [arraySize, clearAnimation]);

  const getAlgorithmGenerator = useCallback(
    (selectedAlgorithm: SortingAlgorithm, inputArray: number[]) => {
      switch (selectedAlgorithm) {
        case 'insertion':
          return insertionSort(inputArray);
        case 'merge':
          return mergeSort(inputArray);
        case 'bubble':
        default:
          return bubbleSort(inputArray);
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
      generateNewArray();
      return;
    }

    if (!generatorRef.current) {
      generatorRef.current = getAlgorithmGenerator(algorithm, array);
    }

    setIsPlaying(true);
  }, [algorithm, array, generateNewArray, getAlgorithmGenerator, isComplete]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    clearAnimation();
  }, [clearAnimation]);

  const handleReset = useCallback(() => {
    handlePause();
    setCurrentStep({ array });
    setIsComplete(false);
    generatorRef.current = null;
  }, [array, handlePause]);

  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);

  useEffect(() => {
    if (isPlaying) {
      runNextStep();
    }
  }, [isPlaying, runNextStep]);

  useEffect(() => () => clearAnimation(), [clearAnimation]);

  useEffect(() => {
    if (!isPlaying) {
      generateNewArray();
    }
  }, [arraySize, generateNewArray, isPlaying]);

  return {
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
  };
}
