"use client";
import React from 'react';
import * as S from './MetricCard.styles';

export interface MetricCardProps {
  title: string;
  value: string | number;
  iconBoxBg: string;
  iconBoxContent: React.ReactNode;
  largeIcon: React.ReactNode;
  badgeText: string;
  badgeBg: string;
  badgeColor: string;
  badgeIcon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  iconBoxBg,
  iconBoxContent,
  largeIcon,
  badgeText,
  badgeBg,
  badgeColor,
  badgeIcon
}) => {
  return (
    <S.CardWrapper>
      <S.LargeIconBg>{largeIcon}</S.LargeIconBg>
      <S.CardHeader>
        <S.IconBox bg={iconBoxBg}>{iconBoxContent}</S.IconBox>
        <S.CardTitle>{title}</S.CardTitle>
      </S.CardHeader>
      <S.CardBody>
        <S.CardValue>{value}</S.CardValue>
        <S.BadgeWrapper bg={badgeBg}>
          {badgeIcon && badgeIcon}
          <S.BadgeText color={badgeColor}>{badgeText}</S.BadgeText>
        </S.BadgeWrapper>
      </S.CardBody>
    </S.CardWrapper>
  );
};
