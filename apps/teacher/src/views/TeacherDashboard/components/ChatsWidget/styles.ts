import styled from 'styled-components';

export const WidgetContainer = styled.section`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.soft};
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.16), 0 6px 16px -6px rgba(0, 0, 0, 0.06);
  }
`;

export const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 14px;
`;

export const HeaderIconWrapper = styled.span`
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.radius.md};
  background: ${props => props.theme.colors.greenXLight};
  color: ${props => props.theme.colors.green};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WidgetTitle = styled.span`
  font-family: ${props => props.theme.fonts.display};
  font-weight: 700;
  font-size: 15px;
  color: ${props => props.theme.colors.fg};
  flex: 1;
`;

export const UnreadCount = styled.span`
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: ${props => props.theme.radius.pill};
  background: #DC2626;
  color: ${props => props.theme.colors.white};
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

export const ChatButton = styled.button`
  display: flex;
  gap: 11px;
  padding: 10px;
  border-radius: 13px;
  border: none;
  background: #F8FBF9;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
  width: 100%;

  &:hover {
    background: #E6F3ED;
  }
`;

export const AvatarCircle = styled.span<{ $background: string }>`
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: ${props => props.theme.radius.pill};
  background: ${props => props.$background};
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  font-family: ${props => props.theme.fonts.display};
`;

export const ChatContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ChatHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`;

export const PartnerName = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
`;

export const MessageTime = styled.span`
  font-size: 11px;
  color: ${props => props.theme.colors.muted};
`;

export const MessagePreview = styled.div`
  font-size: 12.5px;
  color: ${props => props.theme.colors.muted};
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
