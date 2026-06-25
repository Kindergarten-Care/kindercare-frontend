import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.colors.surface};
  padding: 20px 24px;
  border-radius: 16px;
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${props => props.theme.colors.fg};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const DateSelector = styled.input`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border};
  font-family: inherit;
  font-size: 15px;
  color: ${props => props.theme.colors.fg};
  outline: none;

  &:focus {
    border-color: ${props => props.theme.colors.green};
  }
`;

export const TimelineWrapper = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: 16px;
  padding: 32px;
  box-shadow: ${props => props.theme.shadows.soft};
  position: relative;
`;

export const TimelineLine = styled.div`
  position: absolute;
  left: 56px;
  top: 40px;
  bottom: 40px;
  width: 2px;
  background: #E5E7EB;
  z-index: 1;
`;

export const TimelineItem = styled.div`
  display: flex;
  gap: 24px;
  position: relative;
  z-index: 2;
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const TimeColumn = styled.div`
  width: 60px;
  text-align: right;
  flex-shrink: 0;
`;

export const TimeText = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
`;

export const TimelineDot = styled.div<{ $type?: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => {
    switch (props.$type) {
      case 'Meal': return '#F59E0B'; // Amber
      case 'Sleep': return '#3B82F6'; // Blue
      case 'Play': return '#10B981'; // Green
      default: return '#A7C9B6'; // Default green
    }
  }};
  border: 4px solid ${props => props.theme.colors.surface};
  box-shadow: 0 0 0 2px ${props => {
    switch (props.$type) {
      case 'Meal': return '#FDE68A'; 
      case 'Sleep': return '#BFDBFE'; 
      case 'Play': return '#A7F3D0'; 
      default: return '#E6EEE9';
    }
  }};
  margin-top: 2px;
  position: relative;
  left: -28px;
`;

export const ContentBox = styled.div`
  flex: 1;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.2s, border-color 0.2s;

  &:hover {
    transform: translateX(4px);
    border-color: ${props => props.theme.colors.green};
  }
`;

export const ActivityTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
  margin: 0;
`;

export const ActivityDesc = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.muted};
  margin: 0;
  line-height: 1.5;
`;

export const TagsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

export const Tag = styled.span`
  font-size: 11px;
  font-weight: 600;
  background: #E5E7EB;
  color: #4B5563;
  padding: 4px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
