import React from 'react';
import * as S from './styles';

const ALERTS = [
  { id: 1, name: 'Bé Bảo Long', alert: 'Dị ứng đậu phộng (Rất nghiêm trọng)', severity: 'high' },
  { id: 2, name: 'Bé Hải Anh', alert: 'Đang sốt nhẹ 37.5. Cần theo dõi thêm.', severity: 'medium' },
];

export const HealthAlertsWidget: React.FC = () => {
  return (
    <S.WidgetContainer>
      <S.WidgetHeader>
        <S.Icon>⚠️</S.Icon>
        <S.WidgetTitle>Lưu ý y tế</S.WidgetTitle>
      </S.WidgetHeader>
      
      <S.AlertsList>
        {ALERTS.map(alert => (
          <S.AlertCard key={alert.id} severity={alert.severity}>
            <S.AlertIcon severity={alert.severity}>!</S.AlertIcon>
            <S.AlertContent>
              <S.AlertName severity={alert.severity}>{alert.name}</S.AlertName>
              <S.AlertDesc severity={alert.severity}>{alert.alert}</S.AlertDesc>
            </S.AlertContent>
          </S.AlertCard>
        ))}
      </S.AlertsList>
    </S.WidgetContainer>
  );
};
