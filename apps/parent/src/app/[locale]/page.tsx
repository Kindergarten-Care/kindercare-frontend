'use client';

import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #fdf4ff, #fae8ff, #f0f9ff, #ecfeff);
  background-size: 400% 400%;
  animation: ${gradientBG} 15s ease infinite;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  overflow: hidden;
  position: relative;
  padding: 2rem;
`;

const Decoration = styled.div<{ $top: string; $left: string; $delay: string; $size: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  font-size: ${props => props.$size};
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.$delay};
  opacity: 0.4;
  user-select: none;
  pointer-events: none;
  z-index: 1;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 2.5rem;
  padding: 4rem 3rem;
  max-width: 650px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  animation: ${slideUp} 1s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 10;

  @media (max-width: 480px) {
    padding: 3rem 1.5rem;
  }
`;

const LogoWrapper = styled.div`
  margin-bottom: 2rem;
  display: inline-block;
  font-size: 3rem;
  animation: ${pulse} 3s infinite ease-in-out;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #fdf2f8;
  color: #db2777;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid #fbcfe8;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  background: #db2777;
  border-radius: 50%;
  display: inline-block;
  animation: ${pulse} 1.5s infinite;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(to right, #6366f1, #a855f7, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const ProgressContainer = styled.div`
  width: 100%;
  background: #f1f5f9;
  height: 12px;
  border-radius: 999px;
  margin-bottom: 3rem;
  overflow: hidden;
  position: relative;
`;

const ProgressBar = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background: linear-gradient(to right, #6366f1, #a855f7);
  border-radius: 999px;
  transition: width 1s ease-in-out;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: loading 2s infinite linear;
  }

  @keyframes loading {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
  }
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  font-weight: 600;
  color: #94a3b8;
  margin-top: 0.75rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  max-width: 450px;
  margin: 0 auto;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }
`;

const Button = styled.button`
  background: #1e293b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #0f172a;
    transform: translateY(-2px);
  }
`;

const Footer = styled.div`
  margin-top: 3rem;
  font-size: 0.875rem;
  color: #94a3b8;
`;

import { useTranslations } from 'next-intl';

export default function UnderDevelopment() {
  const t = useTranslations('ComingSoon');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(75), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      {/* Decorative floating elements */}
      <Decoration $top="15%" $left="10%" $delay="0s" $size="4rem">🎨</Decoration>
      <Decoration $top="20%" $left="85%" $delay="1s" $size="3rem">🧩</Decoration>
      <Decoration $top="75%" $left="15%" $delay="2s" $size="3.5rem">🧸</Decoration>
      <Decoration $top="80%" $left="80%" $delay="1.5s" $size="4rem">🌈</Decoration>
      <Decoration $top="10%" $left="50%" $delay="0.5s" $size="2.5rem">📚</Decoration>

      <GlassCard>
        <LogoWrapper>🏠</LogoWrapper>

        <div>
          <StatusBadge>
            <Dot /> {t('badge')}
          </StatusBadge>
        </div>

        <Title>
          <span>KinderCare</span> Phụ Huynh Dashboard
        </Title>

        <Description>
          {t('description')}
        </Description>

        <div style={{ position: 'relative' }}>
          <ProgressContainer>
            <ProgressBar width={progress} />
          </ProgressContainer>
          <ProgressText>
            <span>{t('progressLabel')}</span>
            <span>{progress}%</span>
          </ProgressText>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Description style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
            {t('emailPrompt')}
          </Description>
          <InputGroup>
            <Input type="email" placeholder={t('emailPlaceholder')} />
            <Button>{t('notifyButton')}</Button>
          </InputGroup>
        </div>

        <Footer>
          {t('footer')}
        </Footer>
      </GlassCard>
    </Container>
  );
}
