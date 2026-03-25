'use client';

import React from 'react';

interface LegendItem {
  color: string;
  label: string;
}

interface ColorLegendProps {
  items: LegendItem[];
}

export default function ColorLegend({ items }: ColorLegendProps) {
  return (
    <div className="flex items-center gap-6 p-4 bg-gray-800 rounded-lg">
      <span className="text-sm font-medium text-gray-300">Legend:</span>
      <div className="flex flex-wrap gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${item.color}`} />
            <span className="text-sm text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
