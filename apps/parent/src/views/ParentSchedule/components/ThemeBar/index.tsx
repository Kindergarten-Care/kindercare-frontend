'use client';

import React from 'react';
import { IconClock, IconPin } from '../../icons';
import {
  ThemeBar,
  ThemeItem,
  ThemeIcon,
  ThemeLabel,
  ThemeValue,
  ThemeDivider,
} from './styles';

interface ThemeBarSectionProps {
  monthLabel: string;
  monthTheme: string;
  weekTheme: string;
}

export const ThemeBarSection: React.FC<ThemeBarSectionProps> = ({
  monthLabel,
  monthTheme,
  weekTheme,
}) => (
  <ThemeBar>
    <ThemeItem>
      <ThemeIcon $variant="month"><IconClock size={22} /></ThemeIcon>
      <div>
        <ThemeLabel>Chủ đề tháng {monthLabel}</ThemeLabel>
        <ThemeValue>{monthTheme}</ThemeValue>
      </div>
    </ThemeItem>
    <ThemeDivider />
    <ThemeItem>
      <ThemeIcon $variant="week"><IconPin size={22} /></ThemeIcon>
      <div>
        <ThemeLabel>Chủ đề tuần này</ThemeLabel>
        <ThemeValue>{weekTheme}</ThemeValue>
      </div>
    </ThemeItem>
  </ThemeBar>
);