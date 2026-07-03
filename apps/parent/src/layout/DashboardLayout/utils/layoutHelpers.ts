export type Locale = 'vi' | 'en';

export function getGreeting(locale: Locale = 'vi'): string {
  const h = new Date().getHours();
  if (locale === 'en') {
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }
  if (h < 12) return 'Chào buổi sáng';
  if (h < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

export function getFormattedDate(locale: Locale = 'vi'): string {
  return new Date().toLocaleDateString(locale === 'en' ? 'en-US' : 'vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export interface RelationshipInfo {
  label: string;
  avatar: string;
}

const RELATIONSHIP_MAP: Array<{ keys: string[]; vi: string; en: string; avatar: string }> = [
  { keys: ['bố', 'ba', 'cha', 'father', 'dad', 'papa'], vi: 'ba',   en: 'Dad',     avatar: '👨' },
  { keys: ['mẹ', 'má', 'me', 'mother', 'mom', 'mama'], vi: 'mẹ',   en: 'Mom',     avatar: '👩' },
  { keys: ['ông', 'grandfather', 'grandpa', 'opa'],     vi: 'ông',  en: 'Grandpa', avatar: '👴' },
  { keys: ['bà', 'grandmother', 'grandma', 'oma'],      vi: 'bà',   en: 'Grandma', avatar: '👵' },
  { keys: ['anh'],                                       vi: 'anh',  en: 'Brother', avatar: '👦' },
  { keys: ['chị'],                                       vi: 'chị',  en: 'Sister',  avatar: '👧' },
  { keys: ['chú', 'uncle'],                              vi: 'chú',  en: 'Uncle',   avatar: '👨' },
  { keys: ['cô', 'dì', 'thím', 'aunt'],                 vi: 'cô',   en: 'Aunt',    avatar: '👩' },
  { keys: ['cậu'],                                       vi: 'cậu',  en: 'Uncle',   avatar: '👨' },
  { keys: ['bác'],                                       vi: 'bác',  en: 'Uncle',   avatar: '👴' },
];

export function resolveRelationship(raw: string | undefined, locale: Locale): RelationshipInfo {
  const r = (raw ?? '').trim().toLowerCase();
  const match = RELATIONSHIP_MAP.find(entry => entry.keys.includes(r));
  if (match) return { label: locale === 'en' ? match.en : match.vi, avatar: match.avatar };
  return { label: '', avatar: '👤' };
}
