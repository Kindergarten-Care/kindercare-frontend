import { apiClient } from '@kindercare/core';

export interface DetailedStudent {
  studentId: number;
  fullName: string;
  dateOfBirth: number;
  gender: string;
  allergies?: string;
  admissionDate: number;
  enrollmentStatus: string;
  avatarUrl?: string;
  classId?: number;
  parents?: {
    parentId: number;
    fullName: string;
    phoneNumber: string;
    relationship: string;
    isPrimary: boolean;
  }[];
}

export class StudentService {
  /**
   * Fetch a basic list of students for a class.
   */
  public static async getClassStudents(classId: number | string): Promise<any[]> {
    const res = await apiClient.get(`/teacher/classes/${classId}/students`);
    return res.data?.data || [];
  }

  /**
   * Fetch a detailed list of students for a class (including parent info, allergies).
   */
  public static async getDetailedClassStudents(classId: number | string): Promise<DetailedStudent[]> {
    const res = await apiClient.get(`/teacher/classes/${classId}/detailed-students`);
    return res.data?.data || [];
  }
}
