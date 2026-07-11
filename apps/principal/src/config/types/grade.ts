export interface ClassDomainModel {
  classId: number;
  className: string;
  yearName?: string;
  teacherCount?: number;
}

export interface GradeDomainModel {
  gradeId: number;
  gradeName: string;
  classes: ClassDomainModel[];
}
