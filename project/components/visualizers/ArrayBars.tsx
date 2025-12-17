'use client';

import React from 'react';

interface ArrayBarsProps {
  array: number[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  sortedIndices?: number[];
  maxValue?: number;
}

export default function ArrayBars({
  array,
  comparingIndices = [],
  swappingIndices = [],
  sortedIndices = [],
  maxValue,
}: ArrayBarsProps) {
  const max = maxValue || Math.max(...array);
  const barWidth = Math.max(20, Math.min(80, 800 / array.length));

  const getBarColor = (index: number) => {
    if (sortedIndices.includes(index)) {
      return 'bg-green-500';
    }
    if (swappingIndices.includes(index)) {
      return 'bg-red-500';
    }
    if (comparingIndices.includes(index)) {
      return 'bg-yellow-500';
    }
    return 'bg-blue-500';
  };

  return (
    <div className="flex items-end justify-center gap-1 h-96 p-8 bg-gray-900 rounded-lg">
      {array.map((value, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-end transition-all duration-300"
          style={{ width: `${barWidth}px` }}
        >
          <div
            className={`${getBarColor(index)} transition-all duration-300 rounded-t`}
            style={{
              height: `${(value / max) * 300}px`,
              width: '100%',
            }}
          />
          {array.length <= 20 && (
            <span className="text-xs text-gray-400 mt-1">{value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
