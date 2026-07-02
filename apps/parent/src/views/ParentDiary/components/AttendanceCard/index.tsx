import React from 'react';
import * as S from './styles';
import { Svg } from '../Svg';
import { AttendanceDomainModel } from '@/config/types/attendance';
import { DailyActivityDomainModel } from '@/config/types/dailyActivity';
import { formatPersonName, formatPersonInitial, getStudentInitials } from '@/utils/formatName';
import { tsToHHMM } from '@/utils/Student/Date';
import { DiaryStats } from '../../hooks/useParentDiary';

interface AttendanceCardProps {
  attendance: AttendanceDomainModel | null;
  studentFullName: string;
  stats: DiaryStats;
  dailyActivity: DailyActivityDomainModel | null;
  studentAvatarUrl?: string | null;
}

export function AttendanceCard({ attendance, studentFullName, stats, dailyActivity, studentAvatarUrl }: AttendanceCardProps) {
  const isAbsent = attendance?.status === 'Absent' || attendance?.status === 'Excused';
  const checkIn = attendance?.checkInTime ? tsToHHMM(attendance.checkInTime) : null;
  const checkOut = attendance?.checkOutTime ? tsToHHMM(attendance.checkOutTime) : null;

  const droppedOffName = formatPersonName(attendance?.droppedOffBy, attendance?.droppedOffRelationship);
  const pickedUpName = formatPersonName(attendance?.pickedUpBy, attendance?.pickedUpRelationship);
  const droppedOffInitial = formatPersonInitial(attendance?.droppedOffBy, attendance?.droppedOffRelationship);
  const pickedUpInitial = formatPersonInitial(attendance?.pickedUpBy, attendance?.pickedUpRelationship);

  const moodText = dailyActivity?.activityStatus
    ? `Trạng thái: ${dailyActivity.activityStatus}`
    : 'Trạng thái: Bình thường';

  const eatText = dailyActivity?.lunchStatus
    ? `Ăn: ${dailyActivity.lunchStatus}`
    : 'Ăn: Ăn ngoan';

  const napText = dailyActivity?.napStatus
    ? `Ngủ: ${dailyActivity.napStatus}`
    : 'Ngủ: Ngon giấc';

  const hygieneText = dailyActivity?.hygieneStatus
    ? `Vệ sinh: ${dailyActivity.hygieneStatus}`
    : 'Vệ sinh: Tự giác';

  return (
    <S.TopRowGrid>
      {/* Overview Card */}
      <S.OverviewCard>
        <S.OvHeaderRow>
          {studentAvatarUrl ? (
            <S.OvAvatar style={{ padding: 0 }}>
              <img src={studentAvatarUrl} alt={studentFullName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
            </S.OvAvatar>
          ) : (
            <S.OvAvatar style={{ background: 'linear-gradient(140deg,#2f6df0,#1e40af)' }}>
              {getStudentInitials(studentFullName)}
            </S.OvAvatar>
          )}
          <S.OvMood>
            <Svg size={13} sw={2}>
              <circle cx="12" cy="12" r="9" />
              <path d="M8.5 14.5a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01" />
            </Svg>
            {moodText}
          </S.OvMood>
        </S.OvHeaderRow>
        <S.OvBody style={{ flex: 'unset' }}>
          <S.OvTitle>Hôm nay bé có một ngày thật tuyệt!</S.OvTitle>
          <S.OvDesc>Bé ăn ngoan, ngủ đủ giấc và tham gia tích cực các hoạt động cùng lớp.</S.OvDesc>
          <S.OvStatPills>
            <S.OvStatPill>
              <Svg size={14} sw={1.8}>
                <path d="M5 3v7a2 2 0 0 0 4 0V3M7 10v11" />
                <path d="M16 3c-1.4 0-2.5 2-2.5 4.5S14.6 12 16 12v9" />
              </Svg>
              {eatText}
            </S.OvStatPill>
            <S.OvStatPill>
              <Svg size={14} sw={1.8}>
                <path d="M3 18v-5a3 3 0 0 1 3-3h7a4 4 0 0 1 4 4v4M3 18h18" />
              </Svg>
              {napText}
            </S.OvStatPill>
            <S.OvStatPill>
              <Svg size={14} sw={1.8}>
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </Svg>
              {hygieneText}
            </S.OvStatPill>
          </S.OvStatPills>
        </S.OvBody>
      </S.OverviewCard>

      {/* Attendance Card */}
      {isAbsent ? (
        <S.AttCard style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '8px' }}>
            <span style={{ fontSize: '32px' }}>😴</span>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#dc2626' }}>
              Hôm nay bé vắng học
            </div>
            <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
              {attendance?.status === 'Excused' ? 'Nghỉ học có phép (Đã duyệt đơn xin nghỉ)' : 'Nghỉ học không phép'}
            </div>
          </div>
        </S.AttCard>
      ) : (
        <S.AttCard style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <S.AttGrid style={{ height: '100%', alignItems: 'center' }}>
            <S.AttCol>
              <S.AttTag $type="in">
                <Svg size={13} sw={2.2}>
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
                </Svg>
                Đến lớp
              </S.AttTag>
              <S.AttTime>{checkIn ?? '—:—'}</S.AttTime>
              <S.AttWho>
                {attendance?.droppedOffAvatarUrl ? (
                  <S.AttWhoAv style={{ padding: 0 }}>
                    <img src={attendance.droppedOffAvatarUrl} alt={droppedOffName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                  </S.AttWhoAv>
                ) : (
                  <S.AttWhoAv style={{ background: 'linear-gradient(140deg,#2f6df0,#1e40af)' }}>
                    {droppedOffInitial}
                  </S.AttWhoAv>
                )}
                <div>
                  <S.AttWhoLbl>Người đưa đi</S.AttWhoLbl>
                  <S.AttWhoName>{droppedOffName}</S.AttWhoName>
                </div>
              </S.AttWho>
            </S.AttCol>
            <S.AttCol>
              <S.AttTag $type="out">
                <Svg size={13} sw={2.2}>
                  <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4M14 17l5-5-5-5M19 12H7" />
                </Svg>
                Đón về
              </S.AttTag>
              <S.AttTime>{checkOut ?? '—:—'}</S.AttTime>
              <S.AttWho>
                {attendance?.pickedUpAvatarUrl ? (
                  <S.AttWhoAv style={{ padding: 0 }}>
                    <img src={attendance.pickedUpAvatarUrl} alt={pickedUpName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                  </S.AttWhoAv>
                ) : (
                  <S.AttWhoAv style={{ background: 'linear-gradient(140deg,#9b6cf0,#7c3aed)' }}>
                    {pickedUpInitial}
                  </S.AttWhoAv>
                )}
                <div>
                  <S.AttWhoLbl>Người đón về</S.AttWhoLbl>
                  <S.AttWhoName>{pickedUpName}</S.AttWhoName>
                </div>
              </S.AttWho>
            </S.AttCol>
          </S.AttGrid>
        </S.AttCard>
      )}
    </S.TopRowGrid>
  );
}
