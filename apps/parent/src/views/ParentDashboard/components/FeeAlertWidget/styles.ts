'use client';

import styled from 'styled-components';

export const FeeCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: 20px 22px;
  background: linear-gradient(105deg, #fff8ec 0%, #fef3c7 100%);
  border: 1px solid #f6e2a8;
  display: flex;
  align-items: center;
  gap: 18px;
  box-shadow: 0 6px 22px -8px rgba(217, 119, 6, 0.22);
`;

export const Glow = styled.div`
  position: absolute;
  right: -40px;
  top: -60px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(217, 119, 6, 0.16), transparent 70%);
  pointer-events: none;
`;

export const Ico = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: #d97706;
  color: #fff;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-size: 22px;
  box-shadow: 0 8px 18px -6px rgba(217, 119, 6, 0.5);
`;

export const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #92400e;
`;

export const Sub = styled.p`
  font-size: 13.5px;
  color: #a86412;
  margin-top: 3px;
  font-weight: 500;
`;

export const AmtBlock = styled.div`
  text-align: right;
  flex-shrink: 0;
`;

export const Amt = styled.div`
  font-size: 19px;
  font-weight: 800;
  color: #92400e;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

export const AmtSub = styled.small`
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: #b0710f;
  letter-spacing: 0.02em;
  margin-top: 3px;
`;

export const PayBtn = styled.button`
  background: #d97706;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 8px 18px -6px rgba(217, 119, 6, 0.5);
  transition: transform 0.12s, background 0.15s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    transform: scale(1.02);
    background: #c26905;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: rgba(168, 100, 18, 0.08);
  color: #a86412;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 14px;
  transition: background 0.15s;

  &:hover { background: rgba(168, 100, 18, 0.16); }
`;
