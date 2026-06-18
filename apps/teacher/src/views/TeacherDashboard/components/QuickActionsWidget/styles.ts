import styled from 'styled-components';

export const GridContainer = styled.div`
  width: 100%;
`;

export const ActionCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 22px;
  box-shadow: 0 4px 20px rgba(16, 24, 40, 0.04);
  border: 1px solid rgba(16, 24, 40, 0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(16, 24, 40, 0.08);
  }
`;

export const ActionIcon = styled.div`
  font-size: 24px;
`;

export const ActionTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #181d18;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
`;
