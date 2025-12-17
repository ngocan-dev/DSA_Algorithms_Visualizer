'use client';

import React from 'react';
import { GraphNode, GraphEdge } from '@/types';

interface GraphCanvasProps {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
  width?: number;
  height?: number;
}

export default function GraphCanvas({
  nodes,
  edges,
  width = 800,
  height = 600,
}: GraphCanvasProps) {
  const getNodeColor = (state: GraphNode['state']) => {
    switch (state) {
      case 'current':
        return '#f59e0b';
      case 'visiting':
        return '#eab308';
      case 'visited':
        return '#10b981';
      case 'path':
        return '#8b5cf6';
      default:
        return '#3b82f6';
    }
  };

  const getEdgeColor = (state: GraphEdge['state']) => {
    switch (state) {
      case 'active':
        return '#f59e0b';
      case 'path':
        return '#8b5cf6';
      default:
        return '#64748b';
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <svg width={width} height={height} className="mx-auto">
        {edges.map((edge, index) => {
          const fromNode = nodes.get(edge.from);
          const toNode = nodes.get(edge.to);
          if (!fromNode || !toNode) return null;

          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;

          return (
            <g key={index}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={getEdgeColor(edge.state)}
                strokeWidth={2}
                className="transition-all duration-300"
              />
              <text
                x={midX}
                y={midY}
                fill="#9ca3af"
                fontSize="12"
                textAnchor="middle"
                className="select-none"
              >
                {edge.weight}
              </text>
            </g>
          );
        })}

        {Array.from(nodes.values()).map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={20}
              fill={getNodeColor(node.state)}
              stroke="#1f2937"
              strokeWidth={3}
              className="transition-all duration-300"
            />
            <text
              x={node.x}
              y={node.y}
              fill="white"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
              className="select-none"
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
