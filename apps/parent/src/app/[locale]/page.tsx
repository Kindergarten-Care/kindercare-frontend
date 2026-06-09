'use client';

import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocale } from 'next-intl';
import { useAuth, useAppRouter } from '@kindercare/core';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(0.95); opacity: 0.5; }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #fdf4ff, #fae8ff, #f0f9ff, #ecfeff);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border: 4px solid rgba(99, 102, 241, 0.1);
  border-left-color: #6366f1;
  border-right-color: #a855f7;
  border-radius: 50%;
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
`;

const SpinnerInner = styled.div`
  position: absolute;
  font-size: 1.75rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Text = styled.p`
  margin-top: 1.5rem;
  color: #64748b;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export default function RootPage(): React.ReactElement {
  const locale = useLocale();
  const { isAuthenticated, isLoading } = useAuth();
  const { go } = useAppRouter({ locale });

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        go.parentDashboard();
      } else {
        go.parentLogin();
      }
    }
  }, [isLoading, isAuthenticated, go]);

  return (
    <Container>
      <SpinnerWrapper>
        <Spinner />
        <SpinnerInner>🏠</SpinnerInner>
      </SpinnerWrapper>
      <Text>Loading KinderCare...</Text>
    </Container>
  );
}
