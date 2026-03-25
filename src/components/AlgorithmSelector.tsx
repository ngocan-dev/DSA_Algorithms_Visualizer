'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Algorithm {
  value: string;
  label: string;
}

interface AlgorithmSelectorProps {
  algorithms: Algorithm[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function AlgorithmSelector({
  algorithms,
  value,
  onChange,
  disabled = false,
}: AlgorithmSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <label className="text-sm font-medium text-gray-300">Algorithm:</label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-64 bg-gray-800 border-gray-700">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {algorithms.map((algo) => (
            <SelectItem key={algo.value} value={algo.value}>
              {algo.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
