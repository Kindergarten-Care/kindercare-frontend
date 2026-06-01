"use client";
import styled from 'styled-components';

export const CardWrapper = styled.div`
  position: relative;
  padding: 24px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 24px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.03);
  outline: 1px solid #F1F5F9;
  outline-offset: -1px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LargeIconBg = styled.div`
  position: absolute;
  right: -10px;
  top: 10px;
  opacity: 0.05;
  pointer-events: none;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconBox = styled.div<{ bg: string }>`
  width: 48px;
  height: 48px;
  background: ${({ bg }) => bg};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardTitle = styled.div`
  color: #64748B;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.70px;
`;

export const CardBody = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

export const CardValue = styled.div`
  color: #1E293B;
  font-size: 48px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  line-height: 1;
`;

export const BadgeWrapper = styled.div<{ bg: string }>`
  background: ${({ bg }) => bg};
  padding: 4px 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 6px;
`;

export const BadgeText = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
`;
