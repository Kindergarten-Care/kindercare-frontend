import styled, { css } from 'styled-components';

export const WidgetContainer = styled.section`
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(16, 24, 40, 0.04);
  border-top: 4px solid #10B981;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  box-sizing: border-box;
  border-left: 1px solid rgba(16, 24, 40, 0.03);
  border-right: 1px solid rgba(16, 24, 40, 0.03);
  border-bottom: 1px solid rgba(16, 24, 40, 0.03);
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #1F2937;
  margin: 0;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
`;

export const BatchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  height: 38px;
  padding: 0 16px;
  border-radius: 11px;
  border: 1px solid #A7F3D0;
  background: #ECFDF5;
  color: #059669;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;

  &:hover {
    background: #D1FAE5;
    transform: scale(1.03);
  }
`;

export const SubtitleRow = styled.div`
  display: flex;
  gap: 14px;
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  flex-wrap: wrap;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(58px, 1fr));
  gap: 14px 8px;
`;

export const StudentButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  outline: none;
`;

export const AvatarRing = styled.span<{ $status: 'none' | 'eat-all' | 'slow-eater' | 'skip-meal'; $color: string }>`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14.5px;
  color: #374151;
  background: ${props => props.$color};
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid transparent;
    transition: all 0.2s ease;
  }

  ${props => props.$status === 'eat-all' && css`
    &::after {
      border-color: #10B981;
      border-style: solid;
    }
  `}

  ${props => props.$status === 'slow-eater' && css`
    &::after {
      border-color: #F59E0B;
      border-style: dashed;
    }
  `}

  ${props => props.$status === 'skip-meal' && css`
    &::after {
      border-color: #EF4444;
      border-style: dotted;
      border-width: 2.5px;
    }
  `}
`;

export const BadgeIcon = styled.span<{ $status: 'eat-all' | 'slow-eater' | 'skip-meal' }>`
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);

  ${props => props.$status === 'eat-all' && css`
    background: #10B981;
  `}

  ${props => props.$status === 'slow-eater' && css`
    background: #F59E0B;
  `}

  ${props => props.$status === 'skip-meal' && css`
    background: #EF4444;
  `}
`;

export const StudentName = styled.span`
  font-size: 10.5px;
  font-weight: 600;
  color: #6B7280;
  max-width: 58px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
`;
