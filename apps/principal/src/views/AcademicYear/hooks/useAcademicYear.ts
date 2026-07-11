import { useState, useEffect, useCallback } from 'react';
import { assignmentService } from '@/services/Principal/AssignmentService';

interface AcademicYearItem {
  YearID: number;
  YearName: string;
  StartDate: number;
  EndDate: number;
  IsActive: number;
}

interface EndYearResult {
  graduatedStudents: number;
}

interface StartYearPayload {
  yearName: string;
  startDate: number;
  endDate: number;
  monthlyTuition: number;
  dailyMealFee: number;
  isActive: boolean;
}

interface StartYearResult {
  academicYear?: { YearName: string };
  clonedClassesCount?: number;
}

interface UseAcademicYearReturn {
  years: AcademicYearItem[];
  loadingYears: boolean;
  loadingEnd: boolean;
  loadingStart: boolean;
  loadingActivate: number | null;
  error: string | null;
  successMsg: string | null;
  yearName: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  activeYear: AcademicYearItem | undefined;
  setYearName: (v: string) => void;
  setStartDate: (v: string) => void;
  setEndDate: (v: string) => void;
  setIsActive: (v: boolean) => void;
  fetchYears: () => Promise<void>;
  handleEndYear: () => Promise<void>;
  handleStartYear: (e: React.FormEvent) => Promise<void>;
  handleActivate: (yearId: number) => Promise<void>;
}

export const useAcademicYear = (): UseAcademicYearReturn => {
  const [years, setYears] = useState<AcademicYearItem[]>([]);
  const [loadingYears, setLoadingYears] = useState(false);
  const [loadingEnd, setLoadingEnd] = useState(false);
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingActivate, setLoadingActivate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [yearName, setYearName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isActive, setIsActive] = useState(false);

  const activeYear = years.find(y => y.IsActive === 1);

  const fetchYears = useCallback(async () => {
    try {
      setLoadingYears(true);
      const data = await assignmentService.getAcademicYears();
      setYears(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi khi tải danh sách năm học');
    } finally {
      setLoadingYears(false);
    }
  }, []);

  useEffect(() => {
    fetchYears();
  }, [fetchYears]);

  const handleEndYear = useCallback(async () => {
    if (!activeYear) {
      window.alert('Không có năm học nào đang hoạt động để tổng kết!');
      return;
    }
    if (!window.confirm(
      `CẢNH BÁO: Hành động này sẽ tổng kết năm học "${activeYear.YearName}".\n\n` +
      `- Học sinh Khối Lá sẽ TỐT NGHIỆP.\n` +
      `- Học sinh khối khác sẽ bị GỠ KHỎI LỚP.\n\n` +
      `Bạn có chắc chắn muốn tiếp tục?`
    )) return;

    try {
      setLoadingEnd(true);
      setError(null);
      setSuccessMsg(null);
      const res = await assignmentService.endAcademicYear() as EndYearResult;
      setSuccessMsg(
        `Đã kết thúc năm học ${activeYear.YearName} thành công. Cấp bằng tốt nghiệp cho ${res.graduatedStudents} học sinh.`
      );
      await fetchYears();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi khi kết thúc năm học');
    } finally {
      setLoadingEnd(false);
    }
  }, [activeYear, fetchYears]);

  const handleStartYear = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!yearName || !startDate || !endDate) {
      setError('Vui lòng điền đầy đủ thông tin năm học mới.');
      return;
    }
    try {
      setLoadingStart(true);
      setError(null);
      setSuccessMsg(null);
      const payload: StartYearPayload = {
        yearName,
        startDate: Math.floor(new Date(startDate).getTime() / 1000),
        endDate: Math.floor(new Date(endDate).getTime() / 1000),
        monthlyTuition: 0,
        dailyMealFee: 0,
        isActive,
      };
      const res = await assignmentService.startAcademicYear(payload) as StartYearResult;
      setSuccessMsg(
        `Khởi tạo năm học ${res.academicYear?.YearName ?? yearName} thành công. ` +
        `Đã sao chép ${res.clonedClassesCount ?? 0} lớp học.`
      );
      setYearName('');
      setStartDate('');
      setEndDate('');
      setIsActive(false);
      await fetchYears();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi khi khởi tạo năm học mới');
    } finally {
      setLoadingStart(false);
    }
  }, [yearName, startDate, endDate, isActive, fetchYears]);

  const handleActivate = useCallback(async (yearId: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn kích hoạt năm học này? Các năm học khác sẽ bị vô hiệu hóa.')) return;
    try {
      setLoadingActivate(yearId);
      setError(null);
      setSuccessMsg(null);
      await assignmentService.activateAcademicYear(yearId);
      setSuccessMsg('Kích hoạt năm học thành công!');
      await fetchYears();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi khi kích hoạt năm học');
    } finally {
      setLoadingActivate(null);
    }
  }, [fetchYears]);

  return {
    years,
    loadingYears,
    loadingEnd,
    loadingStart,
    loadingActivate,
    error,
    successMsg,
    yearName,
    startDate,
    endDate,
    isActive,
    activeYear,
    setYearName,
    setStartDate,
    setEndDate,
    setIsActive,
    fetchYears,
    handleEndYear,
    handleStartYear,
    handleActivate,
  };
};
