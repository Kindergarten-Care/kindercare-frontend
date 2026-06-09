'use client';

import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';

interface ClientAppWrapperProps {
  children: React.ReactNode;
}

export default function ClientAppWrapper({ children }: ClientAppWrapperProps): React.ReactElement {
  const [showSplash, setShowSplash] = useState(true);
  const [isAppMounted, setIsAppMounted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('kc_splash_shown')) {
      setShowSplash(false);
    }
    setIsAppMounted(true);
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('kc_splash_shown', 'true');
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && (
        <SplashScreen
          isReady={isAppMounted}
          onComplete={handleSplashComplete}
        />
      )}
      <div
        style={{
          opacity: showSplash ? 0 : 1,
          transition: 'opacity 0.4s ease',
          pointerEvents: showSplash ? 'none' : 'auto',
          height: showSplash ? '100vh' : 'auto',
          overflow: showSplash ? 'hidden' : 'visible',
        }}
      >
        {children}
      </div>
    </>
  );
}
