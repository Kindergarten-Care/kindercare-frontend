'use client';

import React, { useEffect, useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useAuth } from '@/contexts/AuthContext';
import { classService } from '@/services/class/ClassService';
import { AttendanceService } from '@/services/Attendance/AttendanceService';
import { DashboardLayout } from '@/layout/DashboardLayout';
import { fixImageUrl } from '@/utils/imageUrl';
import { StudentAvatar } from '@/components/common/StudentAvatar';
import {
  AssessmentService,
} from '@/services/StudentAssessmentService';
import { AssessmentForm } from '@/components/assessment/AssessmentForm';
import { AssessmentChart, RadarChartSeries } from '@/components/assessment/AssessmentChart';
import { MonthYearPicker } from '@kindercare/ui';
import {
  AssessmentHistoryPoint,
  AssessmentCriterionKey,
} from '@/config/types/assessment';
import {
  currentMonthYYYY,
  mergeSocioEmotional,
} from '@/config/validations/assessment';
import { Activity, BarChart3 } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  font-family: inherit;
  color: ${props => props.theme.colors.fg || props.theme.colors.text || '#1F2937'};
`;

const Header = styled.section`
  background: linear-gradient(120deg, #005A36 0%, #00794A 60%, #0A8A57 100%);
  color: #fff;
  padding: 24px 28px;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
`;

const HeaderTitle = styled.h1`
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 6px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderSubtitle = styled.p`
  font-size: 13px;
  opacity: 0.9;
  margin: 0;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 16px;
  position: sticky;
  top: 16px;
`;

const SidebarTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg || props.theme.colors.text};
`;

const StudentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 60vh;
  overflow-y: auto;
`;

const StudentItem = styled.button<{ $active?: boolean; $accent?: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid ${p => (p.$active ? p.theme.colors.primary : 'transparent')};
  background: ${p => (p.$active ? `${p.theme.colors.primary}11` : 'transparent')};
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: 13px;
  font-weight: ${p => (p.$active ? 700 : 500)};
  color: ${props => props.theme.colors.fg || props.theme.colors.text};
  transition: background 0.15s ease, transform 0.15s ease;
  position: relative;

  &:hover {
    background: ${p => (p.$active ? `${p.theme.colors.primary}22` : '#F1F5F9')};
    transform: translateX(2px);
  }
`;

const Badge = styled.span`
  background: #DCFCE7;
  color: #166534;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 6px;
  border-radius: 8px;
  margin-left: auto;
`;

const FilterBtn = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 6px 0;
  border-radius: 8px;
  border: 1px solid ${p => p.$active ? p.theme.colors.primary || '#005A36' : '#E2E8F0'};
  background: ${p => p.$active ? `${p.theme.colors.primary || '#005A36'}15` : '#F8FAFC'};
  color: ${p => p.$active ? p.theme.colors.primary || '#005A36' : '#64748B'};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ChartCard = styled.section`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 18px 20px;
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 12px;
  flex-wrap: wrap;
`;

const ChartTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EmptyState = styled.div`
  padding: 24px;
  text-align: center;
  color: ${props => props.theme.colors.muted || '#64748B'};
  font-size: 13px;
`;

const Spinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px;
  color: ${props => props.theme.colors.muted || '#64748B'};
  font-size: 13px;
`;

const Toast = styled.div<{ $type: 'success' | 'error' }>`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: ${p => (p.$type === 'success' ? '#046E1E' : '#DC2626')};
  color: #fff;
  padding: 12px 18px;
  border-radius: 14px;
  font-size: 13px;
  box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.25);
  z-index: 50;
`;

interface StudentLite {
  id: string | number;
  name: string;
  avatar?: string;
}

export const AssessmentView: React.FC = () => {
  const theme = useTheme();
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
  // Lấy luôn nhiều tháng gần nhất (4) để có radar so sánh với tháng hiện tại
  // — workaround vì BE chưa có endpoint /history riêng.
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

  // BE đã có GET .../history → fetch 6 tháng gần nhất của học sinh đang chọn
  // để vẽ polygon so sánh với tháng hiện tại trên radar chart.
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
    /** DB tách EmotionalScore + SocialScore → FE merge thành 1 "Cảm xúc - Xã hội". */
    socioEmotionalScore: mergeSocioEmotional(
      currentRecord?.emotionalScore,
      currentRecord?.socialScore,
    ),
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
        socioEmotionalScore: mergeSocioEmotional(
          previousRecord.emotionalScore,
          previousRecord.socialScore,
        ),
        aestheticScore: previousRecord.aestheticScore || 0,
      },
    };
  }, [previousRecord]);

  const flashToast = (type: 'success' | 'error', text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 2400);
  };

  const handleSave = async (item: any) => {
    if (!classId) {
      flashToast('error', 'Chưa xác định được lớp học.');
      return;
    }

    // BE chỉ nhận 5 scores tách + note. socioEmotionalScore (UI) → split thành
    // emotionalScore + socialScore (gửi mean ngược lại để BE lưu cả 2 field).
    // Nếu form gửi sẵn emotionalScore/socialScore (sau upgrade UI) → giữ nguyên.
    const socE = typeof item.emotionalScore === 'number'
      ? item.emotionalScore
      : item.socioEmotionalScore;
    const socS = typeof item.socialScore === 'number'
      ? item.socialScore
      : item.socioEmotionalScore;

    const bePayload = {
      studentId: item.studentId,
      physicalScore: item.physicalScore,
      cognitiveScore: item.cognitiveScore,
      languageScore: item.languageScore,
      aestheticScore: item.aestheticScore,
      ...(typeof socE === 'number' ? { emotionalScore: socE } : {}),
      ...(typeof socS === 'number' ? { socialScore: socS } : {}),
      ...(item.overallNote ? { overallNote: item.overallNote } : {}),
      ...(item.teacherComment && !item.overallNote ? { overallNote: item.teacherComment } : {}),
    };

    setSubmitting(true);
    const res = await AssessmentService.upsertClassAssessments(
      classId,
      termPeriod,
      [bePayload]
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
          aestheticScore: item.aestheticScore || 0,
          emotionalScore: typeof socE === 'number' ? socE : 0,
          socialScore: typeof socS === 'number' ? socS : 0,
          overallNote: item.overallNote || item.teacherComment,
        },
      ];
    });
  };

  const renderStudentList = () => {
    if (loadingStudents) {
      return <Spinner><Activity size={14} /> Đang tải danh sách lớp…</Spinner>;
    }
    if (students.length === 0) {
      return (
        <EmptyState>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Chưa tải được danh sách học sinh.</div>
          <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.45 }}>
            Vui lòng kiểm tra kết nối mạng hoặc thử lại.
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              marginTop: 8,
              padding: '4px 10px',
              border: '1px solid currentColor',
              borderRadius: 6,
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            Thử lại
          </button>
        </EmptyState>
      );
    }
    
    const filteredStudents = students.filter(s => {
      const isAssessed = monthRecords.some(r => String(r.studentId) === String(s.id));
      if (filterType === 'assessed') return isAssessed;
      if (filterType === 'not_assessed') return !isAssessed;
      return true;
    });

    return (
      <StudentList>
        {filteredStudents.map(s => {
          const active = String(s.id) === String(selectedId);
          const isAssessed = monthRecords.some(r => String(r.studentId) === String(s.id));
          return (
            <StudentItem
              key={String(s.id)}
              type="button"
              $active={active}
              onClick={() => setSelectedId(String(s.id))}
              aria-label={`Chọn học sinh ${s.name}`}
            >
              <StudentAvatar src={s.avatar} name={s.name} size={32} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {s.name}
              </span>
              {isAssessed && <Badge>Đã ĐG</Badge>}
            </StudentItem>
          );
        })}
        {filteredStudents.length === 0 && (
          <EmptyState>Không có học sinh nào phù hợp bộ lọc.</EmptyState>
        )}
      </StudentList>
    );
  };

  const selectedStudent = students.find(s => String(s.id) === String(selectedId));

  return (
    <DashboardLayout>
    <Container>
      <Header>
        <HeaderTitle><BarChart3 size={22} /> Đánh giá định kỳ học sinh</HeaderTitle>
        <HeaderSubtitle>
          Lớp {className || '—'} · Tháng {termPeriod.replace('-', '/')} · Giáo viên {user?.fullName || user?.username || ''}
        </HeaderSubtitle>
      </Header>

      <Layout>
        <Sidebar>
          <SidebarTitle>
            Danh sách lớp ({monthRecords.length}/{students.length} bé đã ĐG)
          </SidebarTitle>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8, marginTop: -4 }}>
            <FilterBtn $active={filterType === 'all'} onClick={() => setFilterType('all')}>Tất cả</FilterBtn>
            <FilterBtn $active={filterType === 'assessed'} onClick={() => setFilterType('assessed')}>Đã ĐG</FilterBtn>
            <FilterBtn $active={filterType === 'not_assessed'} onClick={() => setFilterType('not_assessed')}>Chưa ĐG</FilterBtn>
          </div>
          {renderStudentList()}
          <div>
            <SidebarTitle as="label" htmlFor="term-select" style={{ display: 'block', marginBottom: 6 }}>
              Chọn tháng đánh giá
            </SidebarTitle>
            <MonthYearPicker
              month={Number(termPeriod.split('-')[1]) - 1}
              year={Number(termPeriod.split('-')[0])}
              onChange={(month, year) =>
                setTermPeriod(
                  `${year}-${String(month + 1).padStart(2, '0')}`
                )
              }
              id="term-select"
            />
          </div>
        </Sidebar>

        <Main>
            <ChartCard>
            <ChartHeader>
              <ChartTitle><Activity size={18} color={theme.colors?.primary || '#046E1E'} /> Biểu đồ Radar 5 tiêu chí</ChartTitle>
            </ChartHeader>
            {loadingMonth ? (
              <Spinner><Activity size={14} /> Đang tải đánh giá…</Spinner>
            ) : (
              <AssessmentChart
                current={currentScores as Record<AssessmentCriterionKey, number>}
                previous={previousScores}
                size={340}
              />
            )}
          </ChartCard>

          {selectedStudent ? (
            <AssessmentForm
              key={`${selectedStudent.id}-${termPeriod}`}
              studentId={selectedStudent.id}
              studentName={selectedStudent.name}
              studentAvatar={selectedStudent.avatar}
              initial={currentRecord
                ? {
                    studentId: currentRecord.studentId,
                    physicalScore: currentRecord.physicalScore,
                    cognitiveScore: currentRecord.cognitiveScore,
                    languageScore: currentRecord.languageScore,
                    /** Map DB 2 cột EmotionalScore + SocialScore → 1 field UI "Cảm xúc - Xã hội". */
                    socioEmotionalScore: mergeSocioEmotional(
                      currentRecord.emotionalScore,
                      currentRecord.socialScore,
                    ),
                    /** DB chưa có cột → undefined, form sẽ dùng default 3. */
                    aestheticScore: currentRecord.aestheticScore,
                    /** Tương thích ngược: form/validation cũ dùng `teacherComment`. */
                    teacherComment: currentRecord.overallNote,
                  }
                : undefined
              }
              onSubmit={handleSave}
              disabled={loadingMonth || submitting || !!currentRecord}
            />
          ) : (
            <EmptyState>Chọn học sinh để bắt đầu đánh giá.</EmptyState>
          )}
        </Main>
      </Layout>

      {toast && <Toast $type={toast.type}>{toast.text}</Toast>}
    </Container>
    </DashboardLayout>
  );
};
