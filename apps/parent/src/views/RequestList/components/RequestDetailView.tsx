import React, { useState } from 'react';
import * as S from '../styles';
import { IconSchedule, IconRequest, IconMedicine, IconChevronLeft, IconCheck, IconClose } from '@/assets/icons/dashboard';
import { RequestItem } from '../types';
import { StudentDomainModel } from '@/config/types/student';
import { resolveTeacherInfo } from '../utils';

/**
 * Props for RequestDetailView component.
 */
interface RequestDetailViewProps {
  /** The leave or medication request item details */
  request: RequestItem;
  /** The active student context information */
  activeStudent: StudentDomainModel | null;
  /** Callback to navigate back to the request list view */
  onBack: () => void;
  /** Callback to cancel a pending request */
  onCancel: (id: string) => void;
  /** Callback to update local status state after actions */
  onStatusUpdate: (updated: RequestItem) => void;
}

/**
 * RequestDetailView renders the visual timeline progress, teacher feedback, and detailed parameters
 * (such as medicines list, dosage, or leave reasons with evidence photos) for a selected request.
 */
export const RequestDetailView: React.FC<RequestDetailViewProps> = ({
  request,
  activeStudent,
  onBack,
  onCancel,
  onStatusUpdate,
}) => {
  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);

  // Extract all teacher-related display logic to a centralized helper
  const {
    isMaleTeacher,
    homeroomTitleWithName,
    teacherDisplayName,
  } = resolveTeacherInfo(activeStudent);

  const handleCancel = () => {
    onCancel(request.id);
    onStatusUpdate({ ...request, status: 'cancelled' });
  };

  return (
    <>
      {/* Detail Header */}
      <S.DetailHeader>
        <S.DetailBackBtn onClick={onBack}>
          <IconChevronLeft size={16} /> Quay lại
        </S.DetailBackBtn>
        <S.Breadcrumbs>
          Yêu cầu của phụ huynh <span>·</span> <strong>{request.type === 'leave' ? 'Đơn xin nghỉ học' : 'Dặn dò thuốc'}</strong>
        </S.Breadcrumbs>
      </S.DetailHeader>

      {/* Top Card */}
      <S.DetailSummaryCard $color={request.color}>
        <S.SummaryTop>
          <S.SummaryLeft>
            <S.SummaryIconWrapper $bg={request.bg} $color={request.color}>
              {request.type === 'leave' ? <IconRequest size={24} /> : <IconMedicine size={24} />}
            </S.SummaryIconWrapper>
            <div>
              <S.SummaryTitle>{request.type === 'leave' ? 'Đơn xin nghỉ học' : 'Dặn dò thuốc'}</S.SummaryTitle>
              <S.SummaryMeta>Mã đơn #{request.requestId} · Gửi tới {homeroomTitleWithName}</S.SummaryMeta>
            </div>
          </S.SummaryLeft>
          <S.StatusBadge $status={request.status}>
            {request.status === 'pending' && '⏱ Chờ phản hồi'}
            {request.status === 'approved' && '✓ Đã duyệt'}
            {request.status === 'completed' && (request.type === 'leave' ? '✓ Đã duyệt' : '✓ Đã cho uống')}
            {request.status === 'rejected' && '✕ Từ chối'}
            {request.status === 'cancelled' && '✕ Đã hủy'}
          </S.StatusBadge>
        </S.SummaryTop>

        <S.SummaryDivider />

        <S.SummaryChildRow>
          {activeStudent?.avatarUrl ? (
            <S.SummaryChildAvatarImg
              src={activeStudent.avatarUrl}
              alt={activeStudent.fullName}
            />
          ) : (
            <S.SummaryChildAvatar $gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)">
              {activeStudent?.fullName ? activeStudent.fullName.split(' ').pop()?.substring(0, 2).toUpperCase() : 'BC'}
            </S.SummaryChildAvatar>
          )}
          <div>
            <S.SummaryChildName>{activeStudent?.fullName || 'Nguyễn Bảo Châu'}</S.SummaryChildName>
            <S.SummaryChildClass>{activeStudent?.className || 'Lớp Hoa Hướng Dương'}</S.SummaryChildClass>
          </div>
        </S.SummaryChildRow>
      </S.DetailSummaryCard>

      {/* Card 2: Teacher Response */}
      <S.DetailCard>
        <S.DetailCardTitle>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Phản hồi từ {teacherDisplayName}
        </S.DetailCardTitle>
        <S.TeacherResponseText>
          {request.type === 'medication' ? (
            request.teacherNote || (request.status === 'pending'
              ? `Chưa có phản hồi từ ${isMaleTeacher ? 'thầy' : 'cô'}.`
              : request.status === 'cancelled'
              ? 'Đơn đã được hủy.'
              : request.status === 'rejected'
              ? `${teacherDisplayName} từ chối yêu cầu của bạn.`
              : `${teacherDisplayName} đã xác nhận và cho bé uống thuốc đầy đủ.`)
          ) : (
            <>
              {request.status === 'pending' && `Chưa có phản hồi từ ${isMaleTeacher ? 'thầy' : 'cô'}.`}
              {request.status === 'approved' && 'Đơn đã được duyệt.'}
              {request.status === 'completed' && 'Đơn đã được duyệt.'}
              {request.status === 'rejected' && `${teacherDisplayName} từ chối yêu cầu của bạn.`}
              {request.status === 'cancelled' && 'Đơn đã được hủy.'}
            </>
          )}
        </S.TeacherResponseText>
      </S.DetailCard>

      {/* Bottom Grid */}
      <S.DetailGrid>
        {/* Left Column */}
        <S.DetailLeftCol>
          {request.type === 'leave' ? (
            <S.DetailCard>
              <S.DetailCardTitle>
                <IconRequest size={18} />
                Thông tin đơn nghỉ
              </S.DetailCardTitle>

              <S.DetailInfoTable>
                <S.DetailInfoRow>
                  <S.DetailInfoLabel>Ngày xin nghỉ</S.DetailInfoLabel>
                  <S.DetailInfoValue>
                    <S.InfoIconWrapper><IconSchedule size={14} color="var(--muted)" /></S.InfoIconWrapper>
                    {request.type === 'leave' ? request.detail.replace('Xin nghỉ ', '') : request.sentTime}
                  </S.DetailInfoValue>
                </S.DetailInfoRow>

                <S.DetailInfoRow>
                  <S.DetailInfoLabel>Lý do</S.DetailInfoLabel>
                  <S.DetailInfoValue>{request.reason || 'Khám sức khỏe định kỳ'}</S.DetailInfoValue>
                </S.DetailInfoRow>

                <S.DetailInfoRow>
                  <S.DetailInfoLabel>Thời điểm gửi</S.DetailInfoLabel>
                  <S.DetailInfoValue>{request.sentTime}</S.DetailInfoValue>
                </S.DetailInfoRow>
              </S.DetailInfoTable>

              <S.DetailNoteBlock>
                <S.DetailNoteHeader>GHI CHÚ CỦA BẠN</S.DetailNoteHeader>
                <S.DetailNoteContent>
                  {request.note || 'Bé đi khám tổng quát buổi sáng, chiều có thể đến lớp ạ.'}
                </S.DetailNoteContent>
              </S.DetailNoteBlock>

              {request.evidenceUrl && (
                <S.EvidenceBlock>
                  <S.EvidenceHeader>ẢNH MINH CHỨNG</S.EvidenceHeader>
                  <S.MedImageWrapper onClick={() => setZoomedImageUrl(request.evidenceUrl || null)}>
                    <img src={request.evidenceUrl} alt="Ảnh minh chứng xin nghỉ" />
                  </S.MedImageWrapper>
                </S.EvidenceBlock>
              )}
            </S.DetailCard>
          ) : (
            <S.DetailCard>
              <S.DetailCardTitle>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(45deg)', color: 'var(--brand, #005a36)' }}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                Thông tin thuốc · {request.medicines?.length || 1} loại
              </S.DetailCardTitle>

              <S.MedCardsContainer>
                {request.medicines?.map((med, index) => (
                  <S.MedCard key={index}>
                    <S.MedCardHeader>
                      <S.MedNumBadge>{index + 1}</S.MedNumBadge>
                      <S.MedNameText>{med.name}</S.MedNameText>
                    </S.MedCardHeader>

                    <S.MedInfoRow>
                      <S.MedInfoItem>
                        LIỀU
                        <S.MedDosagePill>+ {med.dosage}</S.MedDosagePill>
                      </S.MedInfoItem>
                      <S.MedInfoItem>
                        SỐ LẦN
                        <S.MedTimesText>2 lần/ngày</S.MedTimesText>
                      </S.MedInfoItem>
                    </S.MedInfoRow>

                    {med.timeToTake && (
                      <S.MedInfoRow>
                        <S.MedInfoItem>
                          THỜI ĐIỂM
                          <S.MedTimePill>
                            <IconSchedule size={14} /> {med.timeToTake}
                          </S.MedTimePill>
                        </S.MedInfoItem>
                      </S.MedInfoRow>
                    )}

                    {med.imageUrl ? (
                      <S.MedImageWrapper onClick={() => setZoomedImageUrl(med.imageUrl || null)}>
                        <img src={med.imageUrl} alt={med.name} />
                      </S.MedImageWrapper>
                    ) : (
                      <S.MedImagePlaceholder>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                        ảnh thuốc đính kèm
                      </S.MedImagePlaceholder>
                    )}
                  </S.MedCard>
                ))}
              </S.MedCardsContainer>

              <S.DetailNoteBlock>
                <S.DetailNoteHeader>GHI CHÚ CỦA BẠN</S.DetailNoteHeader>
                <S.DetailNoteContent>
                  {request.note || 'Không có ghi chú nào khác.'}
                </S.DetailNoteContent>
              </S.DetailNoteBlock>

              <S.SentTimeRow>
                <S.DetailInfoLabel>Thời điểm gửi</S.DetailInfoLabel>
                <S.DetailInfoValue>{request.sentTime}</S.DetailInfoValue>
              </S.SentTimeRow>
            </S.DetailCard>
          )}
        </S.DetailLeftCol>

        {/* Right Column */}
        <S.DetailRightCol>
          <S.DetailCard>
            <S.DetailCardTitle>
              <IconSchedule size={18} />
              Tiến trình xử lý
            </S.DetailCardTitle>

            <S.Timeline>
              <S.TimelineItem $status="completed">
                <S.TimelineIcon $status="completed">
                  <IconCheck size={12} />
                </S.TimelineIcon>
                <S.TimelineContent>
                  <S.TimelineTitle>Bạn đã gửi đơn {request.type === 'leave' ? 'xin nghỉ' : 'dặn thuốc'}</S.TimelineTitle>
                  <S.TimelineSub>{request.sentTime}</S.TimelineSub>
                </S.TimelineContent>
              </S.TimelineItem>

              {(request.status === 'approved' || request.status === 'completed' || request.status === 'rejected') && (
                <S.TimelineItem $status="completed">
                  <S.TimelineIcon $status="completed">
                    <IconCheck size={12} />
                  </S.TimelineIcon>
                  <S.TimelineContent>
                    <S.TimelineTitle>{teacherDisplayName} đã tiếp nhận</S.TimelineTitle>
                    <S.TimelineSub>{request.sentTime}</S.TimelineSub>
                  </S.TimelineContent>
                </S.TimelineItem>
              )}

              <S.TimelineItem $status={request.status === 'pending' ? 'waiting' : request.status === 'cancelled' ? 'cancelled' : request.status === 'rejected' ? 'rejected' : 'completed'}>
                <S.TimelineIcon $status={request.status === 'pending' ? 'waiting' : request.status === 'cancelled' ? 'cancelled' : request.status === 'rejected' ? 'rejected' : 'completed'}>
                  {request.status === 'pending' ? (
                    <S.WaitingDot />
                  ) : request.status === 'cancelled' || request.status === 'rejected' ? (
                    <IconClose size={10} />
                  ) : (
                    <IconCheck size={12} />
                  )}
                </S.TimelineIcon>
                <S.TimelineContent>
                  <S.TimelineTitle>
                    {request.status === 'pending' && `Chờ ${isMaleTeacher ? 'thầy' : 'cô'} duyệt đơn`}
                    {request.status === 'approved' && 'Đã duyệt đơn'}
                    {request.status === 'completed' && (request.type === 'leave' ? 'Đã duyệt đơn' : `${teacherDisplayName} đã cho bé uống thuốc`)}
                    {request.status === 'rejected' && 'Từ chối'}
                    {request.status === 'cancelled' && 'Đã hủy'}
                  </S.TimelineTitle>
                  <S.TimelineSub>
                    {request.status === 'pending' && 'Đang chờ'}
                    {request.status === 'approved' && (request.updatedTime || request.sentTime)}
                    {request.status === 'completed' && (request.updatedTime || request.sentTime)}
                    {request.status === 'rejected' && (request.updatedTime || 'Đã từ chối')}
                    {request.status === 'cancelled' && (request.updatedTime || 'Đã hủy')}
                  </S.TimelineSub>
                </S.TimelineContent>
              </S.TimelineItem>
            </S.Timeline>

            <S.TimelineActions>
              {request.status === 'pending' && (
                <S.BtnCancelDetail onClick={handleCancel}>
                  ✕ Hủy đơn
                </S.BtnCancelDetail>
              )}
              <S.BtnBackToList onClick={onBack}>
                Về danh sách
              </S.BtnBackToList>
            </S.TimelineActions>
          </S.DetailCard>
        </S.DetailRightCol>
      </S.DetailGrid>

      {zoomedImageUrl && (
        <S.ZoomOverlay onClick={() => setZoomedImageUrl(null)}>
          <S.ZoomContainer onClick={e => e.stopPropagation()}>
            <S.ZoomCloseBtn onClick={() => setZoomedImageUrl(null)}>✕</S.ZoomCloseBtn>
            <S.ZoomedImg src={zoomedImageUrl} alt="Zoomed medicine" />
          </S.ZoomContainer>
        </S.ZoomOverlay>
      )}
    </>
  );
};
