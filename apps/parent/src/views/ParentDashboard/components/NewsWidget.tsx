import React from 'react';
import styled from 'styled-components';
import { WidgetCard, WidgetHeader, WidgetTitle, WidgetLink } from '../styles';
import { NewsItem } from '@/config/types/dashboard';

const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const NewsItemCard = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const NewsImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background: #f1f5f9;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NewsContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CategoryBadge = styled.div`
  background: #007947;
  color: #98ffbf;
  padding: 2px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
  margin-bottom: 8px;
`;

const NewsTitle = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #181d18;
  margin: 0 0 4px 0;
  line-height: 1.5;
`;

const NewsDate = styled.p`
  font-size: 12px;
  color: #3f493f;
  margin: 0;
`;

export const NewsWidget = ({ data }: { data: NewsItem[] }) => {
  return (
    <WidgetCard>
      <WidgetHeader>
        <WidgetTitle>Bảng tin nhà trường</WidgetTitle>
        <WidgetLink>Tất cả bài viết</WidgetLink>
      </WidgetHeader>
      
      <NewsList>
        {data.map((item) => (
          <NewsItemCard key={item.id}>
            <NewsImage>
              <img src={item.imageUrl} alt={item.title} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </NewsImage>
            <NewsContent>
              <CategoryBadge>{item.category}</CategoryBadge>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsDate>{item.date}</NewsDate>
            </NewsContent>
          </NewsItemCard>
        ))}
      </NewsList>
    </WidgetCard>
  );
};
