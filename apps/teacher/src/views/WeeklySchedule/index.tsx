'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import { useWeeklySchedule, SCHOOL_DAYS } from './hooks/useWeeklySchedule';
import { ItemModal } from './components/ItemModal';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { useTeacherClasses } from '@/hooks/useTeacherQueries';
import {
  ACTIVITY_TYPE_LABELS,
  ACTIVITY_TYPE_COLORS,
} from '@/config/types/weeklySchedule';
import * as S from './styles';
import type { SchoolDay, WeeklyScheduleDetail, ActivityType } from '@/config/types/weeklySchedule';
import { apiClient } from '@kindercare/core';

const MONTH_NAMES = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

const ACTIVITY_ICONS: Record<ActivityType, string> = {
  pickup: '👋',
  meal: '🍽️',
  study: '📚',
  nap: '😴',
  play: '🎮',
  dropoff: '👋',
  other: '📌',
};

interface EditItem {
  dayOfWeek: SchoolDay;
  startTime: string;
  endTime: string;
  activityName: string;
  activityType: ActivityType;
  details: string;
  location: string;
}

// CSV template header matches BE columns.
const CSV_TEMPLATE = 'WeekOrder,DayOfWeek,StartTime,EndTime,ActivityName,ActivityType,Details,Location\n' +
  '1,Monday,07:30,08:30,Đón bé & Thể dục sáng,pickup,Tập dân vũ,Sân trường\n' +
  '1,Monday,08:30,09:00,Ăn sáng,meal,Suất sáng,Phòng ăn\n' +
  '1,Tuesday,07:30,08:30,Đón bé,pickup,,Sân trường\n';

// Utility helper to filter empty activityName items and remove duplicate time slots per day
const filterAndUniqueSchedules = (items: WeeklyScheduleDetail[]): WeeklyScheduleDetail[] => {
  const seen = new Set<string>();
  return (items || []).filter((it) => {
    if (!it.activityName || !it.activityName.trim()) {
      return false;
    }
    const key = `${it.dayOfWeek}-${it.startTime.slice(0, 5)}-${it.endTime.slice(0, 5)}-${it.activityName.trim()}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

// Error Boundary to prevent render crashes when schedule details or menu formats are invalid
class WeeklyScheduleErrorBoundary extends React.Component<
  { children: React.ReactNode; itemsByDay: any; currentWeek: any },
  { hasError: boolean; error: Error | null; errorInfo: React.ErrorInfo | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });
    console.error('[WeeklyScheduleErrorBoundary] Render error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '24px',
          background: '#FFF5F5',
          border: '2px solid #FEB2B2',
          borderRadius: '12px',
          margin: '20px 0',
          color: '#C53030',
          fontFamily: 'monospace'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold' }}>
            ⚠️ Lỗi hiển thị Thời khóa biểu (Render Error Boundary)
          </h3>
          <p style={{ margin: '0 0 15px 0', fontSize: '14px' }}>
            Component gặp lỗi crash khi render. Xem thông tin gỡ lỗi bên dưới:
          </p>
          <div style={{ background: '#1A202C', color: '#A0AEC0', padding: '16px', borderRadius: '8px', overflow: 'auto', maxHeight: '300px', fontSize: '12px' }}>
            <div style={{ color: '#F56565', fontWeight: 'bold', marginBottom: '8px' }}>
              Error: {this.state.error?.toString()}
            </div>
            <div style={{ whiteSpace: 'pre-wrap', marginBottom: '16px' }}>
              {this.state.errorInfo?.componentStack}
            </div>
            <div style={{ borderTop: '1px solid #4A5568', paddingTop: '12px' }}>
              <div style={{ color: '#ED8936', fontWeight: 'bold', marginBottom: '4px' }}>Dump State / Data:</div>
              <pre>{JSON.stringify({
                currentWeek: this.props.currentWeek,
                itemsByDayCount: Object.keys(this.props.itemsByDay || {}).reduce((acc: any, key) => {
                  acc[key] = this.props.itemsByDay[key]?.length || 0;
                  return acc;
                }, {})
              }, null, 2)}</pre>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              background: '#E53E3E',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Tải lại trang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const WeeklyScheduleView: React.FC = () => {
  const { data: classes, isLoading: isLoadingClasses } = useTeacherClasses();
  const [activeClassId, setActiveClassId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (classes && classes.length > 0 && activeClassId === undefined) {
      setActiveClassId(classes[0].classId);
    }
  }, [classes, activeClassId]);

  const {
    classId,
    className,
    currentMonth,
    setCurrentMonth,
    prevMonth,
    nextMonth,
    monthTheme,
    setMonthTheme,
    monthlySchedule,
    weeksInMonth,
    selectedWeek,
    setSelectedWeek,
    weekTheme,
    setWeekTheme,
    currentWeek,
    itemsByDay,
    todayWeekOrder,
    todayDayOfWeek,
    isPastDay,
    isLoading,
    isSaving,
    toasts,
    saveMonthlySchedule,
    saveWeeklySchedule,
    addItem,
    removeItem,
    updateItem,
    csvPreview,
    csvModalOpen,
    setCsvModalOpen,
    isImporting,
    openCSVPreview,
    confirmImportCSV,
    clearCsvPreview,
    refresh: fetchMonthlySchedule,
  } = useWeeklySchedule(activeClassId);

  // Hook to fetch and compare API payloads for debugging
  useEffect(() => {
    if (!activeClassId) return;
    const verifyApis = async () => {
      try {
        const scheduleUrl = `/teacher/classes/${activeClassId}/schedule`;
        const menuUrl = `/teacher/classes/${activeClassId}/menu`;
        
        console.log(`[API Verification] Fetching schedule from: ${scheduleUrl}`);
        console.log(`[API Verification] Fetching menu from: ${menuUrl}`);
        
        const [scheduleRes, menuRes] = await Promise.all([
          apiClient.get(scheduleUrl).catch(e => ({ data: { data: null } })),
          apiClient.get(menuUrl).catch(e => ({ data: { data: null } }))
        ]);
        
        const scheduleData = scheduleRes.data?.data;
        const menuData = menuRes.data?.data;
        
        console.log('[API Verification] Weekly Schedule Payload:', scheduleData);
        console.log('[API Verification] Menu Payload:', menuData);
        
        let scheduleId = null;
        if (scheduleData) {
          if (Array.isArray(scheduleData)) {
            scheduleId = scheduleData[0]?.weeklyScheduleId || scheduleData[0]?.id;
          } else {
            scheduleId = scheduleData.weeklyScheduleId || scheduleData.id;
          }
        }

        let menuScheduleId = null;
        if (menuData) {
          if (Array.isArray(menuData)) {
            menuScheduleId = menuData[0]?.weeklyScheduleId || menuData[0]?.id;
          } else {
            menuScheduleId = menuData.weeklyScheduleId || menuData.id;
          }
        }
        
        console.log(`[API Verification] Schedule WeeklyScheduleID: ${scheduleId}`);
        console.log(`[API Verification] Menu WeeklyScheduleID: ${menuScheduleId}`);
        
        if (scheduleId && menuScheduleId) {
          if (String(scheduleId) === String(menuScheduleId)) {
            console.log('%c[API Verification] SUCCESS: WeeklyScheduleIDs match between Schedule and Menu APIs!', 'color: #10B981; font-weight: bold;');
          } else {
            console.warn('[API Verification] WARNING: WeeklyScheduleIDs DO NOT match between Schedule and Menu APIs!');
          }
        } else {
          console.log('[API Verification] Info: One or both APIs returned empty weekly schedule ID references.');
        }
      } catch (err) {
        console.error('[API Verification] Error during verification:', err);
      }
    };
    verifyApis();
  }, [activeClassId]);

  // ── Item modal state (add new activity inline) ──────────────────────────
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EditItem | null>(null);
  const [editingDay, setEditingDay] = useState<SchoolDay>('Monday');
  const [editingId, setEditingId] = useState<number | null>(null);

  const openAddItem = (day: SchoolDay) => {
    const dayItems = itemsByDay[day] || [];
    setEditingDay(day);
    setEditingId(null);
    setEditingItem({
      dayOfWeek: day,
      startTime: '09:00',
      endTime: '10:00',
      activityName: '',
      activityType: 'study',
      details: '',
      location: '',
    });
    setItemModalOpen(true);
  };

  const openEditItem = (item: WeeklyScheduleDetail) => {
    setEditingDay(item.dayOfWeek as SchoolDay);
    setEditingId(item.scheduleDetailId ?? null);
    setEditingItem({
      dayOfWeek: item.dayOfWeek as SchoolDay,
      startTime: item.startTime.slice(0, 5),
      endTime: item.endTime.slice(0, 5),
      activityName: item.activityName,
      activityType: item.activityType,
      details: item.details || '',
      location: item.location || '',
    });
    setItemModalOpen(true);
  };

  const handleItemSave = (payload: EditItem) => {
    const itemPayload = {
      dayOfWeek: payload.dayOfWeek,
      startTime: payload.startTime,
      endTime: payload.endTime,
      activityName: payload.activityName,
      activityType: payload.activityType,
      details: payload.details || null,
      location: payload.location || null,
    };
    if (editingId !== null) {
      updateItem(editingDay, editingId, itemPayload);
    } else {
      addItem(editingDay, itemPayload);
    }
    setItemModalOpen(false);
    setEditingItem(null);
    setEditingId(null);
  };

  // Adapter: ItemModal expects an EditingItem shape (with orderIndex) where
  // dayOfWeek is DayOfWeek (Mon-Sun). We narrow back to SchoolDay when saving.
  // Cast through unknown because ItemModal's onUpdate patch widens dayOfWeek.
  const itemModalItem = editingItem
    ? ({ ...editingItem, orderIndex: (itemsByDay[editingDay]?.length || 0) + 1 } as unknown as Parameters<typeof ItemModal>[0]['item'])
    : null;

  // ── CSV upload state ────────────────────────────────────────────────────
  const csvInputRef = useRef<HTMLInputElement>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleCsvSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFile(file);
    await openCSVPreview(file);
    if (csvInputRef.current) csvInputRef.current.value = '';
  };

  const handleConfirmImport = async () => {
    if (!csvFile) return;
    await confirmImportCSV(csvFile);
    setCsvFile(null);
  };

  const handleCancelPreview = () => {
    clearCsvPreview();
    setCsvFile(null);
  };

  const downloadCsvTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weekly_schedule_template_${currentMonth.year}_${currentMonth.month}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Confirm dialog state (delete) ────────────────────────────────────────
  const [confirmDelete, setConfirmDelete] = useState<{ scheduleDetailId: number; day: SchoolDay } | null>(null);

  return (
    <S.Container>
      {/* HERO */}
      <S.HeroSection>
        <S.HeroBgOverlay />
        <S.HeroContent>
          <S.HeroText>
            <S.HeroSubtitle>📅 Thời khóa biểu</S.HeroSubtitle>
            <S.HeroTitle>{MONTH_NAMES[currentMonth.month - 1]} / {currentMonth.year}</S.HeroTitle>
            <S.HeroStats>
              <S.HeroDivider />
              <S.HeroWeekLabel>{weeksInMonth.length} tuần</S.HeroWeekLabel>
              <S.HeroDivider />
              {monthlySchedule ? (
                <S.StatusBadge $color="#065F46" $bg="#D1FAE5">
                  <S.StatusDot $color="#10B981" />
                  Đã tạo
                </S.StatusBadge>
              ) : (
                <S.StatusBadge $color="#92400E" $bg="#FEF3C7">
                  <S.StatusDot $color="#F59E0B" />
                  Chưa tạo
                </S.StatusBadge>
              )}
            </S.HeroStats>
          </S.HeroText>
          <S.HeroActions>
            <button
              type="button"
              onClick={prevMonth}
              style={navBtnStyle}
              aria-label="Tháng trước"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              style={navBtnStyle}
              aria-label="Tháng sau"
            >
              <ChevronRight size={18} />
            </button>
          </S.HeroActions>
        </S.HeroContent>
      </S.HeroSection>

      {/* TOP FORM: chủ đề tháng + lớp + lưu */}
      <S.FormCard>
        <S.FormHeader>
          <S.FormTitle>
            <Calendar size={18} /> Thông tin tháng
          </S.FormTitle>
          <S.FormSubtitle>
            Lớp: <strong>{className}</strong> · Niên khóa đang hoạt động
          </S.FormSubtitle>
        </S.FormHeader>

        <S.FormGrid>
          <S.FormField>
            <label>Tháng</label>
            <select
              value={currentMonth.month}
              onChange={(e) =>
                setCurrentMonth((prev) => ({
                  ...prev,
                  month: Number(e.target.value),
                }))
              }
            >
              {MONTH_NAMES.map((name, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {name}
                </option>
              ))}
            </select>
          </S.FormField>

          <S.FormField>
            <label>Năm</label>
            <input
              type="number"
              value={currentMonth.year}
              onChange={(e) =>
                setCurrentMonth((prev) => ({
                  ...prev,
                  year: Number(e.target.value),
                }))
              }
              min={2020}
              max={2100}
            />
          </S.FormField>

          <S.FormField style={{ gridColumn: 'span 2' }}>
            <label>Chủ đề tháng *</label>
            <input
              type="text"
              placeholder="VD: Mùa Hè Rực Rỡ & Khám Phá Đại Dương"
              value={monthTheme}
              onChange={(e) => setMonthTheme(e.target.value)}
              maxLength={255}
            />
          </S.FormField>

          <S.FormActions>
            <S.PrimaryButton
              type="button"
              onClick={saveMonthlySchedule}
              disabled={isSaving || !monthTheme.trim()}
            >
              <Save size={16} /> {isSaving ? 'Đang lưu...' : 'Lưu thông tin tháng'}
            </S.PrimaryButton>
          </S.FormActions>
        </S.FormGrid>
      </S.FormCard>

      {/* WEEK SELECTOR + theme + actions */}
      <S.FormCard>
        <S.FormHeader>
          <S.FormTitle>
            <FileSpreadsheet size={18} /> Thời khóa biểu tuần
          </S.FormTitle>
          <S.FormSubtitle>
            {weeksInMonth.length === 0
              ? 'Tháng này không có tuần hợp lệ'
              : `Chọn tuần và nhập chủ đề. Upload CSV cho cả tuần hoặc thêm từng hoạt động.`}
          </S.FormSubtitle>
        </S.FormHeader>

        <S.FormGrid>
          <S.FormField>
            <label>Tuần</label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
              disabled={weeksInMonth.length === 0}
            >
              {weeksInMonth.map((w) => (
                <option key={w.weekOrder} value={w.weekOrder}>
                  {w.weekOrder === todayWeekOrder ? `${w.label} (Hôm nay)` : w.label}
                </option>
              ))}
            </select>
          </S.FormField>

          <S.FormField style={{ gridColumn: 'span 3' }}>
            <label>Chủ đề tuần *</label>
            <input
              type="text"
              placeholder="VD: Tuần 1: Làm quen với biển cả"
              value={weekTheme}
              onChange={(e) => setWeekTheme(e.target.value)}
              maxLength={255}
            />
          </S.FormField>

          <S.FormActions>
            <S.SecondaryButton type="button" onClick={downloadCsvTemplate}>
              <Download size={16} /> Tải CSV mẫu
            </S.SecondaryButton>
            <S.SecondaryButton
              type="button"
              onClick={() => csvInputRef.current?.click()}
              disabled={!monthlySchedule}
              title={!monthlySchedule ? 'Vui lòng lưu thông tin tháng trước' : ''}
            >
              <Upload size={16} /> Upload CSV
            </S.SecondaryButton>
            <input
              ref={csvInputRef}
              type="file"
              accept=".csv"
              onChange={handleCsvSelected}
              style={{ display: 'none' }}
            />
            <S.PrimaryButton
              type="button"
              onClick={saveWeeklySchedule}
              disabled={isSaving || !monthlySchedule || !weekTheme.trim()}
            >
              <Save size={16} /> {isSaving ? 'Đang lưu...' : 'Lưu tuần'}
            </S.PrimaryButton>
          </S.FormActions>
        </S.FormGrid>
      </S.FormCard>

      {/* 5-day board */}
      {isLoading ? (
        <S.EmptyState>Đang tải thời khóa biểu...</S.EmptyState>
      ) : !monthlySchedule ? (
        <S.EmptyState>
          Chưa có thời khóa biểu cho tháng này. Hãy nhập chủ đề tháng và bấm "Lưu thông tin tháng" để bắt đầu.
        </S.EmptyState>
      ) : (
        <WeeklyScheduleErrorBoundary itemsByDay={itemsByDay} currentWeek={currentWeek}>
          <S.Board>
            {SCHOOL_DAYS.map((day) => {
              const dayIsPast = isPastDay(day.key);
              return (
              <S.DayColumn key={day.key} $isPast={dayIsPast}>
                <S.DayHeader>
                  <S.DayTitle $isToday={selectedWeek === todayWeekOrder && day.key === todayDayOfWeek}>
                    {day.label}
                    {selectedWeek === todayWeekOrder && day.key === todayDayOfWeek && (
                      <S.TodayBadge>Hôm nay</S.TodayBadge>
                    )}
                  </S.DayTitle>
                  <S.AddButton type="button" $isPast={dayIsPast} onClick={() => openAddItem(day.key)} title={`Thêm hoạt động ${day.label}`}>
                    <Plus size={14} />
                  </S.AddButton>
                </S.DayHeader>
                <S.DayBody>
                  {(() => {
                    const filtered = filterAndUniqueSchedules(itemsByDay[day.key] || []);
                    if (filtered.length === 0) {
                      return <S.EmptyDay>Chưa có hoạt động</S.EmptyDay>;
                    }
                    return filtered.map((it) => (
                      <S.ItemCard key={it.scheduleDetailId} $color={ACTIVITY_TYPE_COLORS[it.activityType]} $isPast={dayIsPast}>
                        <S.ItemHeader>
                          <S.ItemTime>
                            {it.startTime.slice(0, 5)} - {it.endTime.slice(0, 5)}
                          </S.ItemTime>
                          <S.ItemIcon>{ACTIVITY_ICONS[it.activityType]}</S.ItemIcon>
                        </S.ItemHeader>
                        <S.ItemTitle>{it.activityName}</S.ItemTitle>
                        <S.ItemType $color={ACTIVITY_TYPE_COLORS[it.activityType]}>
                          {ACTIVITY_TYPE_LABELS[it.activityType]}
                        </S.ItemType>
                        {it.details ? <S.ItemDetails>{it.details}</S.ItemDetails> : null}
                        {it.location ? <S.ItemLocation>📍 {it.location}</S.ItemLocation> : null}
                        {it.scheduleDetailId && !dayIsPast ? (
                          <S.ItemActions>
                            <S.ItemEditBtn
                              type="button"
                              onClick={() => openEditItem(it)}
                              title="Sửa"
                            >
                              <Pencil size={14} />
                            </S.ItemEditBtn>
                            <S.ItemDeleteBtn
                              type="button"
                              onClick={() =>
                                setConfirmDelete({ scheduleDetailId: it.scheduleDetailId!, day: day.key })
                              }
                              title="Xóa"
                            >
                              <Trash2 size={14} />
                            </S.ItemDeleteBtn>
                          </S.ItemActions>
                        ) : null}
                      </S.ItemCard>
                    ));
                  })()}
                </S.DayBody>
              </S.DayColumn>
              );
            })}
          </S.Board>
        </WeeklyScheduleErrorBoundary>
      )}

      {/* Item modal */}
      {itemModalOpen && editingItem && itemModalItem && (
        <ItemModal
          isOpen={itemModalOpen}
          editId={editingId}
          item={itemModalItem}
          onClose={() => setItemModalOpen(false)}
          onSave={() => handleItemSave(editingItem)}
          onUpdate={(patch) =>
            setEditingItem((prev) => (prev ? ({ ...prev, ...patch } as EditItem) : prev))
          }
        />
      )}

      {/* CSV Preview Modal */}
      {csvModalOpen && csvPreview && (
        <S.ModalBackdrop onClick={handleCancelPreview}>
          <S.ModalBox onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>Xem trước CSV</S.ModalTitle>
              <S.ModalCloseBtn type="button" onClick={handleCancelPreview}>
                <X size={18} />
              </S.ModalCloseBtn>
            </S.ModalHeader>
            <S.ModalBody>
              {csvPreview.errors.length > 0 && (
                <S.ErrorBox>
                  <strong>⚠️ Lỗi ({csvPreview.errors.length}):</strong>
                  <ul>
                    {csvPreview.errors.slice(0, 10).map((err: string, idx: number) => (
                      <li key={idx}>{err}</li>
                    ))}
                    {csvPreview.errors.length > 10 && <li>... và {csvPreview.errors.length - 10} lỗi khác</li>}
                  </ul>
                </S.ErrorBox>
              )}
              <S.PreviewSummary>
                Tổng: <strong>{csvPreview.totalRows}</strong> dòng hợp lệ ·{' '}
                <strong>{Object.keys(csvPreview.byWeek).length}</strong> tuần
              </S.PreviewSummary>
              {Object.entries(csvPreview.byWeek).map(([week, items]: [string, any]) => (
                <S.PreviewWeekBlock key={week}>
                  <S.PreviewWeekTitle>Tuần {week} · {items.length} hoạt động</S.PreviewWeekTitle>
                  {items.slice(0, 5).map((it: any, idx: number) => (
                    <S.PreviewRow key={idx}>
                      <strong>{it.dayOfWeek}</strong> {it.startTime.slice(0, 5)}-
                      {it.endTime.slice(0, 5)} · {it.activityName}
                    </S.PreviewRow>
                  ))}
                  {items.length > 5 && <S.PreviewRow>... +{items.length - 5} hoạt động khác</S.PreviewRow>}
                </S.PreviewWeekBlock>
              ))}
            </S.ModalBody>
            <S.ModalFooter>
              <S.SecondaryButton type="button" onClick={handleCancelPreview}>
                Hủy
              </S.SecondaryButton>
              <S.PrimaryButton
                type="button"
                onClick={handleConfirmImport}
                disabled={isImporting || csvPreview.totalRows === 0}
              >
                {isImporting ? 'Đang import...' : `Import ${csvPreview.totalRows} dòng`}
              </S.PrimaryButton>
            </S.ModalFooter>
          </S.ModalBox>
        </S.ModalBackdrop>
      )}

      {/* Confirm delete */}
      {confirmDelete && (
        <ConfirmDialog
          title="Xóa hoạt động?"
          message="Hoạt động sẽ bị xóa khi bạn lưu tuần."
          confirmText="Xóa"
          cancelText="Hủy"
          variant="danger"
          onConfirm={() => {
            if (confirmDelete) {
              removeItem(confirmDelete.day, confirmDelete.scheduleDetailId);
            }
            setConfirmDelete(null);
          }}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {/* Toasts */}
      <S.ToastContainer>
        {toasts.map((t) => (
          <S.Toast key={t.id} $variant={t.variant}>
            {t.text}
          </S.Toast>
        ))}
      </S.ToastContainer>
    </S.Container>
  );
};

const navBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  border: '1.5px solid rgba(255,255,255,0.4)',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.1)',
  color: 'white',
  cursor: 'pointer',
};