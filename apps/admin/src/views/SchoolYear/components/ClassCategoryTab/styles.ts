import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e3e5;
  box-shadow: 0px 4px 24px 0px rgba(0,0,0,0.03);
  overflow: hidden;
  margin-top: 32px;
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  background: #f7fafc;
  padding: 24px;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #3f493d;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  border-bottom: 1px solid #e0e3e5;
  
  &:last-child {
    text-align: right;
  }
`;

export const Td = styled.td`
  padding: 24px;
  border-bottom: 1px solid #ebeef0;
  vertical-align: middle;
  
  &:last-child {
    text-align: right;
  }
`;

export const ClassNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconBox = styled.div<{ $bgColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ClassNameText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #181c1e;
`;

export const CodeBadge = styled.span`
  background: #e0e3e5;
  padding: 4px 10px;
  border-radius: 6px;
  font-family: 'Lexend', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #3f493d;
`;

export const AgeText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #3f493d;
`;

export const ClassCountText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #181c1e;
`;

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s;
  
  tr:hover & {
    opacity: 1;
  }
`;

export const ActionIconBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #3f493d;
  
  &:hover {
    background-color: #f1f5f9;
  }
`;
