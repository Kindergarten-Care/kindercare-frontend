'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useStudent } from '@/contexts/StudentContext';
import { assessmentService } from '@/services/Assessment/AssessmentService';
import { AssessmentDomainModel } from '@/config/types/assessment';
import { healthService } from '@/services/Health/HealthService';
import { HealthRecordDomainModel } from '@/config/types/health';
import { getBmiStatus, formatTermPeriod } from '@/utils/Student/Health';

const monthParam = (year: number, month: number): string =>
  `${year}-${String(month + 1).padStart(2, '0')}`;

// Converts a "YYYY-MM" / "YYYY-M" termPeriod into a comparable absolute month index.
const termPeriodToIndex = (termPeriod: string): number => {
  const [yearStr, monthStr] = termPeriod.split('-');
  const year = parseInt(yearStr, 10) || 0;
  const month = parseInt(monthStr, 10) || 0;
  return year * 12 + month;
};

export interface ChartDataPoint {
  month: string;
  shortMonth: string;
  weight: number;
  height: number;
  bmi: number;
  termPeriod: string;
}

export function useChildGrowthHistory() {
  const { activeStudent, loading: studentLoading } = useStudent();

  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  const [assessments, setAssessments] = useState<AssessmentDomainModel[]>([]);
  const [healthRecords, setHealthRecords] = useState<HealthRecordDomainModel[]>([]);
  const [apiLoading, setApiLoading] = useState(false);

  const fetchData = useCallback(() => {
    if (!activeStudent?.studentId) return;
    setApiLoading(true);
    Promise.allSettled([
      assessmentService.getAssessments(activeStudent.studentId),
      healthService.getHealthRecords(activeStudent.studentId),
    ])
      .then(([assessmentResult, healthResult]) => {
        if (assessmentResult.status === 'fulfilled') setAssessments(assessmentResult.value);
        else console.error('Failed to fetch assessments:', assessmentResult.reason);

        if (healthResult.status === 'fulfilled') setHealthRecords(healthResult.value);
        else console.error('Failed to fetch health records:', healthResult.reason);
      })
      .finally(() => setApiLoading(false));
  }, [activeStudent?.studentId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const prevMonth = useCallback((): void => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }, [viewMonth]);

  const nextMonth = useCallback((): void => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }, [viewMonth]);

  const setMonthYear = useCallback((month: number, year: number): void => {
    setViewMonth(month);
    setViewYear(year);
  }, []);

  const selectedTermPeriod = useMemo(
    () => `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`,
    [viewYear, viewMonth]
  );

  const currentAssessment = useMemo(() => {
    const target = monthParam(viewYear, viewMonth);
    return assessments.find(a => {
      const [mm, yyyy] = (a.assessmentMonth || '').split('-');
      if (!mm || !yyyy) return false;
      return `${yyyy}-${mm}` === target;
    }) ?? null;
  }, [assessments, viewYear, viewMonth]);

  const sortedNotes = useMemo(() => {
    return [...assessments]
      .filter(a => !!a.teacherComment)
      .sort((a, b) => {
        const [mmA, yyyyA] = (a.assessmentMonth || '').split('-');
        const [mmB, yyyyB] = (b.assessmentMonth || '').split('-');
        const dateA = mmA && yyyyA ? `${yyyyA}-${mmA}` : '';
        const dateB = mmB && yyyyB ? `${yyyyB}-${mmB}` : '';
        return dateB.localeCompare(dateA);
      });
  }, [assessments]);

  // Chart always shows the trailing 6 months of history, independent of the picker.
  const sortedRecords = useMemo(() => {
    return [...healthRecords].sort((a, b) => termPeriodToIndex(a.termPeriod) - termPeriodToIndex(b.termPeriod));
  }, [healthRecords]);

  const chartData = useMemo<ChartDataPoint[]>(() => {
    return sortedRecords.slice(-6).map(r => {
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

  // Metrics stack reflects whichever month is selected in the picker (falls back to
  // the closest earlier record if the exact month has no health record).
  const selectedRecordIndex = useMemo(() => {
    const selectedIndex = termPeriodToIndex(selectedTermPeriod);
    let candidate = -1;
    for (let i = 0; i < sortedRecords.length; i++) {
      if (termPeriodToIndex(sortedRecords[i].termPeriod) <= selectedIndex) candidate = i;
      else break;
    }
    return candidate;
  }, [sortedRecords, selectedTermPeriod]);

  const selectedRecord = useMemo<ChartDataPoint | null>(() => {
    if (selectedRecordIndex < 0) return null;
    const r = sortedRecords[selectedRecordIndex];
    const formatted = formatTermPeriod(r.termPeriod);
    return {
      month: formatted.month,
      shortMonth: formatted.shortMonth,
      weight: r.weight,
      height: r.height,
      bmi: r.bmi,
      termPeriod: r.termPeriod,
    };
  }, [sortedRecords, selectedRecordIndex]);

  const previousRecord = useMemo<ChartDataPoint | null>(() => {
    if (selectedRecordIndex <= 0) return null;
    const r = sortedRecords[selectedRecordIndex - 1];
    const formatted = formatTermPeriod(r.termPeriod);
    return {
      month: formatted.month,
      shortMonth: formatted.shortMonth,
      weight: r.weight,
      height: r.height,
      bmi: r.bmi,
      termPeriod: r.termPeriod,
    };
  }, [sortedRecords, selectedRecordIndex]);

  const weightDiff = useMemo(() => {
    if (!selectedRecord || !previousRecord) return null;
    return selectedRecord.weight - previousRecord.weight;
  }, [selectedRecord, previousRecord]);

  const heightDiff = useMemo(() => {
    if (!selectedRecord || !previousRecord) return null;
    return selectedRecord.height - previousRecord.height;
  }, [selectedRecord, previousRecord]);

  const bmiStatus = useMemo(() => {
    if (!selectedRecord) return { label: '', type: 'success' as const };
    return getBmiStatus(selectedRecord.bmi);
  }, [selectedRecord]);

  return {
    loading: studentLoading || apiLoading,
    activeStudent,
    viewYear,
    viewMonth,
    prevMonth,
    nextMonth,
    setMonthYear,
    currentAssessment,
    notes: sortedNotes,
    chartData,
    selectedTermPeriod,
    latest: selectedRecord,
    weightDiff,
    heightDiff,
    bmiStatus,
  };
}
