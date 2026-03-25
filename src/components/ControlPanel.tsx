'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlPanelProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onGenerateNew: () => void;
  disabled?: boolean;
}

export default function ControlPanel({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onGenerateNew,
  disabled = false,
}: ControlPanelProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
      <div className="flex gap-2">
        {!isPlaying ? (
          <Button
            onClick={onPlay}
            disabled={disabled}
            variant="default"
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="w-5 h-5 mr-2" />
            Start
          </Button>
        ) : (
          <Button
            onClick={onPause}
            variant="default"
            size="lg"
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            <Pause className="w-5 h-5 mr-2" />
            Pause
          </Button>
        )}

        <Button
          onClick={onReset}
          disabled={disabled && !isPlaying}
          variant="secondary"
          size="lg"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </Button>
      </div>

      <div className="h-8 w-px bg-gray-600" />

      <Button
        onClick={onGenerateNew}
        disabled={disabled}
        variant="outline"
        size="lg"
      >
        Generate New
      </Button>
    </div>
  );
}
