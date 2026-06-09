import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

export const ActionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px 30px;
  box-shadow: 0px 4px 10px rgba(14, 121, 60, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 15px rgba(14, 121, 60, 0.1);
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
