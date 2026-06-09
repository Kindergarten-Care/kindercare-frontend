'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const SplashContainer = styled.div<{ $isFadingOut: boolean }>`
  position: fixed;
  inset: 0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  opacity: ${props => (props.$isFadingOut ? 0 : 1)};
  visibility: ${props => (props.$isFadingOut ? 'hidden' : 'visible')};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  max-width: 400px;
  width: 90%;
  animation: ${float} 3s ease-in-out infinite;
`;

const Logo = styled.img`
  width: 240px;
  height: auto;
  object-fit: contain;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 6px;
  background: #f1f5f9;
  border-radius: 999px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const ProgressBar = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${props => props.$progress}%;
  background-color: #237A3C; /* KinderCare Green */
  border-radius: 999px;
  transition: width 0.08s linear;
`;

interface SplashScreenProps {
  isReady: boolean;
  onComplete: () => void;
}

export default function SplashScreen({ isReady, onComplete }: SplashScreenProps): React.ReactElement {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const intervalTime = 20; // 20ms update frequency for buttery smooth progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 500);
          }, 150);
          return 100;
        }

        // If the parent page has mounted and we have shown at least some progress, complete the bar
        if (isReady && prev >= 60) {
          return Math.min(100, prev + 6);
        }

        // Otherwise, animate smoothly up to 95% and hold/crawl
        if (prev < 60) {
          return prev + 1.5; // Normal progress speed
        } else if (prev < 85) {
          return prev + 0.4; // Slow down
        } else if (prev < 95) {
          return prev + 0.08; // Capping out/very slow crawl
        } else {
          return 95; // Hold at 95% until isReady is true
        }
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isReady, onComplete]);

  return (
    <SplashContainer $isFadingOut={isFadingOut}>
      <ContentWrapper>
        <Logo src="https://media.kindercare.app/KinderCare%20Logo/KinderCare_LogoTextHorizontal.png" alt="KinderCare" />
        <ProgressContainer>
          <ProgressBar $progress={progress} />
        </ProgressContainer>
      </ContentWrapper>
    </SplashContainer>
  );
}
