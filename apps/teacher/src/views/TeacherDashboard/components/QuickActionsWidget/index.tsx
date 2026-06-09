import React from 'react';
import * as S from './styles';

const ACTIONS = [
  { id: 1, title: 'Viết nhật ký lớp', icon: '📝' },
  { id: 2, title: 'Đánh giá sự kiện', icon: '⭐' },
  { id: 3, title: 'Yêu cầu vật tư', icon: '📦' },
  { id: 4, title: 'Gọi điện nội bộ', icon: '📞' },
];

export const QuickActionsWidget: React.FC = () => {
  return (
    <S.GridContainer>
      {ACTIONS.map(action => (
        <S.ActionCard key={action.id}>
          <S.ActionIcon>{action.icon}</S.ActionIcon>
          <S.ActionTitle>{action.title}</S.ActionTitle>
        </S.ActionCard>
      ))}
    </S.GridContainer>
  );
};
