"use client";
import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: linear-gradient(0deg, #F0FDF4 0%, #F0FDF4 100%), ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const MainWorkspace = styled.div`
  width: 100%;
  max-width: 1640px;
  padding: 31px 32px 173px 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HeaderTitle = styled.h2`
  color: #1E293B;
  font-size: 32px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
`;

export const HeaderSubtitle = styled.p`
  color: #64748B;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
`;

export const MetricCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  width: 100%;
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints?.lg || '1024px'}) {
    grid-template-columns: 1fr;
  }
`;
