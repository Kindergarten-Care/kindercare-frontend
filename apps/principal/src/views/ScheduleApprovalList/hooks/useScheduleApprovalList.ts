import { useState, useEffect, useCallback, useMemo } from 'react';
import { scheduleApprovalService } from '@/services/ScheduleApproval/ScheduleApprovalService';
import { gradeService } from '@/services/grade/GradeService';
import { MonthlyScheduleDto } from '@/config/types/scheduleApproval';
import { GradeDomainModel } from '@/config/types/grade';

export type ApprovalStatusFilter = 'all' | 0 | 1;

interface UseScheduleApprovalListReturn {
  schedules: MonthlyScheduleDto[];
  grades: GradeDomainModel[];
  loading: boolean;
  error: string | null;
  year: string;
  month: string;
  classId: string;
  statusFilter: ApprovalStatusFilter;
  search: string;
  pendingCount: number;
  filteredSchedules: MonthlyScheduleDto[];
  setYear: (v: string) => void;
  setMonth: (v: string) => void;
  setClassId: (v: string) => void;
  setStatusFilter: (v: ApprovalStatusFilter) => void;
  setSearch: (v: string) => void;
  refetch: () => Promise<void>;
}

export const useScheduleApprovalList = (): UseScheduleApprovalListReturn => {
  const [schedules, setSchedules] = useState<MonthlyScheduleDto[]>([]);
  const [grades, setGrades] = useState<GradeDomainModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [month, setMonth] = useState('');
  const [classId, setClassId] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApprovalStatusFilter>('all');
  const [search, setSearch] = useState('');

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [schedulesData, gradesData] = await Promise.all([
        scheduleApprovalService.getMonthlySchedules({
          year: year ? Number(year) : undefined,
          month: month ? Number(month) : undefined,
          classId: classId ? Number(classId) : undefined,
        }),
        gradeService.getGradesAndClasses(),
      ]);
      setSchedules(schedulesData);
      setGrades(gradesData);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải danh sách thời khóa biểu');
    } finally {
      setLoading(false);
    }
  }, [year, month, classId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const pendingCount = useMemo(() => schedules.filter(s => s.approvedStatus === 0).length, [schedules]);

  const filteredSchedules = useMemo(() => {
    const term = search.trim().toLowerCase();
    return schedules
      .filter(s => statusFilter === 'all' || s.approvedStatus === statusFilter)
      .filter(s => {
        if (!term) return true;
        return (
          s.className.toLowerCase().includes(term) ||
          s.monthTheme.toLowerCase().includes(term) ||
          s.gradeName.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => a.approvedStatus - b.approvedStatus || b.updatedAt - a.updatedAt);
  }, [schedules, statusFilter, search]);

  return {
    schedules,
    grades,
    loading,
    error,
    year,
    month,
    classId,
    statusFilter,
    search,
    pendingCount,
    filteredSchedules,
    setYear,
    setMonth,
    setClassId,
    setStatusFilter,
    setSearch,
    refetch: fetchAll,
  };
};
