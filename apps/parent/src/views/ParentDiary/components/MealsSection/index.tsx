import React from 'react';
import * as S from './styles';
import { Svg } from '../Svg';
import { MenuDomainModel } from '@/config/types/menu';
import { DailyActivityDomainModel } from '@/config/types/dailyActivity';

interface MealsSectionProps {
  menu: MenuDomainModel | null;
  activity: DailyActivityDomainModel | null;
}

const MEAL_NAME_MAP: Record<string, string> = {
  Breakfast: 'Bữa sáng',
  Lunch: 'Bữa trưa',
  Snack: 'Bữa xế',
};

function getRateType(status: string | null | undefined): 'good' | 'ok' | 'low' | 'info' {
  if (!status) return 'info';
  const s = status.trim().toLowerCase();
  if (s.includes('hết') || s.includes('ngoan') || s.includes('tốt')) return 'good';
  if (s.includes('chậm') || s.includes('ít') || s.includes('bình thường')) return 'ok';
  if (s.includes('bỏ') || s.includes('không') || s.includes('kém')) return 'low';
  return 'info';
}

export function MealsSection({ menu, activity }: MealsSectionProps) {
  const getMealStatus = (mealType: string) => {
    if (!activity) return 'Chưa ghi nhận';
    if (mealType === 'Breakfast') return activity.breakfastStatus || 'Chưa ghi nhận';
    if (mealType === 'Lunch') return activity.lunchStatus || 'Chưa ghi nhận';
    if (mealType === 'Snack') return activity.snackStatus || 'Chưa ghi nhận';
    return 'Chưa ghi nhận';
  };

  const hasDetails = menu && menu.details && menu.details.length > 0;

  return (
    <S.Sec>
      <S.SecHead>
        <S.SecIco style={{ background: '#FFEEDF', color: '#F97316' }}>
          <Svg size={18}>
            <path d="M5 3v7a2 2 0 0 0 4 0V3M7 10v11" />
            <path d="M16 3c-1.4 0-2.5 2-2.5 4.5S14.6 12 16 12v9" />
          </Svg>
        </S.SecIco>
        <S.SecTitle>Ăn uống thế nào?</S.SecTitle>
      </S.SecHead>
      <S.TileCard>
        {!hasDetails ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)' }}>
            Chưa cập nhật thực đơn hôm nay
          </div>
        ) : (
          menu.details.map((meal, i) => {
            const mealName = MEAL_NAME_MAP[meal.mealType] || meal.mealType;
            const status = getMealStatus(meal.mealType);
            const rateType = getRateType(status);

            return (
              <S.Tile key={meal.menuDetailId}>
                <S.TileIco style={{ background: '#FFEEDF', color: '#F97316' }}>
                  <Svg size={20}>
                    {meal.mealType === 'Lunch' ? (
                      <>
                        <path d="M4 4c0 4 2 6 5 6s5-2 5-6M9 10v11" />
                        <circle cx="17.5" cy="7" r="3.5" />
                        <path d="M17.5 10.5V21" />
                      </>
                    ) : meal.mealType === 'Snack' ? (
                      <>
                        <circle cx="12" cy="13" r="7" />
                        <path d="M9 11h.01M15 11h.01M9.5 15a3 3 0 0 0 5 0" />
                      </>
                    ) : (
                      <>
                        <path d="M5 3v7a2 2 0 0 0 4 0V3M7 10v11" />
                        <path d="M16 3c-1.4 0-2.5 2-2.5 4.5S14.6 12 16 12v9" />
                      </>
                    )}
                  </Svg>
                </S.TileIco>
                <S.TileBody>
                  <S.TileName>{mealName}</S.TileName>
                  <S.TileDesc>
                    Món: <b>{meal.dishName}</b>
                    {meal.nutritionalDetails && ` (${meal.nutritionalDetails})`}
                  </S.TileDesc>
                </S.TileBody>
                <S.Rate $type={rateType}>{status}</S.Rate>
              </S.Tile>
            );
          })
        )}
      </S.TileCard>
    </S.Sec>
  );
}
