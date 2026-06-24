import styled, { css } from 'styled-components';

export const WidgetContainer = styled.section`
  background: ${props => props.theme.colors.surface};
  border: 1px solid #FCA5A5;
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.soft};
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.16), 0 6px 16px -6px rgba(0, 0, 0, 0.06);

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      height: 10px;
    }
  }
`;

export const HeaderRow = styled.div`
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
  background: #FEE2E2;
  color: #DC2626;
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

export const CounterBadge = styled.span`
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

export const MedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  flex: 1;
  overflow: auto;
  max-height: 430px;
  padding-right: 2px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cfe0d6;
    border-radius: 4px;
  }
`;

export const MedRow = styled.div<{ $done?: boolean }>`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 11px;
  border-radius: 13px;
  background: #FEF2F2;
  border: 1px solid #FECDD3;
  transition: all 0.25s ease;

  ${props => props.$done && css`
    opacity: 0.6;
    background: #F9FAF9;
    border-color: #E2E8F0;
  `}
`;

export const EmojiIcon = styled.span`
  flex: none;
  font-size: 16px;
`;

export const InfoCol = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MedName = styled.div<{ $done?: boolean }>`
  font-size: 13px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
  line-height: 1.4;

  ${props => props.$done && css`
    text-decoration: line-through;
    color: ${props => props.theme.colors.muted};
  `}
`;

export const MedDose = styled.div`
  font-size: 11.5px;
  color: #B91C1C;
  margin-top: 2px;
  font-weight: 500;
`;

export const CheckBox = styled.button<{ $done?: boolean }>`
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1.5px solid #FCA5A5;
  background: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  padding: 0;
  align-self: center;

  &:hover {
    border-color: #DC2626;
    transform: scale(1.05);
  }

  ${props => props.$done && css`
    background: #DC2626;
    border-color: #DC2626;
  `}
`;

export const CheckIcon = styled.span`
  color: #ffffff;
  font-size: 13px;
  line-height: 1;
  font-weight: bold;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 20px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 24px;
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

export const ModalTitle = styled.h3`
  margin: 0 0 20px 0;
  font-family: ${props => props.theme.fonts.display};
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ModalMetaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #E5E7EB;
`;

export const ModalMetaField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

export const ModalLabel = styled.span`
  color: #6B7280;
  font-weight: 500;
`;

export const ModalValue = styled.span<{ $status?: string }>`
  font-weight: 600;
  color: #1F2937;
`;

export const ModalReasonBox = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECDD3;
  border-radius: 12px;
  padding: 14px;
  font-size: 14px;
  color: #991B1B;
  line-height: 1.5;
  margin-bottom: 20px;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid #E5E7EB;
`;

export const ModalActionRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const ModalCloseBtn = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  background: #F3F4F6;
  color: #374151;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #E5E7EB;
  }
`;
