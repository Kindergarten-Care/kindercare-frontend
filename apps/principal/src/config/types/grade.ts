export interface ClassDomainModel {
  classId: number;
  className: string;
}

export interface GradeDomainModel {
  gradeId: number;
  gradeName: string;
  classes: ClassDomainModel[];
}
