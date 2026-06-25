import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

const fadein = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
`;

const drawerin = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const backdrop = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadein} 0.3s ease;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #9CA3AF;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 4px;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #1F2937;
  margin: 0;
  font-family: "Plus Jakarta Sans", sans-serif;
`;

export const StatPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(12px);
  border: 1px solid #E6EEE9;
  border-radius: 11px;
  padding: 7px 14px;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,0.06);
  font-size: 13px;
  font-weight: 600;
`;

export const StatDivider = styled.span`
  width: 1px;
  height: 14px;
  background: #E6EEE9;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  height: 46px;
  padding: 0 16px;
  border-radius: 12px;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(12px);
  border: 1px solid #E6EEE9;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,0.06);
  min-width: 280px;

  &:focus-within {
    border-color: #34D399;
    box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.2);
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: #1F2937;

  &::placeholder {
    color: #9CA3AF;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;

  @media (max-width: 1240px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const StudentCard = styled.button`
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,0.06), 0 2px 6px -1px rgba(0,0,0,0.03);
  padding: 18px;
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 13px;
  transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s, border-color 0.25s;

  &:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 18px 48px -12px rgba(0,90,54,0.16), 0 6px 16px -6px rgba(0,0,0,0.06);
    border-color: #C7DBFB;
  }
`;

export const AvatarBox = styled.div<{ $grad: string }>`
  position: relative;
  flex: none;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${props => props.$grad};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  font-family: "Plus Jakarta Sans", sans-serif;
  overflow: hidden;
`;

export const ProfileAvatar = styled(Image)`
  object-fit: cover;
`;

export const StatusDot = styled.span<{ $active?: boolean }>`
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: ${props => props.$active ? '#16a34a' : '#DC2626'};
  box-shadow: 0 0 0 3px #fff;
`;

export const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
`;

export const StatusTag = styled.span<{ $type: 'present' | 'absent' | 'late' }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 999px;
  background: ${props => props.$type === 'present' ? '#E6F3ED' : props.$type === 'absent' ? '#FEE2E2' : '#FEF3C7'};
  color: ${props => props.$type === 'present' ? '#005A36' : props.$type === 'absent' ? '#DC2626' : '#D97706'};
  border: 1px solid ${props => props.$type === 'present' ? '#C7E3D5' : props.$type === 'absent' ? '#FCA5A5' : '#FCD34D'};
`;

export const AlertTag = styled.span<{ $type: 'allergy' | 'med' }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 999px;
  background: ${props => props.$type === 'allergy' ? '#FEE2E2' : '#E3EDFD'};
  color: ${props => props.$type === 'allergy' ? '#DC2626' : '#2563EB'};
  border: 1px solid ${props => props.$type === 'allergy' ? '#FCA5A5' : '#C7DBFB'};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 70px 20px;
  text-align: center;
  color: #9CA3AF;
`;

// DRAWER COMPONENTS
export const DrawerBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(15,23,42,0.28);
  backdrop-filter: blur(2px);
  animation: ${backdrop} 0.25s ease;
`;

export const Drawer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 91;
  width: 460px;
  max-width: 100%;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-left: 1px solid #E6EEE9;
  box-shadow: -24px 0 64px -24px rgba(0,90,54,0.22);
  display: flex;
  flex-direction: column;
  animation: ${drawerin} 0.32s cubic-bezier(0.32,0.72,0,1);
`;

export const DrawerHeader = styled.div`
  flex: none;
  padding: 22px 24px 16px;
  border-bottom: 1px solid #EEF4F0;
`;

export const DrawerBody = styled.div`
  flex: 1;
  overflow: auto;
  padding: 20px 24px 28px;
`;

export const TabGroup = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 18px;
  background: #F1F4F1;
  border: 1px solid #E6EEE9;
  border-radius: 12px;
  padding: 4px;
`;

export const TabBtn = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 8px 0;
  border-radius: 9px;
  border: none;
  font-family: inherit;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  ${props => props.$active 
    ? `background: #fff; color: #005A36; box-shadow: 0 2px 8px rgba(0,90,54,0.1);` 
    : `background: transparent; color: #6B7280;`
  }

  &:hover {
    ${props => !props.$active && `color: #005A36;`}
  }
`;

export const FadeInContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${fadein} 0.25s ease;
`;

// DRAWER INNER STYLES
export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 11px 12px;
  border-radius: 12px;
  transition: background 0.15s;

  &:hover {
    background: #F6FAF7;
  }
`;

export const ParentCard = styled.div`
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 14px;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,0.06);
  padding: 16px;
`;

export const PrimaryButton = styled.button`
  height: 42px;
  border-radius: 11px;
  border: none;
  background: #005A36;
  color: #fff;
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: transform 0.15s, background 0.15s;

  &:hover {
    transform: scale(1.02);
    background: #004428;
  }
`;

export const SecondaryButton = styled.button`
  height: 42px;
  border-radius: 11px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #005A36;
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background 0.15s;

  &:hover {
    background: #F1F4F1;
  }
`;
