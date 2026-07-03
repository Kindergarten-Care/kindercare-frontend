'use client';

import styled from 'styled-components';

export const IconWrapper = styled.div<{ $type: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  transition: all 0.2s ease;

  ${p => {
    switch (p.$type) {
      case 'ATTENDANCE':
      case 'CHECKIN':
      case 'CHECKOUT':
        return `
          background: #e8f7f0;
          color: #0a7a4c;
        `;
      case 'LEAVE_REQUEST':
        return `
          background: #fff8ec;
          color: #d97706;
        `;
      case 'MEDICATION':
      case 'MEDICATION_REQUEST':
      case 'MEDICAL_REQUEST':
      case 'MEDICINE':
      case 'MEDICINE_REQUEST':
      case 'HEALTH_ALERT':
        return `
          background: #fee2e2;
          color: #ef4444;
        `;
      default:
        return `
          background: #f0f5ff;
          color: #3b82f6;
        `;
    }
  }}
`;
