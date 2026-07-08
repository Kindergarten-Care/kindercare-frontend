'use client';

import React, { useEffect } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Send,
  Trash2,
  Undo2,
  Upload,
  XCircle,
} from 'lucide-react';
import { useWeeklySchedule } from './hooks/useWeeklySchedule';
import { CSVImportModal } from './components/CSVImportModal';
import { ItemModal } from './components/ItemModal';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import {
  ACTIVITY_TYPE_LABELS,
  ACTIVITY_TYPE_COLORS,
  STATUS_COLORS,
  STATUS_LABELS,
  DAY_LABELS,
} from '@/config/types/weeklySchedule';
import * as S from './styles';
import type { SchoolDay } from '@/config/types/weeklySchedule';

const SCHOOL_DAYS: SchoolDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const ACTIVITY_ICONS: Record<string, string> = {
  pickup: '👋',
  meal: '🍽️',
  study: '📚',
  nap: '😴',
  play: '🎮',
  dropoff: '👋',
  other: '📌',
};

const MONTH_NAMES = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
  'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
  'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

export function WeeklyScheduleView() {
  const {
    monthlySchedule,
    weeksInMonth,
    selectedWeekOrder,
    setSelectedWeekOrder,
    weekTheme,
    setWeekTheme,
    currentWeekSchedule,
    itemsByDay,
    currentMonth,
    isLoading,
    isSaving,
    canSubmit,
    canWithdraw,
    weekStatus,
    modalOpen,
    editItem,
    editingItemId,
    csvModalOpen,
    csvPreview,
    isImporting,
    toasts,
    classId,
    fetchMonthlySchedule,
    saveMonthlySchedule,
    saveWeek,
    submitWeek,
    withdrawWeek,
    deleteWeek,
    openAddItem,
    openEditItem,
    closeModal,
    saveItem,
    deleteItem,
    updateEditItem,
    openCsvModal,
    closeCsvModal,
    previewCSV,
    importCSV,
    downloadCSVTemplate,
    showToast,
    prevMonth,
    nextMonth,
    SCHOOL_DAYS: DAYS,
  } = useWeeklySchedule();

  useEffect(() => {
    fetchMonthlySchedule();
  }, [fetchMonthlySchedule]);

  // Local form state for MS
  const [monthThemeInput, setMonthThemeInput] = React.useState('');
  const [monthlySaving, setMonthlySaving] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState<number | null>(null);

  useEffect(() => {
    setMonthThemeInput(monthlySchedule?.monthTheme || '');
  }, [monthlySchedule?.monthTheme]);

  const handleSaveMS = async () => {
    if (!monthThemeInput.trim()) {
      showToast('Vui lòng nhập chủ đề tháng', 'warning');
      return;
    }
    setMonthlySaving(true);
    try {
      await saveMonthlySchedule(monthThemeInput);
    } finally {
      setMonthlySaving(false);
    }
  };

  const handleSaveWeekLocal = async () => {
    await saveWeek();
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDayDate = (day: SchoolDay): Date => {
    const week = weeksInMonth.find(w => w.order === selectedWeekOrder);
    if (!week) return new Date();
    const dayIndex = DAYS.findIndex(d => d.key === day);
    const d = new Date(week.startDate);
    d.setDate(week.startDate.getDate() + dayIndex);
    return d;
  };

  const getDayStatus = (day: SchoolDay): 'past' | 'today' | 'future' => {
    const dayDate = getDayDate(day);
    dayDate.setHours(0, 0, 0, 0);
    if (dayDate < today) return 'past';
    if (dayDate.getTime() === today.getTime()) return 'today';
    return 'future';
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  const statusBg = (s: number) => {
    if (s === 2) return '#D1FAE5';
    if (s === 1) return '#FEF3C7';
    return '#E5E7EB';
  };
  const statusColor = (s: number) => {
    if (s === 2) return '#065F46';
    if (s === 1) return '#92400E';
    return '#374151';
  };

  const msStatusBadge = monthlySchedule ? (
    <S.StatusBadge
      $color={statusColor(monthlySchedule.approvedStatus)}
      $bg={statusBg(monthlySchedule.approvedStatus)}
    >
      <S.StatusDot $color={STATUS_COLORS[monthlySchedule.approvedStatus]} />
      {monthlySchedule.approvedStatus === 1 ? 'Đã duyệt' : 'Nháp'}
    </S.StatusBadge>
  ) : null;

  const weekStatusBadge = currentWeekSchedule ? (
    <S.StatusBadge
      $color={statusColor(weekStatus)}
      $bg={statusBg(weekStatus)}
    >
      <S.StatusDot $color={STATUS_COLORS[weekStatus]} />
      {STATUS_LABELS[weekStatus] || 'Nháp'}
    </S.StatusBadge>
  ) : null;

  return (
    <S.Container>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
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
              {msStatusBadge}
            </S.HeroStats>
          </S.HeroText>
          <S.HeroActions>
            <button
              type="button"
              onClick={prevMonth}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, border: '1.5px solid rgba(255,255,255,0.4)',
                borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: 'white',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, border: '1.5px solid rgba(255,255,255,0.4)',
                borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: 'white',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </S.HeroActions>
        </S.HeroContent>
      </S.HeroSection>

      {/* ── MS FORM ─────────────────────────────────────────────────────── */}
      <div style={{
        background: 'white', borderRadius: 12, padding: 20, marginBottom: 16,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white', padding: '2px 10px', borderRadius: 20,
            fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
          }}>
            MS
          </span>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#1a202c' }}>
            Thông tin tháng
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 12, alignItems: 'end' }}>
          <div>
            <S.FieldLabel>Tháng / Năm</S.FieldLabel>
            <S.SelectInput
              value={`${currentMonth.year}-${currentMonth.month}`}
              onChange={(e) => {
                const [y, m] = e.target.value.split('-').map(Number);
                // trigger week recalc via hook — handled by prev/next buttons
              }}
              style={{ cursor: 'default' }}
            >
              <option>{MONTH_NAMES[currentMonth.month - 1]} / {currentMonth.year}</option>
            </S.SelectInput>
          </div>
          <div>
            <S.FieldLabel>Chủ đề tháng</S.FieldLabel>
            <S.TextInput
              value={monthThemeInput}
              onChange={(e) => setMonthThemeInput(e.target.value)}
              placeholder="Nhập chủ đề tháng (VD: Mùa hè xanh)"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 12, color: '#718096' }}>
              {weeksInMonth.length} tuần trong tháng
            </span>
            <S.SaveBtn
              type="button"
              onClick={handleSaveMS}
              disabled={monthlySaving}
              style={{ whiteSpace: 'nowrap' }}
            >
              {monthlySaving ? 'Đang lưu...' : 'Lưu tháng'}
            </S.SaveBtn>
          </div>
        </div>
      </div>

      {/* ── WEEK SELECTOR + WS DETAIL ────────────────────────────────────── */}
      <div style={{
        background: 'white', borderRadius: 12, padding: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        {/* WS Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{
            background: '#10B981', color: 'white', padding: '2px 10px',
            borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
          }}>
            WS
          </span>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#1a202c' }}>
            Thời khóa biểu tuần
          </span>
        </div>

        {/* Week Selector Row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '200px 1fr auto', gap: 12,
          alignItems: 'end', marginBottom: 16,
        }}>
          <div>
            <S.FieldLabel>Chọn tuần</S.FieldLabel>
            <S.SelectInput
              value={selectedWeekOrder}
              onChange={(e) => setSelectedWeekOrder(Number(e.target.value))}
            >
              {weeksInMonth.map(w => (
                <option key={w.order} value={w.order}>
                  {w.label}
                </option>
              ))}
            </S.SelectInput>
          </div>
          <div>
            <S.FieldLabel>Chủ đề tuần</S.FieldLabel>
            <S.TextInput
              value={weekTheme}
              onChange={(e) => setWeekTheme(e.target.value)}
              placeholder="Nhập chủ đề tuần (VD: Khám phá thiên nhiên)"
            />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {weekStatusBadge}
          </div>
        </div>

        {/* WS Action Buttons */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          <S.ImportBtn type="button" onClick={openCsvModal}>
            <Upload size={15} /> Import CSV
          </S.ImportBtn>
          <S.SecondaryBtn type="button" onClick={() => downloadCSVTemplate(selectedWeekOrder)}>
            <Download size={15} /> Tải file CSV mẫu
          </S.SecondaryBtn>
          <S.PrimaryBtn
            type="button"
            onClick={handleSaveWeekLocal}
            disabled={isSaving}
          >
            Lưu tuần
          </S.PrimaryBtn>
          {canSubmit && (
            <S.SubmitBtn
              type="button"
              onClick={submitWeek}
              disabled={isSaving}
            >
              <Send size={15} /> Gửi duyệt
            </S.SubmitBtn>
          )}
          {canWithdraw && (
            <S.SecondaryBtn type="button" onClick={withdrawWeek} disabled={isSaving}>
              <Undo2 size={15} /> Rút lại
            </S.SecondaryBtn>
          )}
          {currentWeekSchedule && weekStatus === 0 && (
            <button
              type="button"
              onClick={() => setDeleteConfirm(currentWeekSchedule.weeklyScheduleId)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 16px', background: '#FEE2E2', color: '#DC2626',
                border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600,
                cursor: 'pointer', marginLeft: 'auto',
              }}
            >
              <Trash2 size={15} /> Xóa tuần
            </button>
          )}
        </div>

        {/* 5-Column Board */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#718096' }}>
            Đang tải thời khóa biểu...
          </div>
        ) : !monthlySchedule ? (
          <S.EmptyState>
            <Calendar size={48} style={{ color: '#CBD5E0', margin: '0 auto 16px' }} />
            <h3>Chưa có thời khóa biểu</h3>
            <p>Vui lòng lưu thông tin tháng trước, sau đó nhập dữ liệu từng tuần.</p>
          </S.EmptyState>
        ) : (
          <S.BoardGrid style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {DAYS.map(day => {
              const items = itemsByDay[day.key] || [];
              const dayStatus = getDayStatus(day.key);
              const isToday = dayStatus === 'today';
              const dayDate = getDayDate(day.key);

              return (
                <S.DayCol key={day.key} $isToday={isToday} $dayStatus={dayStatus}>
                  {/* Day Header */}
                  <S.DayColHead>
                    <div>
                      <S.DayName $isToday={isToday}>
                        {day.label}
                        {isToday && <S.TodayTag style={{ marginLeft: 6 }}>Hôm nay</S.TodayTag>}
                        {dayStatus === 'past' && <S.PastTag style={{ marginLeft: 6 }}>Đã qua</S.PastTag>}
                      </S.DayName>
                      <S.DayDate>{pad(dayDate.getDate())}/{pad(dayDate.getMonth() + 1)}</S.DayDate>
                    </div>
                  </S.DayColHead>

                  {/* Activity List */}
                  <S.ActivityList>
                    {items.length === 0 ? (
                      <div style={{
                        textAlign: 'center', padding: '16px 8px',
                        color: '#A0AEC0', fontSize: 12,
                      }}>
                        Không có hoạt động
                      </div>
                    ) : (
                      items.map((item) => (
                        <S.ActivityCard
                          key={item.scheduleDetailId || item.orderIndex}
                          $typeColor={ACTIVITY_TYPE_COLORS[item.activityType]}
                          $dayStatus={dayStatus}
                          onClick={() => openEditItem(item)}
                        >
                          <S.ActivityTime>
                            {item.startTime.slice(0, 5)} - {item.endTime.slice(0, 5)}
                          </S.ActivityTime>
                          <S.ActivityName>
                            {ACTIVITY_ICONS[item.activityType] || '📌'} {item.activityName}
                          </S.ActivityName>
                          {item.details && (
                            <S.ActivityDetails>{item.details}</S.ActivityDetails>
                          )}
                          {item.location && (
                            <div style={{ fontSize: 10, color: '#A0AEC0', marginTop: 2 }}>
                              📍 {item.location}
                            </div>
                          )}
                        </S.ActivityCard>
                      ))
                    )}
                  </S.ActivityList>

                  {/* Add Button */}
                  <S.AddActivityBtn type="button" onClick={() => openAddItem(day.key)}>
                    <Plus size={14} /> Thêm hoạt động
                  </S.AddActivityBtn>
                </S.DayCol>
              );
            })}
          </S.BoardGrid>
        )}
      </div>

      {/* ── ITEM MODAL ──────────────────────────────────────────────────── */}
      <ItemModal
        isOpen={modalOpen}
        editId={editingItemId}
        item={editItem}
        onClose={closeModal}
        onSave={saveItem}
        onUpdate={updateEditItem}
        onDelete={deleteItem}
      />

      {/* ── CSV IMPORT MODAL ─────────────────────────────────────────────── */}
      <CSVImportModal
        isOpen={csvModalOpen}
        preview={csvPreview}
        isImporting={isImporting}
        onClose={closeCsvModal}
        onPreview={previewCSV}
        onImport={importCSV}
      />

      {/* ── DELETE CONFIRM ──────────────────────────────────────────────── */}
      <ConfirmDialog
        isOpen={deleteConfirm !== null}
        title="Xóa thời khóa biểu tuần"
        message="Bạn có chắc muốn xóa thời khóa biểu tuần này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        variant="danger"
        onConfirm={async () => {
          if (deleteConfirm !== null) {
            await deleteWeek(deleteConfirm);
            setDeleteConfirm(null);
          }
        }}
        onCancel={() => setDeleteConfirm(null)}
      />

      {/* ── TOASTS ──────────────────────────────────────────────────────── */}
      <S.ToastStack>
        {toasts.map(toast => (
          <S.ToastItem key={toast.id} $variant={toast.variant}>
            {toast.text}
          </S.ToastItem>
        ))}
      </S.ToastStack>
    </S.Container>
  );
}
