import React from 'react';
import { Reveal } from '@/UIKit';
import { STATS } from '@/resources/landingContent';
import { useTranslation } from '@kindercare/ui';
import { StatItemRoot, StatLabel, StatNum, StatsBarRoot, StatsInner } from './styles';

export function StatsBar(): React.ReactElement {
  const { t } = useTranslation();
  
  const stats = STATS.map((stat, index) => ({
    ...stat,
    label: t(`Landing.Stats.stat${index + 1}.label`),
  }));

  return (
    <StatsBarRoot>
      <StatsInner>
        {stats.map((stat) => (
          <Reveal key={stat.label}>
            <StatItemRoot>
              <StatNum>
                {stat.value}
                {stat.suffix && <sup>{stat.suffix}</sup>}
              </StatNum>
              <StatLabel>{stat.label}</StatLabel>
            </StatItemRoot>
          </Reveal>
        ))}
      </StatsInner>
    </StatsBarRoot>
  );
}
