import React from 'react';
import * as S from './styles';

const ACTIONS = [
  { id: 1, title: 'Viết nhật ký lớp', icon: '📝' },
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
