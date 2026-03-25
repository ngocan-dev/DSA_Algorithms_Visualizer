'use client';

import React from 'react';
import { AlgorithmInfo as AlgorithmInfoType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AlgorithmInfoProps {
  info: AlgorithmInfoType;
}

export default function AlgorithmInfo({ info }: AlgorithmInfoProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl">{info.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm text-gray-300 mb-2">
            Description
          </h4>
          <p className="text-sm text-gray-400">{info.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm text-gray-300 mb-2">
              Time Complexity
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Best:</span>
                <code className="text-green-400">{info.timeComplexity.best}</code>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average:</span>
                <code className="text-yellow-400">
                  {info.timeComplexity.average}
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Worst:</span>
                <code className="text-red-400">{info.timeComplexity.worst}</code>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-300 mb-2">
              Space Complexity
            </h4>
            <code className="text-blue-400 text-sm">
              {info.spaceComplexity}
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
