import React from 'react';
import * as S from './styles';
import { TimelineEvent } from '@/config/types/dashboard';

interface TimelineWidgetProps {
  events: TimelineEvent[];
}

const TimelineWidget: React.FC<TimelineWidgetProps> = ({ events }) => {
  return (
    <S.TimelineWrap>
      <S.SectionHead>
        <S.SectionTitle>
          <span>📋</span> Lịch trình hôm nay
        </S.SectionTitle>
        <S.SectionLink>Xem toàn bộ &rarr;</S.SectionLink>
      </S.SectionHead>

      <div style={{ marginTop: '16px' }}>
        {events.map((ev, i) => {
          const isLast = i === events.length - 1;
          
          return (
            <React.Fragment key={ev.id}>
              {ev.isNow && (
                <S.TlNowDivider>
                  <S.NdLine />
                  <S.NdLabel>Bây giờ</S.NdLabel>
                  <S.NdLine />
                </S.TlNowDivider>
              )}
              <S.TlItem>
                <S.TlLeft>
                  <S.TlTime>{ev.time}</S.TlTime>
                </S.TlLeft>
                <S.TlSpine>
                  <S.TlDot $type={ev.type}>
                    {ev.icon}
                  </S.TlDot>
                  {!isLast && <S.TlLine />}
                </S.TlSpine>
                <S.TlContent $isLast={isLast}>
                  <S.TlEventLabel $isUpcoming={ev.type === 'upcoming'}>
                    {ev.title}
                    {ev.isNow && <S.NowBadge>ĐANG DIỄN RA</S.NowBadge>}
                  </S.TlEventLabel>
                  {ev.type === 'upcoming' ? (
                    <S.TlUpcomingLabel>{ev.description}</S.TlUpcomingLabel>
                  ) : (
                    <S.TlDesc>{ev.description}</S.TlDesc>
                  )}
                  {ev.photos && ev.photos.length > 0 && (
                    <S.TlPhotoRow>
                      {ev.photos.map((ph, idx) => (
                        <S.TlPhoto key={idx} $bg={idx === 0 ? '#e0f2fe' : idx === 1 ? '#dcfce7' : '#fef3c7'}>
                          {ph}
                        </S.TlPhoto>
                      ))}
                    </S.TlPhotoRow>
                  )}
                </S.TlContent>
              </S.TlItem>
            </React.Fragment>
          );
        })}
      </div>
    </S.TimelineWrap>
  );
};

export default TimelineWidget;
