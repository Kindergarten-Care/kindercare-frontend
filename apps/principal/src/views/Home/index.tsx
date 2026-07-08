'use client';

import React from 'react';
import { usePrincipal } from '@/contexts/PrincipalContext';
import {
  HomeContainer,
  WelcomeSubtitle,
  CenterImage,
} from './styles';

export default function HomeView() {
  const { profile } = usePrincipal();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  return (
    <HomeContainer>
      <CenterImage 
        src="https://media.kindercare.app/KinderCare%20Logo/PrincipalLogo.png" 
        alt="Principal Avatar" 
        style={{ width: '350px', height: 'auto', objectFit: 'contain', marginBottom: '24px' }}
      />
      <WelcomeSubtitle>
        {getGreeting()}, {profile?.fullName || 'Hiệu trưởng'}
      </WelcomeSubtitle>
    </HomeContainer>
  );
}
