'use client';

import React from 'react';
import * as S from '../styles';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => (
  <S.EmptyStateBox>
    {icon && <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>}
    <div style={{ fontWeight: 600, color: '#0f172a' }}>{title}</div>
    {description && (
      <div style={{ marginTop: 4, fontSize: 12, color: '#64748b' }}>{description}</div>
    )}
    {action && (
      <button
        type="button"
        onClick={action.onClick}
        style={{
          marginTop: 12,
          padding: '6px 14px',
          background: '#00794A',
          color: '#fff',
          border: 'none',
          borderRadius: 999,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {action.label}
      </button>
    )}
  </S.EmptyStateBox>
);