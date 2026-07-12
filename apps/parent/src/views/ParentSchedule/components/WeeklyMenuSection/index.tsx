'use client';

import React from 'react';
import { MenuDetailDomainModel } from '@/config/types/menu';
import { IconMealBreakfast } from '../../icons';
import { DOW_LABELS, getMealConfig, getMealConfigByLabel, WeekDayData } from '../../utils';
import {
  Section,
  SecHead,
  SecIcon,
  SecTitle,
  SecSub,
  WeekCols,
  DayCol,
  DayColHead,
  DayColDow,
  DayColDate,
  DayColTodayTag,
  Meal,
  MealLabel,
  MealLabelIcon,
  Dish,
  MealEmpty,
} from './styles';

const pad = (n: number): string => String(n).padStart(2, '0');

interface WeeklyMenuSectionProps {
  days: WeekDayData[];
  weekHasRealMenu: boolean;
  menuName: string | null | undefined;
}

export const WeeklyMenuSection: React.FC<WeeklyMenuSectionProps> = ({
  days,
  weekHasRealMenu,
  menuName,
}) => (
  <Section>
    <SecHead>
      <SecIcon $bg="#FFEEDF" $fg="#F97316"><IconMealBreakfast size={19} /></SecIcon>
      <SecTitle>
        Thực đơn dinh dưỡng trong tuần{menuName ? ` (${menuName})` : ''}
      </SecTitle>
      <SecSub>Thứ 2 – Thứ 6</SecSub>
    </SecHead>
    <WeekCols>
      {days.map((d, i) => {
        const realGroups = (d.menu?.details ?? []).reduce<Record<string, MenuDetailDomainModel[]>>((acc, detail) => {
          const key = getMealConfig(detail.mealType).label;
          (acc[key] ??= []).push(detail);
          return acc;
        }, {});

        const groupEntries = weekHasRealMenu
          ? Object.entries(realGroups)
          : [];
        const hasMenu = groupEntries.length > 0;

        return (
          <DayCol key={i} $today={d.isToday}>
            <DayColHead $today={d.isToday}>
              <div>
                <DayColDow $today={d.isToday}>{DOW_LABELS[i]}</DayColDow>
                <DayColDate>{pad(d.date.getDate())}/{pad(d.date.getMonth() + 1)}</DayColDate>
              </div>
              {d.isToday && <DayColTodayTag>Hôm nay</DayColTodayTag>}
            </DayColHead>
            {hasMenu ? (
              (groupEntries as [string, MenuDetailDomainModel[]][]).map(([label, details]) => {
                const cfg = getMealConfigByLabel(label);
                return (
                  <Meal key={label} $c={cfg.c} $tint={cfg.tint}>
                    <MealLabel>
                      <MealLabelIcon><cfg.Icon size={13} /></MealLabelIcon>
                      {label}
                    </MealLabel>
                    {details.map(detail => (
                      <Dish key={detail.menuDetailId} $c={cfg.c}>{detail.dishName}</Dish>
                    ))}
                  </Meal>
                );
              })
            ) : (
              <MealEmpty>Chưa cập nhật thực đơn</MealEmpty>
            )}
          </DayCol>
        );
      })}
    </WeekCols>
  </Section>
);