import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { X, Check, Clock, Calendar, Save, Loader2 } from 'lucide-react';
import { AttendanceService } from '@/services/attendance';
import type { QuickAttendanceStatus } from './TodayKidsWidget';

interface KidQuickActionModalProps {
  isOpen: boolean;
  kid: {
    id: string;
    name: string;
    avatarUrl?: string;
    attendanceStatus: QuickAttendanceStatus;
    arrivalTime?: string;
    teacherNote?: string;
  } | null;
  classId: number | null;
  date: string;
  onClose: () => void;
  onSaved?: (next: { status: QuickAttendanceStatus; arrivalTime?: string; teacherNote?: string }) => void;
}

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const popUp  = keyframes`from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; }`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.2s ease;
`;

const ModalBox = styled.div`
  background: #fff;
  width: 92%;
  max-width: 440px;
  border-radius: 24px;
  box-shadow: 0 24px 48px -12px rgba(0, 90, 54, 0.2);
  overflow: hidden;
  animation: ${popUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  background: #005A36;
  padding: 28px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  text-align: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(255,255,255,0.2);
  border: none;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 50%;

  &:hover { background: rgba(255,255,255,0.4); }
`;

const Avatar = styled.div<{ $imgUrl?: string }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${p => p.$imgUrl ? `url(${p.$imgUrl}) center/cover no-repeat` : '#fff'};
  color: ${p => p.$imgUrl ? 'transparent' : '#005A36'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 10px;
  box-shadow: 0 8px 16px -8px rgba(0,0,0,0.3);
`;

const Title = styled.h3`
  margin: 0 0 2px;
  font-size: 19px;
  font-weight: 800;
`;

const Subtitle = styled.div`
  font-size: 12.5px;
  color: #A7E0C6;
  font-weight: 500;
`;

const Content = styled.div`
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const StatusGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const StatusBtn = styled.button<{ $active: boolean; $tone: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  border: 2px solid ${p => (p.$active ? p.$tone : '#E5E7EB')};
  background: ${p => (p.$active ? `${p.$tone}15` : '#fff')};
  color: ${p => (p.$active ? p.$tone : '#6B7280')};
  transition: all 0.15s;

  &:hover {
    border-color: ${p => p.$tone};
    color: ${p => p.$tone};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  color: #1F2937;
  background: #F9FAFB;

  &:focus {
    outline: none;
    border-color: #005A36;
    background: #fff;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 14.5px;
  color: #1F2937;
  resize: none;
  height: 80px;
  font-family: inherit;
  background: #F9FAFB;

  &:focus {
    outline: none;
    border-color: #005A36;
    background: #fff;
  }
`;

const Footer = styled.div`
  display: flex;
  gap: 10px;
  padding: 14px 24px 20px;
  background: #fff;
  border-top: 1px solid #F1F5F9;
`;

const ActionBtn = styled.button<{ $variant?: 'primary' | 'ghost' }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 14.5px;
  cursor: pointer;
  border: ${p => (p.$variant === 'ghost' ? '1px solid #E5E7EB' : 'none')};
  background: ${p => (p.$variant === 'ghost' ? '#fff' : '#005A36')};
  color: ${p => (p.$variant === 'ghost' ? '#374151' : '#fff')};
  transition: transform 0.15s, box-shadow 0.15s;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px -8px rgba(0, 90, 54, 0.4);
  }
`;

const STATUS_OPTIONS: { value: QuickAttendanceStatus; label: string; icon: React.ReactNode; tone: string }[] = [
  { value: 'PRESENT',              label: 'Có mặt',     icon: <Check size={14} />,    tone: '#046E1E' },
  { value: 'LATE',                 label: 'Đi muộn',    icon: <Clock size={14} />,   tone: '#B45309' },
  { value: 'PERMISSION_ABSENCE',  label: 'Vắng phép',  icon: <Calendar size={14} />, tone: '#6D28D9' },
  { value: 'UNEXCUSED_ABSENCE',   label: 'Vắng',       icon: <X size={14} />,       tone: '#B91C1C' },
];

const formatDate = (raw: string): string => {
  const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return raw;
  return `${Number(m[3])}/${Number(m[2])}/${m[1]}`;
};

export const KidQuickActionModal: React.FC<KidQuickActionModalProps> = ({
  isOpen,
  kid,
  classId,
  date,
  onClose,
  onSaved,
}) => {
  const [status, setStatus] = useState<QuickAttendanceStatus>('NOT_MARKED');
  const [arrivalTime, setArrivalTime] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && kid) {
      setStatus(kid.attendanceStatus === 'NOT_MARKED' ? 'PRESENT' : kid.attendanceStatus);
      setArrivalTime(kid.arrivalTime || '');
      setNote(kid.teacherNote || '');
      setError(null);
    }
  }, [isOpen, kid]);

  if (!isOpen || !kid) return null;

  const initial = kid.name.split(' ').pop()?.charAt(0).toUpperCase() || '?';

  const handleSave = async () => {
    if (!classId) {
      setError('Chưa xác định được lớp học.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await AttendanceService.updateAttendance(classId, date, [{
        studentId: kid.id,
        status: status as any,
        arrivalTime: status === 'PRESENT' || status === 'LATE' ? arrivalTime : undefined,
        healthNote: note || undefined,
      }]);
      onSaved?.({ status, arrivalTime, teacherNote: note });
      onClose();
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || 'Không lưu được điểm danh.');
    } finally {
      setSaving(false);
    }
  };

  const showArrivalTime = status === 'PRESENT' || status === 'LATE';

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <Header>
          <CloseBtn onClick={onClose} aria-label="Đóng"><X size={18} strokeWidth={2.5} /></CloseBtn>
          <Avatar $imgUrl={kid.avatarUrl}>{!kid.avatarUrl && initial}</Avatar>
          <Title>{kid.name}</Title>
          <Subtitle>Cập nhật điểm danh · {formatDate(date)}</Subtitle>
        </Header>

        <Content>
          <Field>
            <Label>Trạng thái</Label>
            <StatusGroup>
              {STATUS_OPTIONS.map(o => (
                <StatusBtn
                  key={o.value}
                  type="button"
                  $active={status === o.value}
                  $tone={o.tone}
                  onClick={() => setStatus(o.value)}
                  aria-pressed={status === o.value}
                >
                  {o.icon}
                  {o.label}
                </StatusBtn>
              ))}
            </StatusGroup>
          </Field>

          {showArrivalTime && (
            <Field>
              <Label>Giờ vào lớp</Label>
              <Input
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
              />
            </Field>
          )}

          <Field>
            <Label>Ghi chú của giáo viên</Label>
            <Textarea
              placeholder="VD: Bé hơi mệt, ăn ít..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Field>

          {error && (
            <div style={{ color: '#B91C1C', fontSize: 13, fontWeight: 600 }}>{error}</div>
          )}
        </Content>

        <Footer>
          <ActionBtn type="button" $variant="ghost" onClick={onClose} disabled={saving}>Huỷ</ActionBtn>
          <ActionBtn type="button" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 size={16} className="spin" /> : <Save size={16} />}
            {saving ? 'Đang lưu...' : 'Lưu lại'}
          </ActionBtn>
        </Footer>
      </ModalBox>
    </Overlay>
  );
};