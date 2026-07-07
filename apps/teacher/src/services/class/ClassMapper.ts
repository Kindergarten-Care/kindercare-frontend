import { TeacherClassApiDto, TeacherClassDomainModel } from '@/config/types/class';

export class ClassMapper {
  /**
   * Build a display name ensuring "Lớp" prefix.
   * e.g. "Mầm 1" → "Lớp Mầm 1", "Lớp Mầm 1" → "Lớp Mầm 1"
   */
  private static buildDisplayName(className: string): string {
    const trimmed = className.trim();
    return trimmed.toLowerCase().startsWith('lớp') ? trimmed : `Lớp ${trimmed}`;
  }

  /**
   * Build a short initial from the class name (without prefix).
   * e.g. "Mầm 1" → "M1", "Chồi A" → "CA", "Lá 2" → "L2"
   */
  private static buildClassInitial(className: string): string {
    // Strip "Lớp " prefix before computing initial
    const stripped = className.replace(/^lớp\s*/i, '').trim();
    const words = stripped.split(/\s+/);

    if (words.length === 0) return 'C';

    const firstChar = words[0].charAt(0).toUpperCase();
    // Use second word as suffix if it exists (handles "Mầm 1", "Chồi A")
    const suffix = words[1] ?? '';

    return `${firstChar}${suffix}`;
  }

  static toDomain(dto: TeacherClassApiDto): TeacherClassDomainModel {
    return {
      classId:      dto.classId,
      className:    dto.className,
      yearId:       Number(dto.yearId) || 1,
      displayName:  ClassMapper.buildDisplayName(dto.className),
      classInitial: ClassMapper.buildClassInitial(dto.className),
      studentCount: Number(dto.studentCount) || 0,
    };
  }

  static toDomainList(dtos: TeacherClassApiDto[]): TeacherClassDomainModel[] {
    return dtos.map(dto => ClassMapper.toDomain(dto));
  }
}
