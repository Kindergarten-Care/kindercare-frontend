import styled from 'styled-components';

export const WidgetContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(14, 121, 60, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Icon = styled.span`
  font-size: 20px;
`;

export const WidgetTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #181d18;
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const NotesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const NoteItem = styled.div`
  background-color: #fffbeb;
  border: 1px solid #ffedd5;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
`;

export const ColorBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
  background-color: #fb923c;
`;

export const NoteContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StudentName = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #181d18;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const NoteText = styled.span`
  font-size: 14px;
  font-style: italic;
  color: #3f493f;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  background-color: white;
  border: 1px solid #fdba74;
  border-radius: 4px;
  flex-shrink: 0;
  cursor: pointer;
`;
