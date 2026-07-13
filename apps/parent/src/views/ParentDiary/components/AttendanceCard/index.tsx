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
  diaryTitle?: string;
  diaryDescription?: string;
  onZoomImage?: (url: string, caption?: string) => void;
}

export function AttendanceCard({
  attendance,
  studentFullName,
  stats,
  dailyActivity,
  studentAvatarUrl,
  diaryTitle,
  diaryDescription,
  onZoomImage,
}: AttendanceCardProps) {
  const isAbsent = attendance?.status === 'Absent' || attendance?.status === 'Excused';
  const checkIn = attendance?.checkInTime ? tsToHHMM(attendance.checkInTime) : null;
  const checkOut = attendance?.checkOutTime ? tsToHHMM(attendance.checkOutTime) : null;

  const droppedOffName = formatPersonName(attendance?.droppedOffBy, attendance?.droppedOffRelationship);
  const pickedUpName = formatPersonName(attendance?.pickedUpBy, attendance?.pickedUpRelationship);
  const droppedOffInitial = formatPersonInitial(attendance?.droppedOffBy, attendance?.droppedOffRelationship);
  const pickedUpInitial = formatPersonInitial(attendance?.pickedUpBy, attendance?.pickedUpRelationship);

  let statusText = 'Bình thường';
  if (attendance) {
    const statusLower = attendance.status?.toLowerCase();
    if (statusLower === 'excused') {
      statusText = 'Bé nghỉ học có phép';
    } else if (statusLower === 'absent') {
      statusText = 'Bé vắng học';
    } else if (attendance.checkOutTime) {
      statusText = 'Bé đã ra về';
    } else if (attendance.checkInTime) {
      statusText = 'Bé đã đến lớp';
    } else if (statusLower === 'present') {
      statusText = 'Bé đã đến lớp';
    } else if (dailyActivity?.activityStatus) {
      statusText = dailyActivity.activityStatus;
    }
  } else if (dailyActivity?.activityStatus) {
    statusText = dailyActivity.activityStatus;
  }

  const moodText = `TRẠNG THÁI: ${statusText.toUpperCase()}`;



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
          {attendance?.status === 'Excused' ? (
            <>
              <S.OvTitle>Hôm nay bé vắng học</S.OvTitle>
              <S.OvDesc>Bé nghỉ học có phép, đơn xin nghỉ đã được duyệt.</S.OvDesc>
            </>
          ) : (
            <>
              <S.OvTitle>{diaryTitle || 'Hôm nay bé có một ngày thật tuyệt!'}</S.OvTitle>
              <S.OvDesc>{diaryDescription || 'Bé ăn ngoan, ngủ đủ giấc và tham gia tích cực các hoạt động cùng lớp.'}</S.OvDesc>

            </>
          )}
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
              {attendance?.dropoffImage ? (
                <S.AttPhotoBox onClick={() => onZoomImage?.(attendance.dropoffImage!, 'Ảnh lúc đưa bé đến lớp')}>
                  <S.AttPhotoImg src={attendance.dropoffImage} alt="Ảnh lúc đưa bé đến lớp" />
                </S.AttPhotoBox>
              ) : (
                <S.AttPhotoBox>
                  <S.AttPhotoPlaceholder>
                    <Svg size={18} sw={1.6}>
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </Svg>
                    Chưa có ảnh
                  </S.AttPhotoPlaceholder>
                </S.AttPhotoBox>
              )}
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
              {attendance?.pickupImage ? (
                <S.AttPhotoBox onClick={() => onZoomImage?.(attendance.pickupImage!, 'Ảnh lúc trả bé về')}>
                  <S.AttPhotoImg src={attendance.pickupImage} alt="Ảnh lúc trả bé về" />
                </S.AttPhotoBox>
              ) : (
                <S.AttPhotoBox>
                  <S.AttPhotoPlaceholder>
                    <Svg size={18} sw={1.6}>
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </Svg>
                    Chưa có ảnh
                  </S.AttPhotoPlaceholder>
                </S.AttPhotoBox>
              )}
            </S.AttCol>
          </S.AttGrid>
        </S.AttCard>
      )}
    </S.TopRowGrid>
  );
}
