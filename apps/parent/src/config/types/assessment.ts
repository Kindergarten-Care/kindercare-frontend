export interface AssessmentApiDto {
  assessmentId: number;
  studentId: number;
  assessmentMonth: string;
  physicalScore: number | null;
  cognitiveScore: number | null;
  languageScore: number | null;
  socioEmotionalScore: number | null;
  aestheticScore: number | null;
  teacherComment: string | null;
  createdAt: number;
}

export interface AssessmentDomainModel {
  assessmentId: number;
  studentId: number;
  assessmentMonth: string;
  physicalScore: number | null;
  cognitiveScore: number | null;
  languageScore: number | null;
  socioEmotionalScore: number | null;
  aestheticScore: number | null;
  teacherComment: string | null;
  createdAt: bigint;
}
