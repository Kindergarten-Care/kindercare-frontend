import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const HeroSection = styled.section`
  padding: 120px 48px 80px;
  background: linear-gradient(135deg, ${props => props.theme.colors.bgWhite} 0%, ${props => props.theme.colors.accentMint}33 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 100px 24px 60px;
    gap: 48px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  z-index: 2;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.accentYellow};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: 9999px;
  margin-bottom: 24px;
`;

const BadgeText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.accentDarkGreen};
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: ${props => props.theme.colors.textDark};
  line-height: 1.2;
  margin-bottom: 24px;
  letter-spacing: -0.02em;

  span {
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: ${props => props.theme.colors.textGray};
  margin-bottom: 40px;
  opacity: 0.9;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.bgWhite};
  font-weight: 700;
  font-size: 14px;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0px 10px 40px -10px rgba(43, 105, 77, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 15px 40px -10px rgba(43, 105, 77, 0.3);
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  background-color: ${props => props.theme.colors.bgWhite};
  color: ${props => props.theme.colors.primary};
  font-weight: 700;
  font-size: 14px;
  border-radius: 9999px;
  border: 1px solid ${props => props.theme.colors.borderDark};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.bgLight};
    transform: translateY(-2px);
  }
`;

const ImageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 600px;
  width: 100%;
  z-index: 2;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const BentoCard = styled.div<{ $bg: string }>`
  position: relative;
  border-radius: 32px;
  overflow: hidden;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  background-color: ${props => props.$bg};
  box-shadow: 0px 10px 40px -10px rgba(43, 105, 77, 0.08);
`;

const BentoImage = styled(Image)`
  object-fit: cover;
  opacity: 0.8;
  transition: transform 0.5s ease;

  ${BentoCard}:hover & {
    transform: scale(1.05);
  }
`;

const BentoContent = styled.div`
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 16px;
  border-radius: 16px;
  text-align: center;
`;

const BentoStat = styled.span<{ $color: string }>`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.$color};
  display: block;
  margin-bottom: 4px;
`;

const BentoLabel = styled.span<{ $color: string }>`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.$color};
`;

const DecoCircle = styled.div<{ $top: string; $left: string; $color: string; $blur: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: 256px;
  height: 256px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  filter: blur(${props => props.$blur});
  opacity: 0.5;
  z-index: 1;
  pointer-events: none;
`;

export const Hero: React.FC = () => {
  return (
    <HeroSection id="hero">
      <DecoCircle $top="-40px" $left="60%" $color="#E5E7A0" $blur="64px" />
      <DecoCircle $top="380px" $left="40%" $color="#CDE5FF" $blur="64px" />

      <ContentWrapper>
        <Badge>
          <BadgeText>Môi trường giáo dục mầm non hạnh phúc</BadgeText>
        </Badge>
        <Title>
          Nơi Ươm Mầm<br />
          <span>Tương Lai</span>
        </Title>
        <Description>
          Phát triển toàn diện. Chăm sóc tận tâm. Kết nối minh bạch. Khởi
          đầu hoàn hảo cho hành trình khám phá thế giới của bé yêu.
        </Description>
        <ButtonGroup>
          <PrimaryButton href="#contact">Đăng ký tham quan trường</PrimaryButton>
          <SecondaryButton href="#environment">Tìm hiểu thêm</SecondaryButton>
        </ButtonGroup>
      </ContentWrapper>

      <ImageWrapper>
        <BentoCard $bg="#A1D1FE">
          <BentoImage
            src="/images/hero_outdoor.png"
            alt="Trẻ em mầm non vui chơi ngoài trời"
            fill
            sizes="(max-width: 768px) 100vw, 300px"
          />
          <BentoContent>
            <BentoStat $color="#265A81">100%</BentoStat>
            <BentoLabel $color="#265A81">An toàn</BentoLabel>
          </BentoContent>
        </BentoCard>

        <BentoCard $bg="#95D5B2" style={{ marginTop: '48px' }}>
          <BentoImage
            src="/images/hero_indoor.png"
            alt="Lớp học mầm non hiện đại"
            fill
            sizes="(max-width: 768px) 100vw, 300px"
          />
          <BentoContent>
            <BentoStat $color="#1E5E42">500+</BentoStat>
            <BentoLabel $color="#1E5E42">Bé Hạnh Phúc</BentoLabel>
          </BentoContent>
        </BentoCard>
      </ImageWrapper>
    </HeroSection>
  );
};
