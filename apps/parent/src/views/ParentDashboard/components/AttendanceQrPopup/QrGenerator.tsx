'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QrGeneratorProps {
  value: string;
  size?: number;
}

export const QrGenerator: React.FC<QrGeneratorProps> = ({ value, size = 200 }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        padding: '12px',
        borderRadius: '16px',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
      }}
    >
      <QRCodeSVG
        value={value}
        size={size}
        bgColor="#ffffff"
        fgColor="#005a36" // Using standard KinderCare Brand Green color (#005a36)
        level="H" // High error correction level to allow center logo excavation safely
        includeMargin={false}
        imageSettings={{
          src: 'https://media.kindercare.app/KinderCare%20Logo/KinderCare_MainLogo.png',
          height: 58,
          width: 58,
          excavate: true, // Cut out QR blocks behind the logo for clarity
        }}
      />
    </div>
  );
};
