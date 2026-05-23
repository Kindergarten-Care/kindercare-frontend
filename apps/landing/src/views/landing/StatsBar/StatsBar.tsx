import React from 'react';
import { Reveal } from '@/UIKit';
import { STATS } from '@/resources/landingContent';
import { StatItemRoot, StatLabel, StatNum, StatsBarRoot, StatsInner } from './styles';

export function StatsBar(): React.ReactElement {
  return (
    <StatsBarRoot>
      <StatsInner>
        {STATS.map((stat) => (
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
