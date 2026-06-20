'use client';

import React, { useMemo } from 'react';

interface QrGeneratorProps {
  value: string;
  size?: number;
  logoUrl?: string;
}

export const QrGenerator: React.FC<QrGeneratorProps> = ({ value, size = 220 }) => {
  const gridSize = 25; // 25x25 QR Grid (Version 2)
  
  const grid = useMemo(() => {
    const tempGrid: boolean[][] = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(false));

    // Simple hash function to generate a number from a string
    const getHash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash);
    };

    const cellHash = (x: number, y: number) => {
      const val = getHash(value + `:${x}:${y}`);
      return val % 2 === 0;
    };

    // Helper to draw Finder Pattern (7x7 outer, 5x5 inner white, 3x3 inner black)
    const drawFinder = (ox: number, oy: number) => {
      // Outer 7x7
      for (let x = 0; x < 7; x++) {
        for (let y = 0; y < 7; y++) {
          tempGrid[oy + y][ox + x] = true;
        }
      }
      // Inner 5x5 white
      for (let x = 1; x < 6; x++) {
        for (let y = 1; y < 6; y++) {
          tempGrid[oy + y][ox + x] = false;
        }
      }
      // Center 3x3 black
      for (let x = 2; x < 5; x++) {
        for (let y = 2; y < 5; y++) {
          tempGrid[oy + y][ox + x] = true;
        }
      }
    };

    // Draw 3 standard Finder Patterns
    drawFinder(0, 0); // Top-left
    drawFinder(18, 0); // Top-right
    drawFinder(0, 18); // Bottom-left

    // Draw Alignment Pattern (5x5) at bottom-right (18, 18)
    for (let x = 16; x <= 20; x++) {
      for (let y = 16; y <= 20; y++) {
        tempGrid[y][x] = true;
      }
    }
    for (let x = 17; x <= 19; x++) {
      for (let y = 17; y <= 19; y++) {
        tempGrid[y][x] = false;
      }
    }
    tempGrid[18][18] = true;

    // Draw Timing Patterns (alternating black/white lines at row/col index 6)
    for (let i = 7; i < 18; i++) {
      tempGrid[6][i] = i % 2 === 0;
      tempGrid[i][6] = i % 2 === 0;
    }

    // Populate other cells deterministically
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        // Skip Finder patterns
        if (x < 8 && y < 8) continue;
        if (x >= 17 && y < 8) continue;
        if (x < 8 && y >= 17) continue;

        // Skip Alignment pattern
        if (x >= 16 && x <= 20 && y >= 16 && y <= 20) continue;

        // Skip Timing patterns
        if (x === 6 || y === 6) continue;

        // Fill based on deterministic hash
        tempGrid[y][x] = cellHash(x, y);
      }
    }

    // Clear center 5x5 area (coordinates 10 to 14) for logo placement
    for (let y = 10; y <= 14; y++) {
      for (let x = 10; x <= 14; x++) {
        tempGrid[y][x] = false;
      }
    }

    return tempGrid;
  }, [value]);

  const cellSize = 10;
  const svgSize = gridSize * cellSize;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      style={{ display: 'block', margin: '0 auto', background: '#ffffff', padding: '10px', borderRadius: '12px' }}
    >
      {/* Background */}
      <rect width={svgSize} height={svgSize} fill="#ffffff" />
      
      {/* QR Code Blocks */}
      {grid.map((row, y) =>
        row.map((active, x) => {
          if (!active) return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill="var(--brand)" // Dark green brand color for blocks
              rx={cellSize * 0.15} // Slightly rounded blocks for premium feel
            />
          );
        })
      )}

      {/* Center Branding Circle / Logo */}
      <g transform={`translate(${10 * cellSize}, ${10 * cellSize})`}>
        {/* Background circle */}
        <circle cx={cellSize * 2.5} cy={cellSize * 2.5} r={cellSize * 2.2} fill="#ffffff" stroke="var(--brand)" strokeWidth={1.5} />
        {/* Cute Baby Feet/Hand/Heart icon in SVG instead of image to make it standalone */}
        <path
          d="M20,13.5 C16.5,13.5 15,16 15,20 C15,24 18,27 25,27 C32,27 35,24 35,20 C35,16 33.5,13.5 30,13.5 Z"
          fill="var(--brand)"
          transform="scale(0.8) translate(7, 7)"
        />
        {/* Outer dots for style */}
        <circle cx={cellSize * 1.5} cy={cellSize * 1.5} r={cellSize * 0.4} fill="#dc2626" />
        <circle cx={cellSize * 3.5} cy={cellSize * 1.5} r={cellSize * 0.4} fill="#2563eb" />
        <circle cx={cellSize * 2.5} cy={cellSize * 3.5} r={cellSize * 0.5} fill="var(--brand)" />
      </g>
    </svg>
  );
};
