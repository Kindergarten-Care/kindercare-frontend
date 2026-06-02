import React from 'react';
import styled from 'styled-components';
import { WidgetCard, WidgetHeader, WidgetTitle, WidgetLink } from '../styles';
import { Moment } from '@/config/types/dashboard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  border-radius: 8px;
  overflow: hidden;
`;

const ImageWrapper = styled.div<{ $isMore?: boolean }>`
  aspect-ratio: 1;
  background: #f1f5f9;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${props => props.$isMore && `
    &::after {
      content: '+12';
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 16px;
      font-weight: 500;
    }
  `}
`;

export const MomentsWidget = ({ data }: { data: Moment[] }) => {
  return (
    <WidgetCard>
      <WidgetHeader>
        <WidgetTitle>Khoảnh khắc</WidgetTitle>
        <WidgetLink>Xem thêm</WidgetLink>
      </WidgetHeader>
      
      <Grid>
        {data.slice(0, 3).map((moment) => (
          <ImageWrapper key={moment.id}>
            <img src={moment.url} alt="Moment" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </ImageWrapper>
        ))}
        {/* Placeholder for the "+12" tile */}
        <ImageWrapper $isMore>
          <img src="/assets/mock/more.png" alt="More" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </ImageWrapper>
      </Grid>
    </WidgetCard>
  );
};
