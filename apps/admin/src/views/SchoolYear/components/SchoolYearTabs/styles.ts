import styled from 'styled-components';

export const TabsContainer = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
`;

export const TabItem = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? 'linear-gradient(to top, rgba(34, 197, 94, 0.15) 0%, rgba(255, 255, 255, 0) 100%)' : 'none'};
  border: none;
  padding: 8px 16px 10px 16px;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-family: 'Montserrat', sans-serif;
  font-weight: ${props => props.$active ? 700 : 500};
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.$active ? '#16a34a' : '#64748b'};
  border-bottom: ${props => props.$active ? '3px solid #16a34a' : '3px solid transparent'};
  
  transition: all 0.2s;

  &:hover {
    color: #16a34a;
  }
`;
