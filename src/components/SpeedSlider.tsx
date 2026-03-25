'use client';

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { AnimationSpeed } from '@/types';

interface SpeedSliderProps {
  value: AnimationSpeed;
  onChange: (value: AnimationSpeed) => void;
  disabled?: boolean;
}

const SPEED_VALUES: AnimationSpeed[] = ['slow', 'normal', 'fast'];

export default function SpeedSlider({
  value,
  onChange,
  disabled = false,
}: SpeedSliderProps) {
  const speedIndex = SPEED_VALUES.indexOf(value);

  const handleChange = (values: number[]) => {
    onChange(SPEED_VALUES[values[0]]);
  };

  return (
    <div className="flex items-center gap-4 min-w-64">
      <label className="text-sm font-medium text-gray-300">Speed:</label>
      <div className="flex-1">
        <Slider
          value={[speedIndex]}
          onValueChange={handleChange}
          max={2}
          step={1}
          disabled={disabled}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Slow</span>
          <span>Normal</span>
          <span>Fast</span>
        </div>
      </div>
    </div>
  );
}
