import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AssessmentService, StudentAssessment } from '../../services/assessments';
import { RewardService, RewardBadge, WeeklyReward } from '../../services/rewards';

export const useClassAssessments = (classId: number | string, month: string) => {
  return useQuery<StudentAssessment[]>({
    queryKey: ['assessments', classId, month],
    queryFn: () => AssessmentService.getClassAssessments(classId, month),
    enabled: !!classId && !!month,
  });
};

export const useSubmitClassAssessments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, month, assessments }: { classId: number | string; month: string; assessments: Omit<StudentAssessment, 'assessmentId' | 'studentName' | 'studentAvatar' | 'createdAt'>[] }) => 
      AssessmentService.submitClassAssessments(classId, month, assessments),
    onSuccess: (_, { classId, month }) => {
      queryClient.invalidateQueries({ queryKey: ['assessments', classId, month] });
    },
  });
};

export const useRewardBadges = () => {
  return useQuery<RewardBadge[]>({
    queryKey: ['rewardBadges'],
    queryFn: () => RewardService.getRewardBadges(),
  });
};

export const useWeeklyRewards = (classId: number | string, weekNumber: number, year: number) => {
  return useQuery<WeeklyReward[]>({
    queryKey: ['weeklyRewards', classId, weekNumber, year],
    queryFn: () => RewardService.getWeeklyRewards(classId, weekNumber, year),
    enabled: !!classId,
  });
};

export const useAwardWeeklyRewards = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, weekNumber, year, rewards }: { classId: number | string; weekNumber: number; year: number; rewards: { studentId: number; teacherNote?: string }[] }) => 
      RewardService.awardWeeklyRewards(classId, weekNumber, year, rewards),
    onSuccess: (_, { classId, weekNumber, year }) => {
      queryClient.invalidateQueries({ queryKey: ['weeklyRewards', classId, weekNumber, year] });
    },
  });
};

export const useMonthlyGoodKids = (classId: number | string, month: string) => {
  return useQuery<any[]>({
    queryKey: ['monthlyGoodKids', classId, month],
    queryFn: () => RewardService.getMonthlyGoodKids(classId, month),
    enabled: !!classId && !!month,
  });
};
