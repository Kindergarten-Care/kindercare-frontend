import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

const fadein = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
`;

const pop = keyframes`
  from { opacity: 0; transform: scale(0.94) translateY(8px); }
  to { opacity: 1; transform: none; }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadein} 0.3s ease;
`;

export const HeroBox = styled.div`
  position: relative;
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 20px;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,0.06), 0 2px 6px -1px rgba(0,0,0,0.03);
  overflow: hidden;
`;

export const HeroCover = styled.div`
  position: relative;
  height: 160px;
  background: linear-gradient(120deg, #00794A 0%, #005A36 55%, #00432A 100%);
  overflow: hidden;

  /* Decorative circles */
  &::before {
    content: '';
    position: absolute;
    right: -40px;
    top: -60px;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: rgba(255,255,255,0.07);
  }
  &::after {
    content: '';
    position: absolute;
    right: 120px;
    top: 30px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
  }
`;

export const CoverDeco = styled.span`
  position: absolute;
  left: 40%;
  bottom: -70px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: rgba(255,255,255,0.04);
`;

export const EditProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  height: 38px;
  padding: 0 15px;
  border-radius: 10px;
  border: none;
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(6px);
  color: #fff;
  font-family: inherit;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;
  
  &:hover {
    background: rgba(255,255,255,0.3);
  }
`;

export const IdentitySection = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
  padding: 0 28px 22px;
  margin-top: -52px;
  flex-wrap: wrap;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  flex: none;
`;

export const AvatarInner = styled.div`
  width: 116px;
  height: 116px;
  border-radius: 50%;
  background: linear-gradient(135deg, #34D399, #005A36);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  font-size: 46px;
  box-shadow: 0 0 0 5px #fff, 0 12px 28px -8px rgba(0,90,54,0.4);
  position: relative;
  overflow: hidden;
`;

export const ProfileAvatar = styled(Image)`
  object-fit: cover;
`;

export const StatusDot = styled.span`
  position: absolute;
  right: 8px;
  bottom: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #16a34a;
  box-shadow: 0 0 0 4px #fff;
`;

export const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 18px;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftCol = styled.div`
  position: sticky;
  top: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 980px) {
    position: static;
  }
`;

export const BentoCard = styled.section`
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,0.06), 0 2px 6px -1px rgba(0,0,0,0.03);
  padding: 20px;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 48px -12px rgba(0,90,54,0.16), 0 6px 16px -6px rgba(0,0,0,0.06) !important;
  }
`;

export const CardTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 12px;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 11px 10px;
  border-radius: 12px;
  transition: background 0.15s;

  &:hover {
    background: #F6FAF7;
  }
`;

export const TabBar = styled.div`
  display: inline-flex;
  gap: 4px;
  background: #F1F4F1;
  border: 1px solid #E6EEE9;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  padding: 10px 17px;
  border-radius: 9px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 13.5px;
  white-space: nowrap;
  transition: all 0.2s;

  ${props => props.$active 
    ? `
      font-weight: 700;
      background: #fff;
      color: #005A36;
      box-shadow: 0 2px 8px rgba(0,90,54,0.1);
    ` 
    : `
      font-weight: 600;
      background: transparent;
      color: #6B7280;
    `
  }

  &:hover {
    ${props => !props.$active && 'color: #005A36;'}
  }
`;

export const FadeInContent = styled.div`
  animation: ${fadein} 0.3s ease;
`;

// Modals and Forms
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: rgba(15,23,42,0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${pop} 0.2s ease;
`;

export const ModalContent = styled.div`
  width: 600px;
  max-width: 100%;
  max-height: 88vh;
  overflow: auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 30px 80px rgba(15,23,42,0.3);
  padding: 26px;
`;

export const ModalInput = styled.input`
  height: 46px;
  border: 1px solid #E6EEE9;
  border-radius: 11px;
  padding: 0 14px;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  background: #F8FBF9;
  color: #334155;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #34D399;
    box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.2);
  }
`;

export const PrimaryButton = styled.button`
  height: 46px;
  padding: 0 26px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #00794A, #005A36);
  color: #fff;
  font-family: inherit;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 8px 18px -6px rgba(0,90,54,0.45);
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.97);
  }
`;

export const SecondaryButton = styled.button`
  height: 46px;
  padding: 0 20px;
  border-radius: 12px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #6B7280;
  font-family: inherit;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #F1F4F1;
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  z-index: 9500;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  pointer-events: none;
`;

export const Toast = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 20px;
  border-radius: 13px;
  background: #005A36;
  color: #fff;
  font-size: 13.5px;
  font-weight: 600;
  box-shadow: 0 18px 48px -12px rgba(0,90,54,0.4);
  animation: ${pop} 0.28s cubic-bezier(0.2,0.8,0.3,1);
  max-width: 380px;
`;
