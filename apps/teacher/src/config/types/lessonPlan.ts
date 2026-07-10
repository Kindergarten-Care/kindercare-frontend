export type SubjectKey = 'lang' | 'math' | 'art' | 'music' | 'world' | 'phys';
export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

export interface SubjectMeta {
  label: string;
  icon: string;
  color: string;
  tint: string;
}

export interface DayMeta {
  key: DayKey;
  name: string;
  short: string;
}

export interface LessonPlanItem {
  id: string;
  day: DayKey;
  subject: SubjectKey;
  time: string;
  title: string;
  note: string;
  done: boolean;
}

export interface LessonDraft {
  day: DayKey;
  subject: SubjectKey;
  title: string;
  time: string;
  note: string;
}

export interface ToastItem {
  id: string;
  text: string;
}
