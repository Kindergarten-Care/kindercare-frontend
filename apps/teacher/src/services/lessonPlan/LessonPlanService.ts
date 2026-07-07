import { apiClient } from '@kindercare/core';
import type {
  LessonPlanApiDto,
  LessonPlanDomainModel,
  LessonPlanItemApiDto,
  LessonPlanUpsertInput,
} from '@/config/types/lessonPlanApi';
import { LessonPlanMapper } from './LessonPlanMapper';

// Shape API trả về (giống các service khác trong repo: { success, message, data })
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/** Trả về true nếu là lỗi do BE chưa implement endpoint (404 / 405). */
function isEndpointMissing(err: any): boolean {
  const status = err?.response?.status;
  return status === 404 || status === 405;
}

class LessonPlanService {
  /** Lấy tất cả giáo án của GV hiện tại, có thể filter theo status */
  async getMyLessonPlans(params?: {
    status?: string;
    year?: number;
    classId?: number;
  }): Promise<LessonPlanDomainModel[]> {
    try {
      // baseURL = '/teacher/api', proxy rewrite thêm '/api/v1' → BE nhận '/teacher/lesson-plans'
      const res = await apiClient.get<ApiResponse<LessonPlanApiDto[]>>(
        '/teacher/lesson-plans',
        { params }
      );
      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Failed to fetch lesson plans');
      }
      return LessonPlanMapper.toDomainList(res.data.data ?? []);
    } catch (err: any) {
      // Khi BE chưa có endpoint, trả về mảng rỗng để UI không crash
      if (isEndpointMissing(err)) return [];
      throw err;
    }
  }

  /** Lấy chi tiết 1 giáo án (kèm items). Throw nếu không tồn tại. */
  async getLessonPlanById(id: number | string): Promise<LessonPlanDomainModel> {
    try {
      const res = await apiClient.get<ApiResponse<LessonPlanApiDto>>(
        `/teacher/lesson-plans/${id}`
      );
      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Lesson plan not found');
      }
      return LessonPlanMapper.toDomain(res.data.data);
    } catch (err: any) {
      if (isEndpointMissing(err)) {
        const e: any = new Error('Lesson plan not found');
        e.response = { status: 404 };
        throw e;
      }
      throw err;
    }
  }

  /** Tạo mới hoặc cập nhật (upsert) giáo án */
  async upsertLessonPlan(input: LessonPlanUpsertInput): Promise<LessonPlanDomainModel> {
    // baseURL = '/teacher/api', proxy rewrite thêm '/api/v1' → BE nhận '/teacher/lesson-plans'
    const res = await apiClient.post<ApiResponse<LessonPlanApiDto>>(
      '/teacher/lesson-plans',
      input
    );
    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Failed to save lesson plan');
    }
    return LessonPlanMapper.toDomain(res.data.data);
  }

  /** Gửi duyệt (Draft/RevisionRequested → Submitted) */
  async submitForApproval(id: number | string, note?: string): Promise<LessonPlanDomainModel> {
    const res = await apiClient.post<ApiResponse<LessonPlanApiDto>>(
      `/teacher/lesson-plans/${id}/submit`,
      { note }
    );
    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Failed to submit');
    }
    return LessonPlanMapper.toDomain(res.data.data);
  }

  /** Rút lại (Submitted → Draft) để sửa */
  async withdrawSubmission(id: number | string): Promise<LessonPlanDomainModel> {
    const res = await apiClient.post<ApiResponse<LessonPlanApiDto>>(
      `/teacher/lesson-plans/${id}/withdraw`,
      {}
    );
    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Failed to withdraw');
    }
    return LessonPlanMapper.toDomain(res.data.data);
  }

  /** Đánh dấu đã dạy xong 1 item */
  async toggleItemComplete(
    planId: number | string,
    itemId: number | string,
    isCompleted: boolean
  ): Promise<LessonPlanItemApiDto> {
    const res = await apiClient.patch<ApiResponse<LessonPlanItemApiDto>>(
      `/teacher/lesson-plans/${planId}/items/${itemId}/complete`,
      { isCompleted }
    );
    if (!res.data?.success) {
      throw new Error(res.data?.message || 'Failed to update');
    }
    return res.data.data;
  }
}

export const lessonPlanService = new LessonPlanService();