'use client';

import { useState, useEffect, useMemo } from 'react';
import { useStudent } from '@/contexts/StudentContext';
import { healthService } from '@/services/Health/HealthService';
import { HealthRecordDomainModel } from '@/config/types/health';
import { getBmiStatus, formatTermPeriod, formatLatestUpdate } from '@/utils/Student/Health';

export interface ChartDataPoint {
  month: string;
  shortMonth: string;
  weight: number;
  height: number;
  bmi: number;
  termPeriod: string;
}

export function useGrowthData() {
  const { activeStudent } = useStudent();
  const [healthRecords, setHealthRecords] = useState<HealthRecordDomainModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!activeStudent) return;
    setLoading(true);
    healthService.getHealthRecords(activeStudent.studentId)
      .then(setHealthRecords)
      .catch(err => console.error('Failed to fetch health records:', err))
      .finally(() => setLoading(false));
  }, [activeStudent]);

  const sortedRecords = useMemo(() => {
    return [...healthRecords]
      .sort((a, b) => a.termPeriod.localeCompare(b.termPeriod))
      .slice(-6);
  }, [healthRecords]);

  const chartData = useMemo<ChartDataPoint[]>(() => {
    return sortedRecords.map(r => {
      const formatted = formatTermPeriod(r.termPeriod);
      return {
        month: formatted.month,
        shortMonth: formatted.shortMonth,
        weight: r.weight,
        height: r.height,
        bmi: r.bmi,
        termPeriod: r.termPeriod,
      };
    });
  }, [sortedRecords]);

  const latest = useMemo(() => {
    return chartData.length > 0 ? chartData[chartData.length - 1] : null;
  }, [chartData]);

  const previous = useMemo(() => {
    return chartData.length >= 2 ? chartData[chartData.length - 2] : null;
  }, [chartData]);

  const weightDiff = useMemo(() => {
    if (!latest || !previous) return null;
    return latest.weight - previous.weight;
  }, [latest, previous]);

  const heightDiff = useMemo(() => {
    if (!latest || !previous) return null;
    return latest.height - previous.height;
  }, [latest, previous]);

  const bmiStatus = useMemo(() => {
    if (!latest) return { label: '', type: 'success' as const };
    return getBmiStatus(latest.bmi);
  }, [latest]);

  const formattedLatestUpdate = useMemo(() => {
    if (!latest) return '';
    return formatLatestUpdate(latest.termPeriod);
  }, [latest]);

  // Coordinate and SVG Path calculations
  const N = chartData.length;
  
  const xCoords = useMemo(() => {
    return chartData.map((_, idx) => {
      if (N <= 1) return 150;
      return 26 + (idx * 248) / (N - 1);
    });
  }, [chartData, N]);

  const bounds = useMemo(() => {
    if (N === 0) {
      return {
        weightMin: 0,
        weightMax: 0,
        weightRange: 1,
        heightMin: 0,
        heightMax: 0,
        heightRange: 1,
      };
    }

    const weights = chartData.map(d => d.weight);
    const heights = chartData.map(d => d.height);

    const minW = Math.min(...weights);
    const maxW = Math.max(...weights);
    const minH = Math.min(...heights);
    const maxH = Math.max(...heights);

    const weightMin = minW - 0.5;
    const weightMax = maxW + 0.5;
    const weightRange = weightMax - weightMin || 1;

    const heightMin = minH - 1;
    const heightMax = maxH + 1;
    const heightRange = heightMax - heightMin || 1;

    return {
      weightMin,
      weightMax,
      weightRange,
      heightMin,
      heightMax,
      heightRange,
    };
  }, [chartData, N]);

  const getWeightY = (w: number) => 75 - ((w - bounds.weightMin) / bounds.weightRange) * 60;
  const getHeightY = (h: number) => 75 - ((h - bounds.heightMin) / bounds.heightRange) * 60;

  const weightPoints = useMemo(() => {
    return chartData.map((d, idx) => ({
      x: xCoords[idx],
      y: getWeightY(d.weight),
      value: d.weight
    }));
  }, [chartData, xCoords, bounds]);

  const heightPoints = useMemo(() => {
    return chartData.map((d, idx) => ({
      x: xCoords[idx],
      y: getHeightY(d.height),
      value: d.height
    }));
  }, [chartData, xCoords, bounds]);

  const weightPolylinePoints = useMemo(() => {
    return N > 1 ? weightPoints.map(p => `${p.x},${p.y}`).join(' ') : '';
  }, [weightPoints, N]);

  const heightPolylinePoints = useMemo(() => {
    return N > 1 ? heightPoints.map(p => `${p.x},${p.y}`).join(' ') : '';
  }, [heightPoints, N]);

  const weightGlowPath = useMemo(() => {
    return N > 1 
      ? `M26,${weightPoints[0].y} ` + weightPoints.map(p => `L${p.x},${p.y}`).join(' ') + ` L274,75 L26,75 Z`
      : '';
  }, [weightPoints, N]);

  const heightGlowPath = useMemo(() => {
    return N > 1
      ? `M26,${heightPoints[0].y} ` + heightPoints.map(p => `L${p.x},${p.y}`).join(' ') + ` L274,75 L26,75 Z`
      : '';
  }, [heightPoints, N]);

  const hoverWidth = useMemo(() => {
    return N > 1 ? Math.max(20, 248 / (N - 1)) : 48;
  }, [N]);

  return {
    loading,
    chartData,
    latest,
    weightDiff,
    heightDiff,
    bmiStatus,
    formattedLatestUpdate,
    xCoords,
    bounds,
    weightPoints,
    heightPoints,
    weightPolylinePoints,
    heightPolylinePoints,
    weightGlowPath,
    heightGlowPath,
    hoverWidth,
  };
}
