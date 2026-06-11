import React from 'react';
import * as S from './styles';
import { ChildHeroInfo } from '@/config/types/dashboard';

interface ChildHeroWidgetProps {
  data: ChildHeroInfo;
}

const ChildHeroWidget: React.FC<ChildHeroWidgetProps> = ({ data }) => {
  return (
    <S.HeroContainer>
      <S.AvWrap>
        <S.Av>👧</S.Av>
        <S.StatusBadge />
      </S.AvWrap>
      <S.Info>
        <S.Name>{data.name}</S.Name>
        <S.Meta>{`${data.className} · Cô ${data.teacher} · ${data.branch}`}</S.Meta>
        <S.Tags>
          {data.statusTags.map((tag, idx) => (
            <S.Tag key={idx} $type={tag.type}>{tag.label}</S.Tag>
          ))}
        </S.Tags>
      </S.Info>
      <S.Right>
        <S.CheckinCard>
          <S.CheckinLabel>Check-in hôm nay</S.CheckinLabel>
          <S.CheckinTime>{data.checkinTime}</S.CheckinTime>
          <S.CheckinSub>{data.checkinSub}</S.CheckinSub>
        </S.CheckinCard>
        <S.Actions>
          <S.BtnAbsence onClick={() => alert('Báo nghỉ')}>🚫 Báo nghỉ</S.BtnAbsence>
          <S.BtnMsg onClick={() => alert('Nhắn tin')}>💬 Nhắn GV</S.BtnMsg>
        </S.Actions>
      </S.Right>
    </S.HeroContainer>
  );
};

export default ChildHeroWidget;
