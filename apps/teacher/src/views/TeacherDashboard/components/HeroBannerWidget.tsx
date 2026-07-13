import React from 'react';
import styled, { keyframes } from 'styled-components';
import { QrCode } from 'lucide-react';

interface HeroBannerProps {
  className: string;
  presentCount: number;
  totalCount: number;
  onOpenScanner: () => void;
  onOpenPhotoScanner?: () => void;
}

const bob = keyframes`
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50% { transform: translateY(-10px) rotate(3deg); }
`;

const BannerSection = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(120deg, #005A36 0%, #00794A 60%, #0A8A57 100%);
  box-shadow: 0 18px 44px -18px rgba(0, 90, 54, 0.5);
  padding: 34px 36px;
  min-height: 200px;
  display: flex;
  align-items: center;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(420px 280px at 88% 120%, rgba(255,255,255,.12), transparent 60%);
`;

const ContentWrapper = styled.div`
  position: relative;
  flex: 1;
  max-width: 60%;
  z-index: 2;
`;

const Subtitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .14em;
  color: #A7E0C6;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -.02em;
  margin-top: 8px;
  margin-bottom: 0;
`;

const StatsText = styled.div`
  font-size: 13.5px;
  color: #D7EFE3;
  font-weight: 500;
  margin-top: 8px;
`;

const ScanButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
  height: 48px;
  padding: 0 14px 0 22px;
  border-radius: 14px;
  border: none;
  background: #fff;
  color: #005A36;
  font-family: inherit;
  font-weight: 800;
  font-size: 14.5px;
  cursor: pointer;
  box-shadow: 0 10px 24px -10px rgba(0,0,0,.4);
  transition: transform .15s;

  &:hover {
    transform: scale(1.03);
  }
  &:active {
    transform: scale(0.97);
  }
`;

const SecondaryButton = styled(ScanButton)`
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  backdrop-filter: blur(4px);
`;

const IconBox = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #005A36;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IllustrationWrapper = styled.div`
  position: relative;
  flex: none;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 96px;
  line-height: 1;
  filter: drop-shadow(0 12px 18px rgba(0,0,0,.25));
  z-index: 2;
`;

const FloatEmoji = styled.span<{ $delay?: string }>`
  display: inline-block;
  animation: ${bob} 4s ease-in-out infinite;
  ${props => props.$delay && `animation-delay: ${props.$delay};`}
`;

export const HeroBannerWidget: React.FC<HeroBannerProps> = ({ 
  className, 
  presentCount, 
  totalCount, 
  onOpenScanner,
  onOpenPhotoScanner 
}) => {
  const percent = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  return (
    <BannerSection>
      <BackgroundOverlay />
      <ContentWrapper>
        <Subtitle>{className} · Hôm nay</Subtitle>
        <Title>Chụp ảnh — điểm danh<br/>tức thì, chính xác ✨</Title>
        <StatsText>{presentCount}/{totalCount} bé đã đến lớp · {percent}% sĩ số</StatsText>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          {onOpenPhotoScanner && (
            <ScanButton onClick={onOpenPhotoScanner}>
              Chụp ảnh điểm danh
              <IconBox style={{ background: '#004d2e', width: '28px', height: '28px', borderRadius: '50%', color: '#fff' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: 1, paddingBottom: '2px' }}>&rsaquo;</span>
              </IconBox>
            </ScanButton>
          )}
        </div>
      </ContentWrapper>
      
      <IllustrationWrapper>
        <FloatEmoji>🧒</FloatEmoji>
        <FloatEmoji $delay="0.6s" style={{ marginLeft: '-10px' }}>👧</FloatEmoji>
        <FloatEmoji $delay="0.3s" style={{ position: 'absolute', top: '6px', right: '18px', fontSize: '30px' }}>🎈</FloatEmoji>
        <FloatEmoji $delay="0.5s" style={{ position: 'absolute', bottom: '6px', left: '14px', fontSize: '26px' }}>⭐</FloatEmoji>
      </IllustrationWrapper>
    </BannerSection>
  );
};
