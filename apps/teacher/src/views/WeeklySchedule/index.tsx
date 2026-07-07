'use client';

import React, { useEffect, useCallback, useState } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Edit2,
  Plus,
  Send,
  Trash2,
  Undo2,
  Upload,
  XCircle,
  Eye,
} from 'lucide-react';
import { useWeeklySchedule } from './hooks/useWeeklySchedule';
import { CSVImportModal } from './components/CSVImportModal';
import { ImportHistoryModal } from './components/ImportHistoryModal';
import { ItemModal } from './components/ItemModal';
import { ChangeRequestModal } from './components/ChangeRequestModal';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { SkeletonBoardLoader } from '@/components/SkeletonLoader';
import { useTeacherClasses } from '@/hooks/useTeacherQueries';
import {
  ACTIVITY_TYPE_LABELS,
  ACTIVITY_TYPE_COLORS,
  STATUS_COLORS,
  STATUS_LABELS,
} from '@/config/types/weeklySchedule';
import * as S from './styles';
import type { SchoolDay, ActivityType, WeeklyScheduleStatus, WeeklyScheduleItem } from '@/config/types/weeklySchedule';

const ACTIVITY_ICONS: Record<ActivityType, string> = {
  pickup: '👋',
  meal: '🍽️',
  study: '📚',
  nap: '😴',
  play: '🎮',
  dropoff: '👋',
  other: '📌',
};

function statusColor(s: WeeklyScheduleStatus): { fg: string; bg: string } {
  const c = STATUS_COLORS[s];
  const bg = c + '1A';
  return { fg: c, bg };
}

export const WeeklyScheduleView: React.FC = () => {
  const { data: classes, isLoading: isLoadingClasses } = useTeacherClasses();
  const [activeClassId, setActiveClassId] = useState<number | undefined>(undefined);

  // Initialize activeClassId from first class
  useEffect(() => {
    if (classes && classes.length > 0 && activeClassId === undefined) {
      setActiveClassId(classes[0].classId);
    }
  }, [classes, activeClassId]);

  const {
    className,
    classId,
    templates,
    currentMonth,
    selectedWeek,
    currentTemplate,
    itemsByDay,
    isLoading,
    isSaving,
    modalOpen,
    editItem,
    editingItemId,
    toasts,
    csvPreview,
    csvModalOpen,
    isImporting,
    isImportLocked,
    importLockReason,
    reminder,
    importHistory,
    historyModalOpen,
    setHistoryModalOpen,
    isReadOnly,
    canEditDay,
    canEditItem,
    getDayStatus,
    requiresChangeRequest,
    hasPendingChange,
    captureChangeRequestSnapshot,
    submitChangeModalOpen,
    setSubmitChangeModalOpen,
    withdrawChangeModalOpen,
    setWithdrawChangeModalOpen,
    isSubmittingChange,
    isWithdrawingChange,
    confirmSubmitChange,
    confirmWithdrawChange,
    fetchTemplates,
    setSelectedWeek,
    prevMonth,
    nextMonth,
    openAddItem,
    openEditItem,
    closeModal,
    saveItem,
    updateEditItem,
    deleteItem,
    deleteTemplate,
    copyWeek,
    copyDay,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    submitForApproval,
    withdrawTemplate,
    openCsvImport,
    closeCsvModal,
    handleCsvPreview,
    handleCsvImport,
    downloadTemplate,
    showToast,
    DAYS,
    maxWeeksInMonth,
    weekDateRanges,
    selectedWeekRange,
    getDateForDayInWeek,
    openHistoryModal,
    closeHistoryModal,
  } = useWeeklySchedule(undefined, activeClassId);

  // Fetch on mount
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const monthLabel = `Tháng ${currentMonth.month}/${currentMonth.year}`;

  const status = currentTemplate?.status;
  const sc = status ? statusColor(status) : null;
  const canSubmit = status === 'Draft' || status === 'RevisionRequested';
  const canWithdraw = status === 'Submitted';

  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = React.useState<{
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    variant?: 'danger' | 'primary';
    onConfirm: () => void;
  }>({ open: false, title: '', message: '', onConfirm: () => {} });

  const [itemToDelete, setItemToDelete] = React.useState<number | null>(null);
  const [templateToDelete, setTemplateToDelete] = React.useState<number | null>(null);
  // Item modal view-only state: forced when opening past/today items,
  // or when opening future items of an already-Approved template.
  const [modalViewOnly, setModalViewOnly] = React.useState<boolean>(false);
  // Whether the modal should show the "change request" hint for future days
  // when the parent template is currently in Submitted status.
  const [modalChangeRequestHint, setModalChangeRequestHint] = React.useState<boolean>(false);

  // Compute modal flags for a given day when opening add/edit modal
  const computeModalFlags = useCallback((dayOfWeek: SchoolDay) => {
    const status = getDayStatus(dayOfWeek);
    const isLockedDay = status === 'past' || status === 'today';
    // Only past/today days are forced view-only. Approved templates still
    // allow editing future days (with a change-request hint).
    setModalViewOnly(isLockedDay);
    // Show the change-request hint whenever the parent template has been
    // sent/approved AND the user edits a future day.
    const isPending =
      currentTemplate?.status === 'Submitted' || currentTemplate?.status === 'Approved';
    setModalChangeRequestHint(status === 'future' && !!isPending);
  }, [currentTemplate, getDayStatus]);

  // Local handler: open the add item modal with viewOnly + change-request flags computed
  const handleOpenAddItem = useCallback((day: SchoolDay) => {
    computeModalFlags(day);
    openAddItem(day);
  }, [computeModalFlags, openAddItem]);

  // Local handler: open the edit item modal with viewOnly + change-request flags computed
  const handleOpenEditItem = useCallback((item: WeeklyScheduleItem) => {
    // Items are restricted to Mon-Fri at the UI level even though the wire type is broader
    const dayOfWeek = item.dayOfWeek as SchoolDay;
    computeModalFlags(dayOfWeek);
    // If opening a future-day item on an already-Approved/Submitted template,
    // capture a snapshot of the live items on the BE so the original schedule
    // is preserved before the teacher starts editing.
    if (currentTemplate?.templateId && requiresChangeRequest(dayOfWeek)) {
      captureChangeRequestSnapshot(
        currentTemplate.pendingChangeReason || 'Bản lưu tự động khi mở chỉnh sửa'
      );
    }
    openEditItem(item);
  }, [computeModalFlags, currentTemplate?.templateId, currentTemplate?.pendingChangeReason, captureChangeRequestSnapshot, openEditItem, requiresChangeRequest]);

  // Reset modal flags when closing
  const handleCloseModal = useCallback(() => {
    closeModal();
    setModalViewOnly(false);
    setModalChangeRequestHint(false);
  }, [closeModal]);

  // Handlers for confirmation dialogs
  const handleDeleteClick = (itemId: number) => {
    setItemToDelete(itemId);
    setTemplateToDelete(null);
    setConfirmDialog({
      open: true,
      title: 'Xóa hoạt động',
      message: 'Bạn có chắc muốn xóa hoạt động này không? Hành động này không thể hoàn tác.',
      confirmText: 'Xóa',
      variant: 'danger',
      onConfirm: () => {
        if (itemToDelete) deleteItem(itemToDelete);
        setConfirmDialog(prev => ({ ...prev, open: false }));
        setItemToDelete(null);
      },
    });
  };

  const handleDeleteTemplateClick = () => {
    if (!currentTemplate) return;
    setItemToDelete(null);
    setTemplateToDelete(currentTemplate.templateId);
    setConfirmDialog({
      open: true,
      title: 'Xóa thời khóa biểu',
      message: `Bạn có chắc muốn xóa toàn bộ thời khóa biểu "Tuần ${currentTemplate.weekNumber}" không? Hành động này không thể hoàn tác.`,
      confirmText: 'Xóa toàn bộ',
      variant: 'danger',
      onConfirm: () => {
        if (templateToDelete) deleteTemplate(templateToDelete);
        setConfirmDialog(prev => ({ ...prev, open: false }));
        setTemplateToDelete(null);
      },
    });
  };

  const handleWithdrawClick = () => {
    // Open the new withdraw modal so the teacher can choose to restore the
    // original schedule or keep the edits.
    withdrawTemplate();
  };

  // Get current day - only for school days (Mon-Fri)
  const today = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDayName = dayNames[today.getDay()];
  const isSchoolDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(todayDayName);
  const todayDayOfWeek = isSchoolDay ? todayDayName as SchoolDay : null;

  // Check if selected week contains today (compare date strings, not Date objects)
  // selectedWeekRange already provided by the hook
  const todayDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const startDateStr = selectedWeekRange ? `${selectedWeekRange.startDate.getFullYear()}-${String(selectedWeekRange.startDate.getMonth() + 1).padStart(2, '0')}-${String(selectedWeekRange.startDate.getDate()).padStart(2, '0')}` : '';
  const endDateStr = selectedWeekRange ? `${selectedWeekRange.endDate.getFullYear()}-${String(selectedWeekRange.endDate.getMonth() + 1).padStart(2, '0')}-${String(selectedWeekRange.endDate.getDate()).padStart(2, '0')}` : '';
  const isCurrentWeek = !!selectedWeekRange && todayDateStr >= startDateStr && todayDateStr <= endDateStr;

  // Only show "HÔM NAY" for today's column in current week

  return (
    <S.Container>
      {/* HERO */}
      <S.HeroSection>
        <S.HeroBgOverlay />
        <S.HeroContent>
          <S.HeroText>
            {/* Class Selector */}
            {classes && classes.length > 1 ? (
              <S.ClassSelectWrapper>
                <S.ClassSelect
                  value={activeClassId || ''}
                  onChange={(e) => setActiveClassId(Number(e.target.value))}
                >
                  {classes.map((cls) => (
                    <option key={cls.classId} value={cls.classId}>
                      {cls.displayName}
                    </option>
                  ))}
                </S.ClassSelect>
                <S.ClassSelectArrow>▼</S.ClassSelectArrow>
              </S.ClassSelectWrapper>
            ) : (
              <S.HeroSubtitle>{className} · Thời khóa biểu</S.HeroSubtitle>
            )}
            <S.HeroTitle>Soạn Thời khóa biểu</S.HeroTitle>
            <S.HeroStats>
              <S.HeroWeekLabel>{monthLabel}</S.HeroWeekLabel>
              {status && sc && (
                <>
                  <S.HeroDivider />
                  <S.StatusBadge $color={sc.fg} $bg={sc.bg}>
                    <S.StatusDot $color={sc.fg} />
                    {STATUS_LABELS[status]}
                  </S.StatusBadge>
                </>
              )}
            </S.HeroStats>
          </S.HeroText>

          <S.HeroActions>
            <S.ImportBtn
              type="button"
              onClick={openCsvImport}
              disabled={isImportLocked}
              title={isImportLocked ? importLockReason || 'Import bị khóa' : 'Import CSV'}
              style={isImportLocked ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              <Upload size={16} />
              Import CSV {isImportLocked && '🔒'}
            </S.ImportBtn>
            <S.SecondaryBtn type="button" onClick={downloadTemplate}>
              <Download size={16} />
              Tải mẫu CSV
            </S.SecondaryBtn>
            {currentTemplate && (status === 'Draft' || status === 'RevisionRequested') && (
              <S.SecondaryBtn
                type="button"
                onClick={handleDeleteTemplateClick}
                style={{ color: '#e53e3e', borderColor: '#fed7d7' }}
              >
                <Trash2 size={16} />
                Xóa tuần này
              </S.SecondaryBtn>
            )}
            {currentTemplate && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '4px 10px',
                borderRadius: 8,
                fontSize: 13,
              }}>
                <span style={{ fontSize: 12, opacity: 0.95 }}>→</span>
                <select
                  value=""
                  onChange={(e) => {
                    const targetWeek = parseInt(e.target.value);
                    if (targetWeek && confirm(`Sao chép tất cả hoạt động sang Tuần ${targetWeek}?`)) {
                      copyWeek(selectedWeek, targetWeek);
                    }
                  }}
                  style={{
                    padding: '4px 4px',
                    borderRadius: 4,
                    border: 'none',
                    fontSize: 13,
                    cursor: 'pointer',
                    outline: 'none',
                    background: 'transparent',
                    color: 'white',
                    fontWeight: 600,
                  }}
                >
                  <option value="" style={{ color: '#2d3748' }}>Sao chép sang...</option>
                  {Array.from({ length: maxWeeksInMonth }, (_, i) => i + 1)
                    .filter(w => w !== selectedWeek)
                    .map(w => (
                      <option key={w} value={w} style={{ color: '#2d3748' }}>Tuần {w}</option>
                    ))
                  }
                </select>
              </div>
            )}
            {currentTemplate && canSubmit && (
              <S.PrimaryBtn type="button" onClick={submitForApproval}>
                <Send size={16} />
                Gửi duyệt
              </S.PrimaryBtn>
            )}
            {currentTemplate && canWithdraw && (
              <S.SecondaryBtn type="button" onClick={handleWithdrawClick}>
                <Undo2 size={16} />
                Rút lại
              </S.SecondaryBtn>
            )}
          </S.HeroActions>
        </S.HeroContent>
      </S.HeroSection>

      {/* REMINDER BANNER */}
      {reminder && reminder.shouldRemind && (
        <S.ReadOnlyBanner style={{ background: '#FEF3C7', borderColor: '#F59E0B' }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <span>
            <strong>Nhắc nhở:</strong> {reminder.message}
          </span>
        </S.ReadOnlyBanner>
      )}

      {/* IMPORT LOCKED NOTICE */}
      {isImportLocked && (
        <S.ReadOnlyBanner style={{ background: '#FEE2E2', borderColor: '#EF4444' }}>
          <span style={{ fontSize: 18 }}>🔒</span>
          <span>
            <strong>Import bị khóa:</strong> {importLockReason}
          </span>
        </S.ReadOnlyBanner>
      )}

      {/* REVIEWER COMMENT */}
      {currentTemplate && currentTemplate.reviewerComment && (
        <S.ReviewNote>
          <strong>Phản hồi từ Hiệu trưởng:</strong>
          {currentTemplate.reviewerComment}
          {currentTemplate.reviewedById && (
            <> — <em>Đã duyệt</em></>
          )}
        </S.ReviewNote>
      )}

      {/* READ-ONLY BANNER */}
      {isReadOnly && (
        <S.ReadOnlyBanner>
          <Eye size={16} />
          Thời khóa biểu đang ở trạng thái <strong>{status && STATUS_LABELS[status]}</strong> — bạn chỉ có thể xem.
          {canWithdraw && (
            <button
              type="button"
              onClick={handleWithdrawClick}
              style={{
                marginLeft: 8,
                color: '#BE123C',
                fontWeight: 700,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Rút lại để sửa
            </button>
          )}
        </S.ReadOnlyBanner>
      )}

      {/* DAY-EDIT RULE INFO BANNER (only when template is editable) */}
      {currentTemplate && !isReadOnly && (
        <S.ReadOnlyBanner style={{ background: '#F0F9FF', borderColor: '#0EA5E9', color: '#075985' }}>
          <span style={{ fontSize: 16 }}>ℹ️</span>
          <span>
            <strong>Quy tắc chỉnh sửa:</strong> chỉ những ngày <strong>trong tương lai</strong> mới có thể thêm/sửa/xóa hoạt động.
            Ngày <strong>hôm nay</strong> và <strong>quá khứ</strong> chỉ xem.
          </span>
        </S.ReadOnlyBanner>
      )}

      {/* PENDING CHANGE REQUEST BANNER */}
      {currentTemplate && hasPendingChange(currentTemplate.templateId) && (
        <S.ReadOnlyBanner style={{ background: '#FEF3C7', borderColor: '#F59E0B', color: '#92400E' }}>
          <span style={{ fontSize: 16 }}>📨</span>
          <span>
            <strong>Đã ghi nhận yêu cầu cập nhật</strong> cho thời khóa biểu này. Hiệu trưởng sẽ nhận được thông báo để xử lý.
          </span>
        </S.ReadOnlyBanner>
      )}

      {/* TOOLBAR */}
      <S.Toolbar>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <S.MonthNav>
              <S.WeekNavBtn type="button" onClick={prevMonth}>
                <ChevronLeft size={16} />
              </S.WeekNavBtn>
              <S.MonthLabel>{monthLabel}</S.MonthLabel>
              <S.WeekNavBtn type="button" onClick={nextMonth}>
                <ChevronRight size={16} />
              </S.WeekNavBtn>
            </S.MonthNav>

            {/* Search input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Tìm kiếm hoạt động..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  fontSize: 13,
                  width: 200,
                  maxWidth: '100%',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {(searchQuery || filterType !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterType('all');
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#718096',
                    cursor: 'pointer',
                    fontSize: 12,
                  }}
                >
                  Xóa lọc
                </button>
              )}
            </div>
          </div>

          {/* Activity type filter buttons */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setFilterType('all')}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: `1.5px solid ${filterType === 'all' ? '#667eea' : '#e2e8f0'}`,
                background: filterType === 'all' ? '#667eea' : 'white',
                color: filterType === 'all' ? 'white' : '#718096',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Tất cả
            </button>
            {(['study', 'play', 'meal', 'nap'] as ActivityType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(filterType === type ? 'all' : type)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: `1.5px solid ${filterType === type ? '#667eea' : '#e2e8f0'}`,
                  background: filterType === type ? '#667eea' : 'white',
                  color: filterType === type ? 'white' : '#718096',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {ACTIVITY_ICONS[type]} {ACTIVITY_TYPE_LABELS[type]}
              </button>
            ))}
          </div>
        </div>
      </S.Toolbar>

      {/* WEEK TABS */}
      <S.WeekTabs style={{ marginBottom: 16 }}>
        {Array.from({ length: maxWeeksInMonth }, (_, i) => i + 1).map((week) => {
          const template = templates.find(t => t.weekNumber === week);
          const isSelected = selectedWeek === week;
          const hasTemplate = !!template;
          const weekRange = weekDateRanges.find(r => r.week === week);

          return (
            <S.WeekTab
              key={week}
              type="button"
              $active={isSelected}
              onClick={() => setSelectedWeek(week)}
            >
              Tuần {week}
              {weekRange && (
                <span style={{ marginLeft: 4, fontSize: 9, opacity: 0.8, display: 'block' }}>
                  {weekRange.startLabel} - {weekRange.endLabel}
                </span>
              )}
              {hasTemplate && (
                <span style={{ marginLeft: 4, fontSize: 10 }}>
                  {template.status === 'Approved' ? '✓' :
                   template.status === 'Submitted' ? '⏳' : ''}
                </span>
              )}
            </S.WeekTab>
          );
        })}
      </S.WeekTabs>

      {/* LOADING */}
      {isLoading && <SkeletonBoardLoader />}

      {/* EMPTY STATE */}
      {!isLoading && !currentTemplate && (
        <S.EmptyState>
          <Calendar size={48} style={{ color: '#cbd5e0', marginBottom: 16 }} />
          <h3>Chưa có thời khóa biểu cho tuần này</h3>
          <p>Import file CSV hoặc thêm hoạt động thủ công.</p>
          <S.ImportBtn type="button" onClick={openCsvImport}>
            <Upload size={16} />
            Import CSV
          </S.ImportBtn>
        </S.EmptyState>
      )}

      {/* BOARD */}
      {currentTemplate && (
        <S.BoardGrid>
          {DAYS.map((day) => {
            const dayItems = itemsByDay[day.key] || [];
            const isToday = isCurrentWeek && todayDayOfWeek !== null && day.key === todayDayOfWeek;
            const dayStatus = getDayStatus(day.key);
            const canEdit = canEditDay(day.key);

            return (
              <S.DayCol key={day.key} $isToday={isToday} $dayStatus={dayStatus}>
                <S.DayColHead>
                  <div>
                    <S.DayName $isToday={isToday}>{day.label}</S.DayName>
                    {!isToday && selectedWeekRange?.startDate && (() => {
                      const date = getDateForDayInWeek(selectedWeekRange.startDate, selectedWeekRange?.endDate, day.key);
                      if (!date) return <S.DayDate>{day.short}</S.DayDate>;
                      const pad = (n: number) => String(n).padStart(2, '0');
                      return <S.DayDate>{`${pad(date.getDate())}/${pad(date.getMonth() + 1)}`}</S.DayDate>;
                    })()}
                  </div>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    {canEdit && (
                      <S.IconBtn
                        type="button"
                        title="Sao chép ngày"
                        onClick={(e) => {
                          e.stopPropagation();
                          const otherDays = DAYS.filter(d => d.key !== day.key);
                          if (otherDays.length > 0 && confirm(`Sao chép hoạt động sang ${otherDays[0].label}?`)) {
                            copyDay(day.key, otherDays[0].key);
                          }
                        }}
                        style={{ width: 20, height: 20 }}
                      >
                        <Copy size={12} />
                      </S.IconBtn>
                    )}
                    {isToday && <S.TodayTag>HÔM NAY</S.TodayTag>}
                    {dayStatus === 'past' && <S.PastTag>QUÁ KHỨ</S.PastTag>}
                  </div>
                </S.DayColHead>

                <S.ActivityList>
                  {dayItems.map((item) => {
                    const typeColor = ACTIVITY_TYPE_COLORS[item.activityType] || '#667eea';
                    const itemCanEdit = canEdit && canEditItem(item.startTime, day.key);

                    return (
                      <S.ActivityCard
                        key={item.itemId}
                        $typeColor={typeColor}
                        $dayStatus={dayStatus}
                        onClick={() => handleOpenEditItem(item)}
                        style={{ cursor: 'pointer' }}
                      >
                        <S.ActivityTime>
                          {item.startTime.slice(0, 5)} - {item.endTime.slice(0, 5)}
                        </S.ActivityTime>
                        <S.ActivityName>
                          {ACTIVITY_ICONS[item.activityType]} {item.activityName}
                        </S.ActivityName>
                        {item.details && (
                          <S.ActivityDetails>{item.details}</S.ActivityDetails>
                        )}
                        <S.ActivityActions>
                          {itemCanEdit ? (
                            <>
                              <S.IconBtn
                                type="button"
                                title="Sửa"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenEditItem(item);
                                }}
                              >
                                <Edit2 size={13} />
                              </S.IconBtn>
                              <S.IconBtn
                                $danger
                                type="button"
                                title="Xóa"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (item.itemId) handleDeleteClick(item.itemId);
                                }}
                              >
                                <Trash2 size={13} />
                              </S.IconBtn>
                            </>
                          ) : (
                            <S.IconBtn
                              type="button"
                              title="Xem chi tiết"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenEditItem(item);
                              }}
                            >
                              <Eye size={13} />
                            </S.IconBtn>
                          )}
                        </S.ActivityActions>
                      </S.ActivityCard>
                    );
                  })}

                  {canEdit && (
                    <S.AddActivityBtn type="button" onClick={() => handleOpenAddItem(day.key)}>
                      <Plus size={15} />
                      Thêm hoạt động
                    </S.AddActivityBtn>
                  )}
                </S.ActivityList>
              </S.DayCol>
            );
          })}
        </S.BoardGrid>
      )}

      {/* ITEM MODAL */}
      <ItemModal
        isOpen={modalOpen}
        editId={editingItemId}
        item={editItem}
        isReadOnly={modalViewOnly}
        changeRequestHint={modalChangeRequestHint}
        onClose={handleCloseModal}
        onSave={saveItem}
        onUpdate={updateEditItem}
      />

      {/* CSV IMPORT MODAL */}
      <CSVImportModal
        isOpen={csvModalOpen}
        preview={csvPreview}
        isImporting={isImporting}
        onClose={closeCsvModal}
        onPreview={handleCsvPreview}
        onImport={handleCsvImport}
        onViewHistory={openHistoryModal}
        hasHistory={(importHistory?.history?.length ?? 0) > 0}
      />

      {/* IMPORT HISTORY MODAL */}
      <ImportHistoryModal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        history={importHistory?.history ?? []}
        sessions={importHistory?.sessions ?? []}
      />

      {/* CHANGE REQUEST: SUBMIT MODAL (used when submitting an Approved template) */}
      <ChangeRequestModal
        isOpen={submitChangeModalOpen}
        mode="submit"
        defaultReason={currentTemplate?.pendingChangeReason || ''}
        hasPendingChangeRequest={!!currentTemplate?.hasPendingChangeRequest}
        isSubmitting={isSubmittingChange}
        onClose={() => setSubmitChangeModalOpen(false)}
        onConfirm={confirmSubmitChange}
      />

      {/* CHANGE REQUEST: WITHDRAW MODAL (used to withdraw + restore) */}
      <ChangeRequestModal
        isOpen={withdrawChangeModalOpen}
        mode="withdraw"
        isSubmitting={isWithdrawingChange}
        onClose={() => setWithdrawChangeModalOpen(false)}
        onConfirm={confirmWithdrawChange}
      />

      {/* TOASTS */}
      <S.ToastStack>
        {toasts.map((toast) => (
          <S.ToastItem key={toast.id} $variant={toast.variant}>{toast.text}</S.ToastItem>
        ))}
      </S.ToastStack>

      {/* CONFIRM DIALOG */}
      {confirmDialog.open && (
        <ConfirmDialog
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          variant={confirmDialog.variant}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog(prev => ({ ...prev, open: false }))}
        />
      )}
    </S.Container>
  );
};
