import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@kindercare/core';
import type {
  LessonPlanDomainModel,
  LessonPlanStatus,
  LessonPlanUpsertInput,
} from '@/config/types/lessonPlanApi';
import { LessonPlanMapper } from '@/services/lessonPlan/LessonPlanMapper';
import { lessonPlanService } from '@/services/lessonPlan/LessonPlanService';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// ===== Queries =====

export const useMyLessonPlans = (params?: { status?: LessonPlanStatus; year?: number }) => {
  return useQuery({
    queryKey: ['teacherLessonPlans', params],
    queryFn: () => lessonPlanService.getMyLessonPlans(params),
    staleTime: 30_000,
  });
};

export const useLessonPlanDetail = (id: number | undefined) => {
  return useQuery({
    queryKey: ['teacherLessonPlan', id],
    queryFn: () => lessonPlanService.getLessonPlanById(id!),
    enabled: id !== undefined && id > 0,
    staleTime: 30_000,
  });
};

// ===== Mutations =====

export const useSaveLessonPlan = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: LessonPlanUpsertInput) =>
      lessonPlanService.upsertLessonPlan(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['teacherLessonPlans'] });
    },
  });
};

export const useSubmitLessonPlan = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, note }: { id: number | string; note?: string }) =>
      lessonPlanService.submitForApproval(id, note),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['teacherLessonPlans'] });
      qc.invalidateQueries({ queryKey: ['teacherLessonPlan', vars.id] });
    },
  });
};

export const useWithdrawLessonPlan = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => lessonPlanService.withdrawSubmission(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: ['teacherLessonPlans'] });
      qc.invalidateQueries({ queryKey: ['teacherLessonPlan', id] });
    },
  });
};

export const useToggleItemComplete = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      planId,
      itemId,
      isCompleted,
    }: {
      planId: number | string;
      itemId: number | string;
      isCompleted: boolean;
    }) => lessonPlanService.toggleItemComplete(planId, itemId, isCompleted),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['teacherLessonPlan', vars.planId] });
      qc.invalidateQueries({ queryKey: ['teacherLessonPlans'] });
    },
  });
};