import { apiClient } from '@kindercare/core';

export interface StudentAssessment {
  assessmentId: number;
  studentId: number;
  studentName?: string;
  studentAvatar?: string;
  assessmentMonth: string; // MM/YYYY
  physicalScore: number;
  cognitiveScore: number;
  languageScore: number;
  socioEmotionalScore: number;
  aestheticScore: number;
  teacherComment?: string;
  createdAt?: number;
}

export class AssessmentService {
  /**
   * Fetch all student assessments for a specific class and month.
   */
  public static async getClassAssessments(classId: number | string, month: string): Promise<StudentAssessment[]> {
    const res = await apiClient.get(`/teacher/classes/${classId}/assessments`, {
      params: { month }
    });
    return res.data?.data || [];
  }

  /**
   * Submit or update assessments for students in a class.
   */
  public static async submitClassAssessments(
    classId: number | string,
    month: string,
    assessments: Omit<StudentAssessment, 'assessmentId' | 'studentName' | 'studentAvatar' | 'createdAt'>[]
  ): Promise<boolean> {
    await apiClient.post(`/teacher/classes/${classId}/assessments`, {
      month,
      assessments
    });
    return true;
  }
}
