'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import * as S from '../styles';
import type {
  AllergyDomainModel,
  LogSeverity,
} from '@/config/types/studentHealth';

interface EditModeToggleProps {
  locked: boolean;
  onToggle: () => void;
  count?: number;
  summary?: string;
}

export const EditModeToggle: React.FC<EditModeToggleProps> = ({
  locked,
  onToggle,
  count,
  summary,
}) => (
  <S.EditToggleWrapper
    type="button"
    $locked={locked}
    onClick={onToggle}
    aria-pressed={!locked}
  >
    {locked ? <Lock size={14} /> : <Lock size={14} style={{ transform: 'rotate(-30deg)' }} />}
    {locked ? 'Chế độ chỉ xem — nhấn để mở khóa' : 'Đang mở khóa — nhấn để khóa'}
    {typeof count === 'number' && (
      <span
        style={{
          background: locked ? '#fca5a5' : '#86efac',
          color: locked ? '#7f1d1d' : '#14532d',
          padding: '1px 8px',
          borderRadius: 999,
          fontSize: 11,
        }}
      >
        {count}
      </span>
    )}
    {summary && <span style={{ fontWeight: 400, opacity: 0.8 }}>{summary}</span>}
  </S.EditToggleWrapper>
);

// Re-export shared severity helpers for convenience in the table view
export const severityLabel = (severity: LogSeverity | AllergyDomainModel['severity']): string =>
  severity;
export const emptyHint = 'Chưa có dữ liệu';