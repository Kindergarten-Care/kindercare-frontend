import React from 'react';
import * as S from './styles';

const NOTICES = [
  { id: 1, title: 'Họp giao ban giáo viên cuối tháng', date: 'Hôm nay, 16:30' },
  { id: 2, title: 'Đăng ký tập huấn phương pháp Montessori', date: '20/05/2026' },
];

export const NoticeboardWidget: React.FC = () => {
  return (
    <S.WidgetContainer>
      <S.WidgetHeader>
        <S.WidgetTitle>Thông báo BGH</S.WidgetTitle>
        <S.Badge>2 MỚI</S.Badge>
      </S.WidgetHeader>
      
      <S.NoticeList>
        {NOTICES.map(notice => (
          <S.NoticeItem key={notice.id}>
            <S.NoticeIcon>📢</S.NoticeIcon>
            <S.NoticeContent>
              <S.NoticeTitle>{notice.title}</S.NoticeTitle>
              <S.NoticeDate>{notice.date}</S.NoticeDate>
            </S.NoticeContent>
          </S.NoticeItem>
        ))}
      </S.NoticeList>
    </S.WidgetContainer>
  );
};
