"use client";
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 24px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.03);
  outline: 1px solid #F1F5F9;
  outline-offset: -1px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h3`
  color: #1E293B;
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export const ChartContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PieChartPlaceholderWrapper = styled.div`
  padding-bottom: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PieChartPlaceholder = styled.div`
  width: 224px;
  height: 224px;
  background: transparent;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  /* A simple conic gradient to simulate the pie chart based on 65%, 25%, 10% */
  background: conic-gradient(
    #86EFAC 0% 65%,
    #7DD3FC 65% 90%,
    #FDE047 90% 100%
  );
`;

export const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const LegendItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-radius: 12px;
`;

export const LegendLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ColorDot = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ color }) => color};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
`;

export const LegendLabel = styled.span`
  color: #334155;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
`;

export const LegendValue = styled.span`
  color: #64748B;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  letter-spacing: 0.28px;
`;
