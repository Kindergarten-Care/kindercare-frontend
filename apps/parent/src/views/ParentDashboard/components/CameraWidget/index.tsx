import React from 'react';
import * as S from './styles';

const CameraWidget: React.FC = () => {
  return (
    <S.Card>
      <S.SectionHead>
        <S.SectionTitle>
          <span>📷</span> Camera lớp học
        </S.SectionTitle>
      </S.SectionHead>

      <S.CamView onClick={() => alert('Đang mở camera...')}>
        <S.CamLabel>TRỰC TIẾP</S.CamLabel>
        <S.CamPlay>▶</S.CamPlay>
      </S.CamView>
    </S.Card>
  );
};

export default CameraWidget;
