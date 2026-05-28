import React from 'react';
import { Navbar, Footer } from '@/layout';
import { LandingView } from '@/views/landing';

export default function LandingPage(): React.ReactElement {
  return (
    <>
      <Navbar />
      <main>
        <h1
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          KinderCare – Nơi ươm mầm & Phát triển tương lai
        </h1>
        <LandingView />
      </main>
      <Footer />
    </>
  );
}
