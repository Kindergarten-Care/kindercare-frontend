import { ScheduleItem } from '@/config/types/dashboard';
import { ActivityType } from '@/config/types/dailySchedule';

export const ACTIVITY_STYLE: Record<ActivityType, { color: string; tint: string }> = {
  pickup:  { color: '#0E8A7D', tint: '#D7F0EC' },
  meal:    { color: '#F97316', tint: '#FFEEDF' },
  study:   { color: '#8B5CF6', tint: '#F1ECFE' },
  nap:     { color: '#2563EB', tint: '#E3EDFD' },
  play:    { color: '#005A36', tint: '#E6F3ED' },
  dropoff: { color: '#0E8A7D', tint: '#D7F0EC' },
  other:   { color: '#8B5CF6', tint: '#F1ECFE' },
};

export function toMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + (m || 0);
}

export function fmtClock(d: Date): string {
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

export interface ActiveInfo {
  idx: number;
  isLive: boolean;
  isBeforeFirst: boolean;
  isAfterLast: boolean;
}

export function getActiveInfo(schedule: ScheduleItem[], nowMin: number): ActiveInfo {
  if (!schedule.length) return { idx: 0, isLive: false, isBeforeFirst: false, isAfterLast: false };

  // Iterate backward so the most recently started activity within its window wins
  for (let i = schedule.length - 1; i >= 0; i--) {
    const start = toMinutes(schedule[i].time);
    const end   = toMinutes(schedule[i].endTime);
    if (nowMin >= start && nowMin <= end) {
      return { idx: i, isLive: true, isBeforeFirst: false, isAfterLast: false };
    }
  }

  if (nowMin < toMinutes(schedule[0].time)) {
    return { idx: 0, isLive: false, isBeforeFirst: true, isAfterLast: false };
  }

  if (nowMin > toMinutes(schedule[schedule.length - 1].endTime)) {
    return { idx: schedule.length - 1, isLive: false, isBeforeFirst: false, isAfterLast: true };
  }

  // Between activities — center on last-started activity
  let idx = 0;
  for (let i = 0; i < schedule.length; i++) {
    if (nowMin >= toMinutes(schedule[i].time)) idx = i;
  }
  return { idx, isLive: false, isBeforeFirst: false, isAfterLast: false };
}
