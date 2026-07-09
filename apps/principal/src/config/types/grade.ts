export interface ClassDomainModel {
  classId: number;
  className: string;
  yearName?: string;
}

export interface GradeDomainModel {
  gradeId: number;
  gradeName: string;
  classes: ClassDomainModel[];
}
