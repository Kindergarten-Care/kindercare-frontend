import { apiClient } from '@kindercare/core';

export interface RewardBadge {
  badgeId: number;
  badgeName: string;
  badgeImageUrl: string;
  criteriaType: 'WEEKLY' | 'MONTHLY' | 'SPECIAL';
}

export interface WeeklyReward {
  rewardId: number;
  studentId: number;
  weekNumber: number;
  year: number;
  teacherNote?: string;
  dateAwarded: string; // ISO String
}

export class RewardService {
  /**
   * Fetch all available reward badges.
   */
  public static async getRewardBadges(): Promise<RewardBadge[]> {
    const res = await apiClient.get('/teacher/reward-badges');
    return res.data?.data || [];
  }

  /**
   * Fetch weekly rewards for a specific class and week.
   */
  public static async getWeeklyRewards(classId: number | string, weekNumber: number, year: number): Promise<WeeklyReward[]> {
    const res = await apiClient.get(`/teacher/classes/${classId}/weekly-rewards`, {
      params: { weekNumber, year }
    });
    return res.data?.data || [];
  }

  /**
   * Award weekly rewards to students in a class.
   */
  public static async awardWeeklyRewards(
    classId: number | string,
    weekNumber: number,
    year: number,
    rewards: { studentId: number; teacherNote?: string }[]
  ): Promise<boolean> {
    await apiClient.post(`/teacher/classes/${classId}/weekly-rewards`, {
      weekNumber,
      year,
      rewards
    });
    return true;
  }

  /**
   * Fetch monthly good kids for a specific class and month.
   */
  public static async getMonthlyGoodKids(classId: number | string, month: string): Promise<any[]> {
    const res = await apiClient.get(`/teacher/classes/${classId}/monthly-good-kids`, {
      params: { month }
    });
    return res.data?.data || [];
  }
}
