import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from '@/i18n/routing';
import { Check, X, Clock, Calendar } from 'lucide-react';

export type QuickAttendanceStatus = 'PRESENT' | 'PERMISSION_ABSENCE' | 'UNEXCUSED_ABSENCE' | 'LATE' | 'NOT_MARKED';

export interface TodayKid {
  id: string;
  name: string;
  initial: string;
  avatarUrl?: string;
  attendanceStatus: QuickAttendanceStatus;
  arrivalTime?: string;
  teacherNote?: string;
}

interface TodayKidsProps {
  kids: TodayKid[];
  date: string;
  onKidClick?: (kid: TodayKid) => void;
  onViewAll?: () => void;
}

const Wrapper = styled.div`
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
  gap: 12px;
  flex-wrap: wrap;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -.01em;
  color: #1F2937;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const DateChip = styled.span`
  font-size: 11.5px;
  font-weight: 700;
  color: #005A36;
  background: #E6F3ED;
  padding: 3px 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const ViewMoreLink = styled.button`
  font-size: 13px;
  font-weight: 700;
  color: #005A36;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  &:hover { text-decoration: underline; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
`;

const Card = styled.button<{ $status: QuickAttendanceStatus }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  padding: 20px 12px 16px;
  border-radius: 18px;
  border: 1px solid ${p => {
    if (p.$status === 'PRESENT') return '#A7E0C6';
    if (p.$status === 'LATE') return '#FDE68A';
    if (p.$status === 'PERMISSION_ABSENCE') return '#DDD6FE';
    if (p.$status === 'UNEXCUSED_ABSENCE') return '#FECACA';
    return '#E6EEE9';
  }};
  background: #fff;
  box-shadow: 0 4px 18px -8px rgba(0, 90, 54, 0.08);
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 44px -16px rgba(0, 90, 54, 0.22);
  }
`;

const Avatar = styled.span<{ $bg: string }>`
  position: relative;
  flex: none;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background: ${p => p.$bg};
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 24px;
  overflow: hidden;
`;

const AvatarImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const StatusBadge = styled.span<{ $status: QuickAttendanceStatus }>`
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10.5px;
  font-weight: 800;
  padding: 3px 9px;
  border-radius: 999px;
  white-space: nowrap;
  background: ${p => {
    if (p.$status === 'PRESENT') return '#E6F3ED';
    if (p.$status === 'LATE') return '#FEF3C7';
    if (p.$status === 'PERMISSION_ABSENCE') return '#EDE9FE';
    if (p.$status === 'UNEXCUSED_ABSENCE') return '#FEE2E2';
    return '#F3F4F6';
  }};
  color: ${p => {
    if (p.$status === 'PRESENT') return '#046E1E';
    if (p.$status === 'LATE') return '#B45309';
    if (p.$status === 'PERMISSION_ABSENCE') return '#6D28D9';
    if (p.$status === 'UNEXCUSED_ABSENCE') return '#B91C1C';
    return '#6B7280';
  }};
  box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.1);
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #1F2937;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ArrivalTime = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6B7280;
  font-weight: 600;
`;

const NoteChip = styled.span`
  font-size: 11px;
  color: #4B5563;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  padding: 2px 8px;
  border-radius: 999px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const STATUS_LABEL: Record<QuickAttendanceStatus, string> = {
  PRESENT: 'Có mặt',
  LATE: 'Đi muộn',
  PERMISSION_ABSENCE: 'Vắng phép',
  UNEXCUSED_ABSENCE: 'Vắng',
  NOT_MARKED: 'Chưa điểm',
};

const STATUS_ICON: Record<QuickAttendanceStatus, React.ReactNode> = {
  PRESENT: <Check size={10} strokeWidth={3} />,
  LATE: <Clock size={10} strokeWidth={3} />,
  PERMISSION_ABSENCE: <Calendar size={10} strokeWidth={3} />,
  UNEXCUSED_ABSENCE: <X size={10} strokeWidth={3} />,
  NOT_MARKED: <></>,
};

const formatDate = (raw?: string): string => {
  if (!raw) return '';
  const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return raw;
  return `${Number(m[3])}/${Number(m[2])}/${m[1]}`;
};

export const TodayKidsWidget: React.FC<TodayKidsProps> = ({ kids, date, onKidClick, onViewAll }) => {
  const router = useRouter();
  const displayDate = formatDate(date);

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
      return;
    }
    router.push('/attendance');
  };

  return (
    <Wrapper>
      <HeaderRow>
        <TitleGroup>
          <Title><Check size={18} color="#046E1E" /> Tình trạng hôm nay</Title>
          {displayDate && <DateChip><Calendar size={11} /> {displayDate}</DateChip>}
        </TitleGroup>
        <ViewMoreLink type="button" onClick={handleViewAll}>Quản lý điểm danh →</ViewMoreLink>
      </HeaderRow>
      <Grid>
        {kids.slice(0, 4).map(k => {
          const colors = ['#FEF3C7', '#E0E7FF', '#FCE7F3', '#E6F3ED'];
          const idx = parseInt(k.id, 10) || 0;
          const bg = colors[idx % colors.length];
          return (
            <Card
              key={k.id}
              type="button"
              $status={k.attendanceStatus}
              onClick={() => onKidClick?.(k)}
              aria-label={`Cập nhật nhanh cho ${k.name}`}
            >
              <StatusBadge $status={k.attendanceStatus}>
                {STATUS_ICON[k.attendanceStatus]}
                {STATUS_LABEL[k.attendanceStatus]}
              </StatusBadge>
              <Avatar $bg={bg}>
                {k.initial}
                {k.avatarUrl && (
                  <AvatarImg 
                    src={k.avatarUrl} 
                    alt="" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                  />
                )}
              </Avatar>
              <Name>{k.name}</Name>
              {k.arrivalTime ? (
                <ArrivalTime><Clock size={11} /> Vào lớp {k.arrivalTime}</ArrivalTime>
              ) : (
                <ArrivalTime style={{ opacity: 0.5 }}>—</ArrivalTime>
              )}
              {k.teacherNote ? (
                <NoteChip title={k.teacherNote}>{k.teacherNote}</NoteChip>
              ) : null}
            </Card>
          );
        })}
      </Grid>
    </Wrapper>
  );
};