import styled from 'styled-components';

export const WidgetContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(14, 121, 60, 0.05);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const WidgetTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #181d18;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
`;

export const Badge = styled.div`
  background-color: #97f7ac;
  color: #00210b;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 4px;
`;

export const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NoticeItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const NoticeIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e8f5e9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
`;

export const NoticeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NoticeTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #181d18;
  font-family: 'Montserrat', sans-serif;
`;

export const NoticeDate = styled.span`
  font-size: 14px;
  color: #6f7a6e;
  font-family: 'Montserrat', sans-serif;
`;
