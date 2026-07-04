export interface DailyLessonApiDto {
  lessonLogId: number;
  classId: number;
  lessonDate: number;
  subjectName: string;
  lessonTitle: string;
  details: string;
  iconType: string;
  createdAt: number;
  updatedAt: number;
}

export interface DailyLessonDomainModel {
  lessonLogId: number;
  classId: number;
  lessonDate: bigint;
  subjectName: string;
  lessonTitle: string;
  details: string;
  iconType: string;
  createdAt: bigint;
  updatedAt: bigint;
}
