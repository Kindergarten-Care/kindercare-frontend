'use client';

import React from 'react';
import * as S from './styles';
import { MenuDomainModel } from '@/config/types/menu';

interface DailyMenuWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  menu: MenuDomainModel | null;
}

const MEAL_NAME_MAP: Record<string, string> = {
  Breakfast: 'Bữa sáng',
  Lunch: 'Bữa trưa',
  Snack: 'Bữa xế',
};

const MEAL_ICON_MAP: Record<string, string> = {
  Breakfast: '🥣',
  Lunch: '🍽️',
  Snack: '🧁',
};

const DOW_KEYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DailyMenuWidget: React.FC<DailyMenuWidgetProps> = ({ menu, ...props }) => {
  const todayKey = DOW_KEYS[new Date().getDay()];
  const todayMeals = menu && menu.details
    ? menu.details.filter((meal) => meal.dayOfWeek === todayKey)
    : [];
  const hasDetails = todayMeals.length > 0;

  return (
    <S.Card {...props}>
      <S.CardHead>
        <S.CardTitle>
          <span>🥗</span> Thực đơn hôm nay
        </S.CardTitle>
      </S.CardHead>

      {!hasDetails ? (
        <S.EmptyState>
          <S.EmptyIcon>🥗</S.EmptyIcon>
          <S.EmptyTitle>Chưa cập nhật thực đơn</S.EmptyTitle>
          <S.EmptySub>Thực đơn dinh dưỡng của bé sẽ được cập nhật sớm nhất.</S.EmptySub>
        </S.EmptyState>
      ) : (
        <S.MenuList>
          {todayMeals.map((meal) => {
            const mealName = MEAL_NAME_MAP[meal.mealType] || meal.mealType;
            const mealIcon = MEAL_ICON_MAP[meal.mealType] || '🍲';
            return (
              <S.MenuRow key={meal.menuDetailId}>
                <S.MenuIco>{mealIcon}</S.MenuIco>
                <S.MenuBody>
                  <S.MenuType>{mealName}</S.MenuType>
                  <S.DishName>{meal.dishName}</S.DishName>
                  {meal.nutritionalDetails && (
                    <S.Nutrients>Dinh dưỡng: {meal.nutritionalDetails}</S.Nutrients>
                  )}
                </S.MenuBody>
              </S.MenuRow>
            );
          })}
        </S.MenuList>
      )}
    </S.Card>
  );
};

export default DailyMenuWidget;
