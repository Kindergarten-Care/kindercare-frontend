import React from 'react';
import * as S from './styles';

const QuickActionsStrip: React.FC = () => {
  return (
    <S.StripContainer>
      <S.Pill $variant="primary" onClick={() => alert('Báo nghỉ')}>
        <S.PillIco>🚫</S.PillIco>Báo nghỉ học
      </S.Pill>
      <S.Pill onClick={() => alert('Nhắn giáo viên')}>
        <S.PillIco>💬</S.PillIco>Nhắn giáo viên
        <S.PillBadge>3</S.PillBadge>
      </S.Pill>
      <S.Pill $variant="warn" onClick={() => alert('Đóng học phí')}>
        <S.PillIco>💳</S.PillIco>Đóng học phí
      </S.Pill>
      <S.Pill onClick={() => alert('Thực đơn')}>
        <S.PillIco>🍱</S.PillIco>Xem thực đơn
      </S.Pill>
      <S.Pill onClick={() => alert('Kết quả học tập')}>
        <S.PillIco>📊</S.PillIco>Kết quả học tập
      </S.Pill>
      <S.Pill onClick={() => alert('Hồ sơ bé')}>
        <S.PillIco>👤</S.PillIco>Hồ sơ bé
      </S.Pill>
      <S.Pill onClick={() => alert('Xem camera')}>
        <S.PillIco>📷</S.PillIco>Xem camera
      </S.Pill>
    </S.StripContainer>
  );
};

export default QuickActionsStrip;
