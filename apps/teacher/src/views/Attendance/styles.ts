import styled, { keyframes } from 'styled-components';

export const floaty = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

export const toastin = keyframes`
  from { opacity: 0; transform: translateX(60px) scale(0.9); }
  to { opacity: 1; transform: none; }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
  color: #1F2937;
  -webkit-font-smoothing: antialiased;
  width: 100%;
`;

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(16, 24, 40, 0.04);
`;

export const ContentContainer = styled.div`
  padding: 26px 0 48px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const ControlRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const DateControl = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background: #fff;
  border: 1px solid #EAEFEA;
  border-radius: 14px;
  padding: 5px;
  box-shadow: 0 2px 10px rgba(16, 24, 40, 0.03);
`;

export const NavButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;

  &:hover {
    background: #F1F5F3;
  }
`;

export const DateLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 12px;
  font-weight: 800;
  font-size: 14.5px;
  color: #1F2937;
  min-width: 170px;
  text-transform: capitalize;
`;

interface ActionButtonProps {
  $primary?: boolean;
}
export const ActionButton = styled.button<ActionButtonProps>`
  height: 48px;
  padding: 0 16px;
  border-radius: 13px;
  border: ${props => props.$primary ? '1px solid #A7F3D0' : '1px solid #EAEFEA'};
  background: ${props => props.$primary ? '#ECFDF5' : '#fff'};
  color: ${props => props.$primary ? '#059669' : '#1F2937'};
  font-family: inherit;
  font-weight: 700;
  font-size: ${props => props.$primary ? '13.5px' : '14px'};
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 9px;

  &:hover {
    background: ${props => props.$primary ? '#D1FAE5' : '#fff'};
    transform: ${props => props.$primary ? 'none' : 'scale(1.02)'};
    box-shadow: ${props => props.$primary ? 'none' : '0 6px 18px rgba(16, 24, 40, 0.08)'};
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
`;

interface StatCardProps {
  $borderColor?: string;
}
export const StatCard = styled.div<StatCardProps>`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(16, 24, 40, 0.04);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  border: ${props => props.$borderColor ? `1px solid ${props.$borderColor}` : 'none'};
`;

interface StatIconProps {
  $bg: string;
  $color: string;
}
export const StatIcon = styled.div<StatIconProps>`
  flex: none;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
`;

export const ViewToggle = styled.div`
  display: flex;
  background: #F1F5F3;
  border-radius: 13px;
  padding: 4px;
  gap: 4px;
`;

export const SortControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #EAEFEA;
  border-radius: 13px;
  padding: 0 14px;
  height: 46px;
  box-shadow: 0 2px 10px rgba(16, 24, 40, 0.03);
`;

export const SortLabel = styled.span`
  font-size: 13px;
  color: #6B7280;
  font-weight: 600;
  white-space: nowrap;
`;

export const SortSelect = styled.select`
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  color: #1F2937;
  cursor: pointer;
  padding-right: 4px;
  
  &:focus {
    color: #10B981;
  }
`;

interface ToggleBtnProps {
  $active: boolean;
}
export const ToggleBtn = styled.button<ToggleBtnProps>`
  display: flex;
  align-items: center;
  gap: 7px;
  height: 38px;
  padding: 0 16px;
  border-radius: 10px;
  border: none;
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.$active ? '#fff' : 'transparent'};
  color: ${props => props.$active ? '#1F2937' : '#9CA3AF'};
  box-shadow: ${props => props.$active ? '0 2px 8px rgba(16, 24, 40, 0.06)' : 'none'};
`;

export const Board = styled.section`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(16, 24, 40, 0.04);
  overflow: hidden;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 70px 24px;
  text-align: center;
`;

export const FloatEmoji = styled.span`
  font-size: 64px;
  animation: ${floaty} 3.5s ease-in-out infinite;
`;

export const ListContainer = styled.div`
  max-height: 540px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d6e2da;
    border-radius: 8px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
`;

export const Th = styled.th`
  position: sticky;
  top: 0;
  z-index: 2;
  background: #fff;
  padding: 15px 24px;
  font-size: 12px;
  font-weight: 800;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 1px solid #EEF2EF;
  text-align: left;
`;

export const Tr = styled.tr`
  transition: background 0.15s;
  border-bottom: 1px solid #F3F4F6;

  &:hover {
    background: #F7FBF8;
  }
`;

export const Td = styled.td`
  padding: 12px 24px;
`;

interface BadgeBtnProps {
  $bg: string;
  $color: string;
  $borderColor: string;
  $dim?: boolean;
}
export const BadgeBtn = styled.button<BadgeBtnProps>`
  height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid ${props => props.$borderColor};
  background: ${props => props.$bg};
  color: ${props => props.$color};
  font-family: inherit;
  font-weight: 700;
  font-size: 12.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${props => props.$dim ? 0.8 : 1};
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`;

export const GridContainer = styled.div`
  padding: 22px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
  gap: 16px;
`;

export const GridCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  padding: 18px 10px;
  border-radius: 18px;
  border: 1px solid #EEF2EF;
  background: #FBFDFC;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(16, 24, 40, 0.08);
  }
`;

interface AvatarProps {
  $color: string;
  $ring: string;
  $dim?: boolean;
}
export const Avatar = styled.span<AvatarProps>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 15px;
  color: #374151;
  background: ${props => props.$color};
  box-shadow: 0 0 0 2.5px ${props => props.$ring};
  opacity: ${props => props.$dim ? 0.6 : 1};
  filter: ${props => props.$dim ? 'grayscale(0.8)' : 'none'};
`;

export const GridAvatar = styled(Avatar)`
  position: relative;
  width: 62px;
  height: 62px;
  font-size: 22px;
  box-shadow: 0 0 0 3px ${props => props.$ring};
`;

export const ToastContainer = styled.div`
  position: fixed;
  top: 84px;
  right: 28px;
  z-index: 9000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  pointer-events: none;
`;

export const ToastMsg = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 18px;
  border-radius: 14px;
  background: #1F2937;
  color: #fff;
  font-size: 13.5px;
  font-weight: 600;
  box-shadow: 0 12px 32px rgba(16, 24, 40, 0.3);
  animation: ${toastin} 0.3s cubic-bezier(0.2, 0.8, 0.3, 1);
  max-width: 340px;
`;

export const PopoverOverlay = styled.div`
  position: fixed;
  z-index: 8000;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #EEF2EF;
  box-shadow: 0 12px 32px rgba(16, 24, 40, 0.12);
  width: 200px;
  overflow: hidden;
  animation: pop 0.2s cubic-bezier(0.2, 0.8, 0.3, 1);
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
`;

export const ViewFormBtn = styled.button`
  margin-left: 8px;
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid #EAEFEA;
  background: #F8FAF8;
  color: #059669;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #ECFDF5;
    border-color: #A7F3D0;
  }
`;

export const ModalApproveBtn = styled.button`
  padding: 8px 20px;
  background: #10B981;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s;
  &:hover {
    background: #059669;
  }
`;

export const ModalRejectBtn = styled.button`
  padding: 8px 20px;
  background: #FFF1F2;
  color: #E11D48;
  font-weight: 600;
  border: 1px solid #FECDD3;
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s;
  &:hover {
    background: #FFE4E6;
  }
`;