import styled, { css } from 'styled-components';

export const WidgetContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(14, 121, 60, 0.05);
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const WidgetTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #181d18;
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-left: 32px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 11px;
    width: 2px;
    background-color: rgba(190, 202, 188, 0.3);
  }
`;

export const TimelineItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const TimeLabel = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #6f7a6e;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const ActivityText = styled.div<{ completed?: boolean }>`
  font-size: 16px;
  color: #3f493f;
  font-family: 'Plus Jakarta Sans', sans-serif;
  ${props => props.completed && css`
    text-decoration: line-through;
    opacity: 0.6;
  `}
`;

export const CircleIcon = styled.div<{ variant: 'completed' | 'active' | 'upcoming' }>`
  position: absolute;
  left: -28px;
  top: 4px;
  border-radius: 50%;
  
  ${props => props.variant === 'completed' && css`
    width: 20px;
    height: 20px;
    background-color: #becabc;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 0px 4px white;
  `}

  ${props => props.variant === 'active' && css`
    width: 20px;
    height: 20px;
    background-color: #005e2c;
    box-shadow: 0px 0px 0px 4px #0e793c;
  `}

  ${props => props.variant === 'upcoming' && css`
    width: 24px;
    height: 24px;
    background-color: white;
    border: 2px solid #becabc;
    left: -30px;
    top: 2px;
    box-shadow: 0px 0px 0px 4px white;
  `}
`;

export const CheckIcon = styled.div`
  width: 10px;
  height: 7px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg);
  margin-top: -2px;
`;

export const ActiveActivityCard = styled.div`
  background-color: #dcfce7;
  border: 1px solid #0e793c;
  border-radius: 12px;
  padding: 21px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0px 1px 1px rgba(0,0,0,0.05);
`;

export const ActiveHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ActiveStatus = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #0e793c;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const ActiveBadge = styled.div`
  background-color: #0e793c;
  color: white;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const ActiveTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #005e2c;
  margin: 4px 0 0 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const ActiveDesc = styled.p`
  font-size: 14px;
  color: #3f493f;
  margin: 0 0 12px 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const UpdateButton = styled.button`
  background: white;
  border: 1px solid #0e793c;
  border-radius: 8px;
  padding: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #0e793c;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Plus Jakarta Sans', sans-serif;
  cursor: pointer;

  &:hover {
    background: #f6fbf2;
  }
`;

export const UpdateIcon = styled.span`
  font-size: 16px;
`;
