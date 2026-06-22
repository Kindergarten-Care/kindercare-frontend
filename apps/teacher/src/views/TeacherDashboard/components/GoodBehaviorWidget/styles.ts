import styled from 'styled-components';

export const WidgetContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.xl};
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.shadows.soft};
  height: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, #F43F5E, #EC4899);
  }
`;

export const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.radius.lg};
  background: #FCE7F3;
  color: #DB2777;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WidgetTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
`;

export const WidgetSubtitle = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.muted};
  font-weight: 500;
`;

export const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 16px;
`;

export const ProgressCircle = styled.div<{ $percent: number }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(
    #EC4899 ${props => props.$percent}%,
    #FCE7F3 ${props => props.$percent}% 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 90px;
    height: 90px;
    background: ${props => props.theme.colors.surface};
    border-radius: 50%;
  }
`;

export const ProgressContent = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProgressValue = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: #BE185D;
  line-height: 1;
`;

export const ProgressLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.theme.colors.muted};
  margin-top: 4px;
`;

export const ActionButton = styled.button`
  margin-top: auto;
  width: 100%;
  padding: 12px;
  background: #EC4899;
  color: white;
  border: none;
  border-radius: ${props => props.theme.radius.md};
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  &:hover {
    background: #BE185D;
    transform: translateY(-2px);
  }
`;

// --- MODAL STYLES ---

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: ${props => props.theme.colors.surface};
  width: 90%;
  max-width: 650px;
  max-height: 85vh;
  border-radius: ${props => props.theme.radius.xl};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FDF2F8;
`;

export const ModalTitleInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #9D174D;
`;

export const ModalSubtitle = styled.span`
  font-size: 13px;
  color: #BE185D;
  font-weight: 500;
  margin-top: 4px;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  color: ${props => props.theme.colors.muted};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.fg};
  }
`;

export const ModalBody = styled.div`
  padding: 0;
  overflow-y: auto;
  flex: 1;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.theme.colors.muted};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  position: sticky;
  top: 0;
  background: ${props => props.theme.colors.surface};
  z-index: 2;

  &:not(:first-child) {
    text-align: center;
    width: 80px;
  }
`;

export const Td = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.fg};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:not(:first-child) {
    text-align: center;
  }
`;

export const StudentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.div<{ $bg: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.$bg};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

export const CheckboxInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;

  &:checked {
    background: #EC4899;
    border-color: #EC4899;
  }

  &:checked::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 14px;
    font-weight: bold;
  }
`;

export const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: ${props => props.theme.colors.surface};
`;

export const CancelButton = styled.button`
  padding: 10px 16px;
  border: 1px solid ${props => props.theme.colors.border};
  background: transparent;
  color: ${props => props.theme.colors.fg};
  border-radius: ${props => props.theme.radius.md};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.bg};
  }
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: #EC4899;
  color: white;
  border-radius: ${props => props.theme.radius.md};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #BE185D;
  }
`;
