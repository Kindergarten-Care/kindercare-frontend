import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { classService } from '@/services/class/ClassService';
import { AttendanceService } from '@/services/Attendance/AttendanceService';
import { fixImageUrl } from '@/utils/imageUrl';
import { AssessmentService } from '@/services/StudentAssessmentService';
import { AssessmentHistoryPoint, UpsertAssessmentItem } from '@/config/types/assessment';
import { currentMonthYYYY } from '@/config/validations/assessment';
import { RadarChartSeries } from '@/components/assessment/AssessmentChart';

export interface StudentLite {
  id: string | number;
  name: string;
  avatar?: string;
}

export function useAssessmentView() {
  const { user } = useAuth();

  const [classId, setClassId] = useState<number | null>(null);
  const [className, setClassName] = useState<string>('');
  const [students, setStudents] = useState<StudentLite[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [termPeriod, setTermPeriod] = useState<string>(currentMonthYYYY());

  const [monthRecords, setMonthRecords] = useState<AssessmentHistoryPoint[]>([]);
  const [history, setHistory] = useState<AssessmentHistoryPoint[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'assessed' | 'not_assessed'>('all');

  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Resolve active class
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const active = await classService.getMyActiveClass();
        if (cancelled) return;
        const id = active?.classInfo?.classId ?? null;
        if (id) {
          setClassId(id);
          setClassName(active?.classInfo?.className ?? '');
        }
      } catch (e) {
        console.warn('No active class', e);
      } finally {
        if (!cancelled) setLoadingStudents(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Load students of active class
  useEffect(() => {
    if (!classId) return;
    let cancelled = false;
    (async () => {
      setLoadingStudents(true);
      try {
        const today = new Date().toISOString().slice(0, 10);
        let mapped: StudentLite[] = [];

        // Try 1: getDailyAttendance (endpoint có date filter)
        try {
          const list = await AttendanceService.getDailyAttendance(classId, today);
          mapped = list.map(s => ({
            id: s.id,
            name: s.name || 'Học sinh',
            avatar: fixImageUrl(s.avatar),
          }));
        } catch (e1: any) {
          console.warn(
            '[AssessmentView] getDailyAttendance failed (BE bug? Table students lowercase):',
            e1?.response?.data?.message || e1?.message
          );

          // Try 2: lite endpoint without date
          try {
            const lite = await AttendanceService.getClassStudentsLite(classId);
            if (lite.length > 0) {
              mapped = lite;
              console.info('[AssessmentView] Fallback OK — dùng getClassStudentsLite.');
            }
          } catch (e2: any) {
            console.warn(
              '[AssessmentView] getClassStudentsLite cũng failed:',
              e2?.response?.data?.message || e2?.message
            );

            // Try 3: cache localStorage
            try {
              const cacheKey = `assessment_students_${classId}`;
              const cached = localStorage.getItem(cacheKey);
              if (cached) {
                const parsed = JSON.parse(cached) as StudentLite[];
                if (Array.isArray(parsed) && parsed.length > 0) {
                  mapped = parsed;
                  console.info(
                    `[AssessmentView] Dùng cache (${parsed.length} HS) cho classId=${classId}.`
                  );
                }
              }
            } catch (eCache) {
              /* localStorage không khả dụng (SSR / Safari private mode) — bỏ qua */
            }
          }
        }

        if (cancelled) return;

        setStudents(mapped);

        // Lưu cache cho lần sau (nếu có data thật)
        if (mapped.length > 0) {
          try {
            localStorage.setItem(
              `assessment_students_${classId}`,
              JSON.stringify(mapped)
            );
          } catch { /* ignore quota / SSR */ }
        }

        if (mapped.length > 0 && !selectedId) {
          setSelectedId(String(mapped[0].id));
        }
      } finally {
        if (!cancelled) setLoadingStudents(false);
      }
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  // Load month records (per-class) when classId or termPeriod changes.
  useEffect(() => {
    if (!classId) return;
    let cancelled = false;
    (async () => {
      setLoadingMonth(true);
      try {
        const records = await AssessmentService.getClassAssessments(classId, termPeriod);
        if (cancelled) return;
        setMonthRecords(records);
      } catch (e) {
        console.warn('Failed to load assessments', e);
        setMonthRecords([]);
      } finally {
        if (!cancelled) setLoadingMonth(false);
      }
    })();
    return () => { cancelled = true; };
  }, [classId, termPeriod]);

  // Fetch 6 tháng gần nhất của học sinh đang chọn để vẽ polygon so sánh
  // với tháng hiện tại trên radar chart.
  useEffect(() => {
    if (!classId || !selectedId) return;
    let cancelled = false;
    (async () => {
      setLoadingHistory(true);
      try {
        const h = await AssessmentService.getStudentHistory(classId, selectedId, 6);
        if (cancelled) return;
        setHistory(h);
      } catch (e) {
        if (!cancelled) {
          console.warn('Failed to load history', e);
          setHistory([]);
        }
      } finally {
        if (!cancelled) setLoadingHistory(false);
      }
    })();
    return () => { cancelled = true; };
  }, [classId, selectedId]);

  const currentRecord = useMemo(
    () => monthRecords.find(r => String(r.studentId) === String(selectedId)),
    [monthRecords, selectedId]
  );

  /**
   * Tìm record tháng ngay trước tháng hiện tại trong history.
   * BE schema giờ có `termPeriod` (YYYY-MM) → so sánh trực tiếp.
   * Nếu không tìm được trong history → undefined (radar chỉ hiện polygon tháng này).
   */
  const previousRecord = useMemo(() => {
    if (history.length === 0) return undefined;
    const sorted = [...history].sort((a, b) =>
      (b.termPeriod || '').localeCompare(a.termPeriod || '')
    );
    const maxPast = sorted.find(h => h.termPeriod && h.termPeriod < termPeriod);
    return maxPast;
  }, [history, termPeriod]);

  const currentScores = useMemo(() => ({
    physicalScore: currentRecord?.physicalScore ?? 0,
    cognitiveScore: currentRecord?.cognitiveScore ?? 0,
    languageScore: currentRecord?.languageScore ?? 0,
    socioEmotionalScore: currentRecord?.socioEmotionalScore ?? 0,
    aestheticScore: currentRecord?.aestheticScore || 0,
  }), [currentRecord]);

  /**
   * Polygon tháng trước (chỉ build khi previousRecord có dữ liệu).
   * Lấy tháng gần nhất đã có record trong quá khứ — hữu ích cho radar chart.
   */
  const previousScores: RadarChartSeries | undefined = useMemo(() => {
    if (!previousRecord) return undefined;
    return {
      label: previousRecord.termPeriod,
      color: '#94A3B8',
      fillOpacity: 0.08,
      dashed: true,
      values: {
        physicalScore: previousRecord.physicalScore,
        cognitiveScore: previousRecord.cognitiveScore,
        languageScore: previousRecord.languageScore,
        socioEmotionalScore: previousRecord.socioEmotionalScore,
        aestheticScore: previousRecord.aestheticScore || 0,
      },
    };
  }, [previousRecord]);

  const flashToast = (type: 'success' | 'error', text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 2400);
  };

  const handleSave = async (item: UpsertAssessmentItem) => {
    if (!classId) {
      flashToast('error', 'Chưa xác định được lớp học.');
      return;
    }

    setSubmitting(true);
    const res = await AssessmentService.upsertClassAssessments(
      classId,
      termPeriod,
      [item]
    );
    setSubmitting(false);
    if (!res.ok) {
      flashToast('error', res.error);
      throw new Error(res.error);
    }
    flashToast('success', 'Đã lưu đánh giá tháng này.');

    // Cập nhật local cache cho optimistic UI
    setMonthRecords(prev => {
      const filtered = prev.filter(
        r => String(r.studentId) !== String(item.studentId)
      );
      return [
        ...filtered,
        {
          assessmentId: 0,
          studentId: item.studentId,
          termPeriod,
          physicalScore: item.physicalScore,
          cognitiveScore: item.cognitiveScore,
          languageScore: item.languageScore,
          socioEmotionalScore: item.socioEmotionalScore,
          aestheticScore: item.aestheticScore || 0,
          teacherComment: item.teacherComment,
        },
      ];
    });
  };

  return {
    user,
    classId,
    className,
    students,
    selectedId,
    setSelectedId,
    termPeriod,
    setTermPeriod,
    monthRecords,
    filterType,
    setFilterType,
    loadingStudents,
    loadingMonth,
    loadingHistory,
    submitting,
    toast,
    currentRecord,
    currentScores,
    previousScores,
    handleSave,
  };
}
