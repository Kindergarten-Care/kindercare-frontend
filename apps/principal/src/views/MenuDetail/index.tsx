'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { menuService } from '@/services/Menu/MenuService';
import { MenuDetailDto, MealType } from '@/config/types/menu';
import { DayOfWeek } from '@/config/types/scheduleApproval';
import DeleteMenuModal from '@/views/MenuList/components/DeleteMenuModal';
import {
  Container, LoadingText, ErrorText,
  Hero, HeroAv, HeroMain, HeroName, HeroMeta, MPill, HeroActions, BtnDel,
  NoteStrip, MenuWrap, MenuGrid, MgCorner, MgDayHead, MgDayVn, MgDayShort,
  MgMeal, MgMealIc, MgMealLbl, DishCell, DishName, DishCal, DishDetail, DishEmpty, Tip,
} from './styles';

const CLASS_AV = [
  'linear-gradient(140deg,#fcd34d,#f59e0b)',
  'linear-gradient(140deg,#6ee7b7,#10b981)',
  'linear-gradient(140deg,#60a5fa,#2563eb)',
  'linear-gradient(140deg,#fda4af,#f43f5e)',
  'linear-gradient(140deg,#c4b5fd,#8b5cf6)',
  'linear-gradient(140deg,#0a7a4c,#005a36)',
];

const DOW_ORDER: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const DOW_VN: Record<DayOfWeek, string> = {
  Monday: 'Thứ Hai', Tuesday: 'Thứ Ba', Wednesday: 'Thứ Tư', Thursday: 'Thứ Năm',
  Friday: 'Thứ Sáu', Saturday: 'Thứ Bảy', Sunday: 'Chủ Nhật',
};
const DOW_SHORT: Record<DayOfWeek, string> = {
  Monday: 'T2', Tuesday: 'T3', Wednesday: 'T4', Thursday: 'T5', Friday: 'T6', Saturday: 'T7', Sunday: 'CN',
};

const MEALS: { key: MealType; vn: string; c: string; tint: string; icon: React.ReactNode }[] = [
  { key: 'Breakfast', vn: 'Bữa sáng', c: '#f97316', tint: '#ffeedf', icon: <><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" /><path d="M6 2v2M10 2v2M14 2v2" /></> },
  { key: 'Lunch', vn: 'Bữa trưa', c: '#237a3c', tint: '#e8f5ed', icon: <><path d="M5 3v7a2 2 0 0 0 4 0V3M7 10v11" /><path d="M16 3c-1.4 0-2.5 2-2.5 4.5S14.6 12 16 12v9" /></> },
  { key: 'Snack', vn: 'Bữa xế', c: '#db2777', tint: '#fce7f2', icon: <><circle cx="12" cy="13" r="7" /><path d="M9 11h.01M15 11h.01M9.5 15a3 3 0 0 0 5 0" /></> },
];

function formatDate(ts: number) {
  const d = new Date(ts * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

interface MenuDetailProps {
  menuId: string;
}

export default function MenuDetailView({ menuId }: MenuDetailProps) {
  const router = useRouter();
  const [data, setData] = useState<MenuDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [tip, setTip] = useState<{ show: boolean; top: number; left: number; text: string }>({ show: false, top: 0, left: 0, text: '' });

  const fetchDetail = useCallback(async () => {
    try {
      setLoading(true);
      const detail = await menuService.getMenuDetail(menuId);
      setData(detail);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải chi tiết thực đơn');
    } finally {
      setLoading(false);
    }
  }, [menuId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const grid = useMemo(() => {
    if (!data) return {};
    const map: Record<string, MenuDetailDto['menuDetails'][number]> = {};
    data.menuDetails.forEach(d => { map[`${d.dayOfWeek}|${d.mealType}`] = d; });
    return map;
  }, [data]);

  if (loading) return <Container><LoadingText>Đang tải dữ liệu...</LoadingText></Container>;
  if (error) return <Container><ErrorText>{error}</ErrorText></Container>;
  if (!data) return null;

  return (
    <Container>
      <Hero>
        <HeroAv $bg={CLASS_AV[data.classId % CLASS_AV.length]}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v7a2 2 0 0 0 4 0V3M7 10v11" /><path d="M16 3c-1.4 0-2.5 2-2.5 4.5S14.6 12 16 12v9" /></svg>
        </HeroAv>
        <HeroMain>
          <HeroName>{data.menuName}</HeroName>
          <HeroMeta>
            <MPill $brand>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              Tuần {data.weekNumber}/{data.year}
            </MPill>
            <MPill>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
              {data.className}
            </MPill>
            <MPill>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              Cập nhật {formatDate(data.updatedAt)}
            </MPill>
          </HeroMeta>
        </HeroMain>
        <HeroActions>
          <BtnDel onClick={() => setShowDelete(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>
            Xóa thực đơn
          </BtnDel>
        </HeroActions>
      </Hero>

      <NoteStrip>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v4h1" /></svg>
        <span>Đây là trang xem thực đơn, không chỉnh sửa trực tiếp được. Nếu cần đổi món, hãy <b>xóa thực đơn này</b> rồi tải lên thực đơn mới cho đúng lớp và tuần đó (mỗi lớp chỉ có 1 thực đơn cho mỗi tuần). Di chuột vào phần ghi chú dinh dưỡng để xem đầy đủ nội dung.</span>
      </NoteStrip>

      <MenuWrap>
        <MenuGrid>
          <MgCorner />
          {DOW_ORDER.map(day => (
            <MgDayHead key={day}>
              <MgDayVn>{DOW_VN[day]}</MgDayVn>
              <MgDayShort>{DOW_SHORT[day]}</MgDayShort>
            </MgDayHead>
          ))}

          {MEALS.map(meal => (
            <React.Fragment key={meal.key}>
              <MgMeal $c={meal.c} $tint={meal.tint}>
                <MgMealIc $c={meal.c}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{meal.icon}</svg>
                </MgMealIc>
                <MgMealLbl $c={meal.c}>{meal.vn}</MgMealLbl>
              </MgMeal>
              {DOW_ORDER.map(day => {
                const dish = grid[`${day}|${meal.key}`];
                if (!dish) {
                  return (
                    <DishCell key={day}>
                      <DishEmpty><span>Chưa có thực đơn</span></DishEmpty>
                    </DishCell>
                  );
                }
                return (
                  <DishCell key={day} $c={meal.c} $tint={meal.tint}>
                    <DishName>{dish.dishName}</DishName>
                    {dish.calories != null && (
                      <DishCal $c={meal.c} $tint={meal.tint}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2s4 4 4 9a4 4 0 0 1-8 0c0-2 1-3 1-3s3 1 3-6z" /></svg>
                        {dish.calories} kcal
                      </DishCal>
                    )}
                    {dish.nutritionalDetails && (
                      <DishDetail
                        onMouseEnter={e => {
                          const r = e.currentTarget.getBoundingClientRect();
                          setTip({ show: true, top: r.bottom + 8, left: Math.min(window.innerWidth - 270, r.left), text: dish.nutritionalDetails! });
                        }}
                        onMouseLeave={() => setTip(prev => ({ ...prev, show: false }))}
                      >
                        {dish.nutritionalDetails}
                      </DishDetail>
                    )}
                  </DishCell>
                );
              })}
            </React.Fragment>
          ))}
        </MenuGrid>
      </MenuWrap>

      <Tip $show={tip.show} $top={tip.top} $left={tip.left}>
        <b>Dinh dưỡng</b><br />{tip.text}
      </Tip>

      {showDelete && (
        <DeleteMenuModal
          menuName={data.menuName}
          onClose={() => setShowDelete(false)}
          onConfirm={async () => {
            await menuService.deleteMenu(data.id);
            router.push('/menus');
          }}
        />
      )}
    </Container>
  );
}
