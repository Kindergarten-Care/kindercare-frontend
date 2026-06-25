import styled from 'styled-components';
import Image from 'next/image';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Box = styled.div<{ $spanCol?: number; $spanRow?: number; $bg?: string; $color?: string }>`
  background: ${props => props.$bg || props.theme.colors.surface};
  color: ${props => props.$color || props.theme.colors.fg};
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};
  grid-column: span ${props => props.$spanCol || 1};
  grid-row: span ${props => props.$spanRow || 1};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const AvatarBox = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 4px solid #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  margin-bottom: 16px;
`;

export const ProfileAvatar = styled(Image)`
  object-fit: cover;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 4px 0;
`;

export const SubTitle = styled.p`
  font-size: 15px;
  opacity: 0.8;
  margin: 0;
`;

export const StatNumber = styled.div`
  font-size: 48px;
  font-weight: 900;
  margin-top: auto;
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  margin-bottom: 8px;
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed rgba(0,0,0,0.1);
  padding-bottom: 8px;

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  color: ${props => props.theme.colors.muted};
  font-size: 14px;
`;

export const InfoValue = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

export const ActionButton = styled.button<{ $primary?: boolean }>`
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;
  background: ${props => props.$primary ? props.theme.colors.green : '#E5E7EB'};
  color: ${props => props.$primary ? '#fff' : '#374151'};
  width: 100%;
  margin-top: auto;

  &:hover {
    opacity: 0.9;
  }
`;
