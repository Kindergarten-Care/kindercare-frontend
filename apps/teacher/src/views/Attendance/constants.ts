export const GRADS = [
  'linear-gradient(135deg, #00794A, #005A36)',
  'linear-gradient(135deg, #3B82F6, #2563EB)',
  'linear-gradient(135deg, #A78BFA, #8B5CF6)',
  'linear-gradient(135deg, #FB923C, #F97316)',
  'linear-gradient(135deg, #34D399, #059669)',
  'linear-gradient(135deg, #F472B6, #DB2777)',
];

export const PROOF_BGS = [
  'linear-gradient(135deg, #64748B, #334155)',
  'linear-gradient(135deg, #0EA5E9, #0369A1)',
  'linear-gradient(135deg, #14B8A6, #0F766E)',
];

export type StatusKey = 'present' | 'excused' | 'unexcused' | 'absent';

export const ST: Record<StatusKey, { label: string; c: string; bg: string; bd: string; dot: string }> = {
  present: {
    label: 'Có mặt',
    c: '#005A36',
    bg: '#E6F3ED',
    bd: '#C7E3D5',
    dot: '#005A36',
  },
  excused: {
    label: 'Vắng có phép',
    c: '#4B5563',
    bg: '#F1F4F1',
    bd: '#E6EEE9',
    dot: '#9CA3AF',
  },
  unexcused: {
    label: 'Vắng không phép',
    c: '#DC2626',
    bg: '#FEE2E2',
    bd: '#FCA5A5',
    dot: '#DC2626',
  },
  absent: {
    label: 'Chưa điểm danh',
    c: '#6B7280',
    bg: '#F8FBF9',
    bd: '#E6EEE9',
    dot: '#9CA3AF',
  },
};
