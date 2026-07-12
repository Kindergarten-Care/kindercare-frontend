'use client';

import React, { useMemo, useState } from 'react';
import { kcToast } from '@kindercare/ui';
import { useCalendar } from './hooks/useCalendar';
import CreateEventModal from './components/CreateEventModal';
import CreateHolidayModal from './components/CreateHolidayModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { eventService } from '@/services/Principal/EventService';
import { EventDto, HolidayDto, PrincipalEventType } from '@/config/types/event';
import {
  CalendarIcon, PartyIcon, EditIcon, TrashIcon, ClockIcon, MapPinIcon,
} from '@/components/Modal';
import {
  Container, PageHeader, HeaderText, Title, PageSubtitle, HeaderActions, BtnGhost, BtnBrand,
  ErrorBanner, ActionBar, MonthPicker, NavBtn, MonthLabel, LegendGroup, FilterGroup,
  TypeChip, StatusChip, ChipDot,
  Lists, Card, CardHead, CardTitle, TitleIcon, CountChip,
  EvList, Ev, EvDate, EvDateDay, EvDateMonth, EvMain, EvTopRow, EvTitle, EvDesc, EvMeta, EvMetaItem, EvActions, MiniBtn,
  Hol, HolIco, HolMain, HolTitle, HolRange, HolDays,
  EmptyText, LoadingText,
} from './styles';

const TYPE_LABELS: Record<PrincipalEventType, string> = {
  Class: 'Lớp',
  School: 'Trường',
  Student: 'Học sinh',
  Holiday: 'Nghỉ lễ',
};

const MONTH_NAMES = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

function formatDay(ts: number) {
  const d = new Date(ts * 1000);
  return { day: d.getDate(), month: `Th${d.getMonth() + 1}` };
}

function formatTimeRange(startTs: number, endTs: number) {
  const start = new Date(startTs * 1000);
  const end = new Date(endTs * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  const dateStr = `${pad(start.getDate())}/${start.getMonth() + 1}`;
  const timeStr = `${pad(start.getHours())}:${pad(start.getMinutes())} – ${pad(end.getHours())}:${pad(end.getMinutes())}`;
  return `${dateStr} · ${timeStr}`;
}

function eventStatus(startTs: number, endTs: number): 'upcoming' | 'ongoing' | 'done' {
  const now = Date.now() / 1000;
  if (now < startTs) return 'upcoming';
  if (now > endTs) return 'done';
  return 'ongoing';
}

function statusLabel(status: 'upcoming' | 'ongoing' | 'done') {
  switch (status) {
    case 'ongoing': return 'Đang diễn ra';
    case 'done': return 'Đã kết thúc';
    default: return 'Sắp diễn ra';
  }
}

interface HolidayGroup {
  key: string;
  name: string;
  startDate: number;
  endDate: number;
  days: number;
  records: HolidayDto[];
}

function groupHolidays(holidays: HolidayDto[]): HolidayGroup[] {
  const sorted = [...holidays].sort((a, b) => a.holidayDate - b.holidayDate);
  const groups: HolidayGroup[] = [];

  for (const h of sorted) {
    const last = groups[groups.length - 1];
    const oneDaySec = 86400;
    if (last && last.name === (h.holidayName || '') && h.holidayDate - last.endDate <= oneDaySec) {
      last.endDate = h.holidayDate;
      last.days += 1;
      last.records.push(h);
    } else {
      groups.push({
        key: `${h.id}`,
        name: h.holidayName || 'Ngày nghỉ lễ',
        startDate: h.holidayDate,
        endDate: h.holidayDate,
        days: 1,
        records: [h],
      });
    }
  }
  return groups;
}

function formatHolidayRange(group: HolidayGroup) {
  const start = new Date(group.startDate * 1000);
  const end = new Date(group.endDate * 1000);
  if (group.days === 1) {
    return `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}`;
  }
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    return `${start.getDate()}/${start.getMonth() + 1} – ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`;
  }
  return `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()} – ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`;
}

export default function CalendarView() {
  const {
    currentMonth, holidays, loading, error, typeFilter, monthEvents,
    goToPrevMonth, goToNextMonth, setTypeFilter, refetch,
  } = useCalendar();

  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showCreateHoliday, setShowCreateHoliday] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventDto | null>(null);
  const [editingHoliday, setEditingHoliday] = useState<HolidayDto | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<EventDto | null>(null);
  const [deletingHolidayGroup, setDeletingHolidayGroup] = useState<HolidayGroup | null>(null);

  const holidayGroups = useMemo(() => groupHolidays(holidays), [holidays]);

  const typeChips: PrincipalEventType[] = ['Class', 'School', 'Student', 'Holiday'];

  return (
    <Container>
      <PageHeader>
        <HeaderText>
          <Title>Lịch và sự kiện</Title>
          <PageSubtitle>Quản lý sự kiện của trường, lớp &amp; lịch nghỉ lễ toàn trường</PageSubtitle>
        </HeaderText>
        <HeaderActions>
          <BtnGhost onClick={() => setShowCreateHoliday(true)}>
            <PartyIcon />
            Tạo ngày nghỉ lễ
          </BtnGhost>
          <BtnBrand onClick={() => setShowCreateEvent(true)}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
            Tạo sự kiện
          </BtnBrand>
        </HeaderActions>
      </PageHeader>

      {error && <ErrorBanner>{error}</ErrorBanner>}

      <ActionBar>
        <MonthPicker>
          <NavBtn onClick={goToPrevMonth}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </NavBtn>
          <MonthLabel>{MONTH_NAMES[currentMonth.getMonth()]}, {currentMonth.getFullYear()}</MonthLabel>
          <NavBtn onClick={goToNextMonth}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </NavBtn>
        </MonthPicker>

        <LegendGroup>
          {typeChips.map(t => (
            <TypeChip
              key={t}
              $type={t}
              $active={typeFilter === 'all' || typeFilter === t}
              onClick={() => setTypeFilter(typeFilter === t ? 'all' : t)}
            >
              <ChipDot />
              {TYPE_LABELS[t]}
            </TypeChip>
          ))}
        </LegendGroup>

        {typeFilter !== 'all' && (
          <FilterGroup>
            <BtnGhost onClick={() => setTypeFilter('all')} style={{ background: '#f4f8f5', color: '#1f2937', border: '1px solid #e6eee9' }}>
              Bỏ lọc
            </BtnGhost>
          </FilterGroup>
        )}
      </ActionBar>

      <Lists>
        {/* ===== EVENTS ===== */}
        <Card>
          <CardHead>
            <CardTitle>
              <TitleIcon $variant="brand"><CalendarIcon /></TitleIcon>
              Sự kiện <CountChip $variant="brand">{monthEvents.length}</CountChip>
            </CardTitle>
          </CardHead>

          {loading ? (
            <LoadingText>Đang tải dữ liệu...</LoadingText>
          ) : monthEvents.length === 0 ? (
            <EmptyText>Không có sự kiện nào trong tháng này.</EmptyText>
          ) : (
            <EvList>
              {monthEvents.map((ev: EventDto) => {
                const { day, month } = formatDay(ev.startTime);
                const status = eventStatus(ev.startTime, ev.endTime);
                return (
                  <Ev key={ev.id}>
                    <EvDate $done={status === 'done'}>
                      <EvDateDay $done={status === 'done'}>{day}</EvDateDay>
                      <EvDateMonth>{month}</EvDateMonth>
                    </EvDate>
                    <EvMain>
                      <EvTopRow>
                        <EvTitle>{ev.title}</EvTitle>
                        <TypeChip $type={ev.eventType}>
                          <ChipDot />
                          {TYPE_LABELS[ev.eventType]}
                        </TypeChip>
                        <StatusChip $status={status}>
                          <ChipDot />
                          {statusLabel(status)}
                        </StatusChip>
                      </EvTopRow>
                      {ev.description && <EvDesc>{ev.description}</EvDesc>}
                      <EvMeta>
                        <EvMetaItem><ClockIcon />{formatTimeRange(ev.startTime, ev.endTime)}</EvMetaItem>
                        {ev.location && <EvMetaItem><MapPinIcon />{ev.location}</EvMetaItem>}
                      </EvMeta>
                    </EvMain>
                    <EvActions>
                      <MiniBtn title="Sửa" onClick={() => setEditingEvent(ev)}><EditIcon /></MiniBtn>
                      <MiniBtn $danger title="Xóa" onClick={() => setDeletingEvent(ev)}><TrashIcon /></MiniBtn>
                    </EvActions>
                  </Ev>
                );
              })}
            </EvList>
          )}
        </Card>

        {/* ===== HOLIDAYS ===== */}
        <Card>
          <CardHead>
            <CardTitle>
              <TitleIcon $variant="amber"><PartyIcon /></TitleIcon>
              Ngày nghỉ lễ <CountChip $variant="amber">{holidayGroups.length}</CountChip>
            </CardTitle>
          </CardHead>

          {loading ? (
            <LoadingText>Đang tải dữ liệu...</LoadingText>
          ) : holidayGroups.length === 0 ? (
            <EmptyText>Chưa có ngày nghỉ lễ nào được thiết lập.</EmptyText>
          ) : (
            <EvList>
              {holidayGroups.map(group => (
                <Hol key={group.key}>
                  <HolIco>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22V4a2 2 0 0 1 2-2h9l1 2h4v9H6" /></svg>
                  </HolIco>
                  <HolMain>
                    <HolTitle>{group.name}</HolTitle>
                    <HolRange>
                      <CalendarIcon />
                      {formatHolidayRange(group)}
                    </HolRange>
                    <HolDays>Nghỉ {group.days} ngày</HolDays>
                  </HolMain>
                  <EvActions>
                    {group.days === 1 && (
                      <MiniBtn title="Sửa" onClick={() => setEditingHoliday(group.records[0])}><EditIcon /></MiniBtn>
                    )}
                    <MiniBtn $danger title="Xóa" onClick={() => setDeletingHolidayGroup(group)}><TrashIcon /></MiniBtn>
                  </EvActions>
                </Hol>
              ))}
            </EvList>
          )}
        </Card>
      </Lists>

      {showCreateEvent && (
        <CreateEventModal
          onClose={() => setShowCreateEvent(false)}
          onSuccess={() => { setShowCreateEvent(false); refetch(); }}
        />
      )}

      {showCreateHoliday && (
        <CreateHolidayModal
          onClose={() => setShowCreateHoliday(false)}
          onSuccess={() => { setShowCreateHoliday(false); refetch(); }}
        />
      )}

      {editingEvent && (
        <CreateEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSuccess={() => { setEditingEvent(null); refetch(); }}
        />
      )}

      {editingHoliday && (
        <CreateHolidayModal
          holiday={editingHoliday}
          onClose={() => setEditingHoliday(null)}
          onSuccess={() => { setEditingHoliday(null); refetch(); }}
        />
      )}

      {deletingEvent && (
        <DeleteConfirmModal
          title="Xóa sự kiện này?"
          description={deletingEvent.title}
          consequence="Phụ huynh liên quan sẽ nhận thông báo sự kiện đã bị hủy. Hành động này không thể hoàn tác."
          onClose={() => setDeletingEvent(null)}
          onConfirm={async () => {
            await eventService.deleteEvent(deletingEvent.id);
            kcToast.success('Đã xóa sự kiện thành công!');
            await refetch();
          }}
        />
      )}

      {deletingHolidayGroup && (
        <DeleteConfirmModal
          title={deletingHolidayGroup.days > 1 ? 'Xóa cụm ngày nghỉ lễ này?' : 'Xóa ngày nghỉ lễ này?'}
          description={`${deletingHolidayGroup.name} · ${formatHolidayRange(deletingHolidayGroup)}`}
          consequence="Việc này sẽ ảnh hưởng tới số ngày công dùng để tính phí ăn hàng tháng. Hóa đơn đã tạo trước đó sẽ không tự động tính lại."
          onClose={() => setDeletingHolidayGroup(null)}
          onConfirm={async () => {
            await Promise.all(deletingHolidayGroup.records.map(r => eventService.deleteHoliday(r.id)));
            kcToast.success('Đã xóa ngày nghỉ lễ thành công!');
            await refetch();
          }}
        />
      )}
    </Container>
  );
}
