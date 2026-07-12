const MALE_GENDER_VALUES = ['nam', 'male'];

/**
 * Determines whether a teacher's gender value indicates male, so callers can
 * pick "Thầy" vs "Cô" consistently regardless of whether the backend sends
 * Vietnamese ("Nam"/"Nữ") or English ("male"/"female") values.
 */
export const isMaleTeacher = (gender: string | null | undefined): boolean =>
  MALE_GENDER_VALUES.includes((gender || '').toLowerCase());

/**
 * Returns "Thầy" or "Cô" based on gender.
 */
export const getTeacherHonorific = (gender: string | null | undefined): 'Thầy' | 'Cô' =>
  isMaleTeacher(gender) ? 'Thầy' : 'Cô';

/**
 * Formats a teacher's display name with the correct gendered honorific
 * (e.g. "Cô Nguyễn Thị Lan" / "Thầy Lê Quang Huy"). If the name already
 * starts with "Cô"/"Thầy" (already formatted upstream), it's returned as-is.
 */
export const getTeacherDisplayName = (
  teacher: { fullName: string; gender?: string | null } | null | undefined
): string => {
  if (!teacher) return '';
  const fullName = teacher.fullName || '';
  if (/^(cô|thầy)\b/i.test(fullName)) return fullName;
  return `${getTeacherHonorific(teacher.gender)} ${fullName}`;
};
