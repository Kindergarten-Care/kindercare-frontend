'use client';

import styled from 'styled-components';

export const Card = styled.div`
  background: var(--surface, #fff);
  border: 1px solid var(--border, #e6eee9);
  border-radius: 16px;
  padding: 20px 22px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 0;
  box-sizing: border-box;
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1f2937;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

export const MenuRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 13px;
  background: #fffcf8;
  border: 1px solid #fef3c7;
`;

export const MenuIco = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #fffbeb;
  color: #d97706;
  display: grid;
  place-items: center;
  font-size: 20px;
  flex-shrink: 0;
`;

export const MenuBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MenuType = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #d97706;
  margin-bottom: 3px;
`;

export const DishName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.3;
`;

export const Nutrients = styled.div`
  font-size: 12.5px;
  color: #6b7280;
  margin-top: 3px;
  line-height: 1.45;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 28px 16px;
  text-align: center;
  flex: 1;
`;

export const EmptyIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: #fffbeb;
  color: #d97706;
  display: grid;
  place-items: center;
`;

export const EmptyTitle = styled.div`
  font-size: 13.5px;
  font-weight: 600;
  color: #1f2937;
`;

export const EmptySub = styled.div`
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
`;
