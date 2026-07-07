import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
`;

export const SkeletonText = styled(SkeletonBase)<{ $width?: string; $height?: string; $mb?: string }>`
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || '16px'};
  margin-bottom: ${props => props.$mb || '8px'};
`;

export const SkeletonCircle = styled(SkeletonBase)<{ $size?: number }>`
  width: ${props => props.$size || 40}px;
  height: ${props => props.$size || 40}px;
  border-radius: 50%;
`;

export const SkeletonCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
`;

export const SkeletonBoardLoader = () => {
  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ flex: 1 }}>
            <SkeletonText $width="100%" $height="40px" $mb="8px" />
            <SkeletonCard>
              <SkeletonText $width="80%" $mb="8px" />
              <SkeletonText $width="60%" $height="12px" $mb="16px" />
              <SkeletonText $width="100%" $height="12px" $mb="8px" />
              <SkeletonText $width="90%" $height="12px" $mb="8px" />
            </SkeletonCard>
            <SkeletonCard>
              <SkeletonText $width="70%" $mb="8px" />
              <SkeletonText $width="50%" $height="12px" $mb="16px" />
              <SkeletonText $width="100%" $height="12px" />
            </SkeletonCard>
          </div>
        ))}
      </div>
    </div>
  );
};

interface LoadingSpinnerProps {
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = 'Đang tải...' }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    color: '#6b7280',
  }}>
    <div style={{
      width: 40,
      height: 40,
      border: '4px solid #e5e7eb',
      borderTopColor: '#667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    <p style={{ marginTop: 16, fontSize: 14 }}>{text}</p>
  </div>
);
