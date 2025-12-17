'use client';

import React from 'react';

interface SearchVisualizerProps {
  array: number[];
  currentIndex: number;
  foundIndex?: number;
  searchIndices?: number[];
  left?: number;
  right?: number;
}

export default function SearchVisualizer({
  array,
  currentIndex,
  foundIndex,
  searchIndices = [],
  left,
  right,
}: SearchVisualizerProps) {
  const getCellColor = (index: number) => {
    if (foundIndex !== undefined && foundIndex === index) {
      return 'bg-green-500 text-white';
    }
    if (searchIndices.includes(index)) {
      return 'bg-yellow-500 text-black';
    }
    if (left !== undefined && right !== undefined) {
      if (index < left || index > right) {
        return 'bg-gray-700 text-gray-500';
      }
    }
    return 'bg-blue-500 text-white';
  };

  return (
    <div className="p-8 bg-gray-900 rounded-lg">
      <div className="flex items-center justify-center gap-2 mb-8">
        {array.map((value, index) => (
          <div
            key={index}
            className={`w-16 h-16 flex items-center justify-center font-bold text-lg rounded transition-all duration-300 ${getCellColor(
              index
            )}`}
          >
            {value}
          </div>
        ))}
      </div>

      {left !== undefined && right !== undefined && (
        <div className="flex justify-center gap-8 text-sm text-gray-400">
          <div>
            Left: <span className="font-bold text-blue-400">{left}</span>
          </div>
          <div>
            Right: <span className="font-bold text-blue-400">{right}</span>
          </div>
          <div>
            Current:{' '}
            <span className="font-bold text-yellow-400">{currentIndex}</span>
          </div>
        </div>
      )}

      {foundIndex !== undefined && (
        <div className="text-center mt-4">
          {foundIndex >= 0 ? (
            <span className="text-green-500 font-bold">
              Found at index {foundIndex}!
            </span>
          ) : (
            <span className="text-red-500 font-bold">Element not found</span>
          )}
        </div>
      )}
    </div>
  );
}
