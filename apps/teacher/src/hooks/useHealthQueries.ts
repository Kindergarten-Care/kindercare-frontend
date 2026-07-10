import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { healthService } from '@/services/health/HealthService';
import type {
  AllergyDomainModel,
  MedicationDomainModel,
  HealthLogDomainModel,
  SubmitHealthMeasurementPayload,
} from '@/config/types/health';

// ─── Allergies ──────────────────────────────────────────────────────────────

export const useClassAllergies = (classId: number | string | undefined, studentId?: number | string) => {
  return useQuery({
    queryKey: ['classAllergies', classId, studentId],
    queryFn: () => healthService.getAllergies(classId!, studentId),
    enabled: !!classId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateAllergy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      classId, studentId, payload,
    }: {
      classId: number | string;
      studentId: number | string;
      payload: { allergen: string; severity: string; symptoms?: string; notes?: string };
    }) => healthService.createAllergy(classId, studentId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['classAllergies', variables.classId] });
    },
  });
};

export const useUpdateAllergy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      classId, allergyId, payload,
    }: {
      classId: number | string;
      allergyId: number;
      payload: { allergen?: string; severity?: string; symptoms?: string; notes?: string };
    }) => healthService.updateAllergy(classId, allergyId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classAllergies'] });
    },
  });
};

export const useDeleteAllergy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, allergyId }: { classId: number | string; allergyId: number }) =>
      healthService.deleteAllergy(classId, allergyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classAllergies'] });
    },
  });
};

// ─── Medical Requests ─────────────────────────────────────────────────────────

export const useClassMedicalRequests = (classId: number | string | undefined, timestamp?: number) => {
  return useQuery({
    queryKey: ['classMedicalRequests', classId, timestamp],
    queryFn: () => healthService.getMedicalRequests(classId!, timestamp),
    enabled: !!classId,
    staleTime: 1 * 60 * 1000,
  });
};

export const useCreateMedication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      classId, studentId, payload,
    }: {
      classId: number | string;
      studentId: number | string;
      payload: {
        medicineName: string;
        dosage: string;
        scheduledDate?: number;
        scheduledTime?: string;
        frequency?: string;
        notes?: string;
      };
    }) => healthService.createMedication(classId, studentId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['classMedicalRequests', variables.classId] });
    },
  });
};

export const useUpdateMedicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      classId, requestId, status, teacherNote,
    }: {
      classId: number | string;
      requestId: number;
      status: string;
      teacherNote?: string;
    }) => healthService.updateMedicationStatus(classId, requestId, status, teacherNote),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['classMedicalRequests', variables.classId] });
    },
  });
};

export const useDeleteMedication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, requestId }: { classId: number | string; requestId: number }) =>
      healthService.deleteMedication(classId, requestId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['classMedicalRequests', variables.classId] });
    },
  });
};

// ─── Health Logs (BMI) ────────────────────────────────────────────────────────

export const useClassHealthLogs = (classId: number | string | undefined, termPeriod?: string) => {
  return useQuery({
    queryKey: ['classHealthLogs', classId, termPeriod],
    queryFn: () => healthService.getHealthLogs(classId!, termPeriod),
    enabled: !!classId,
    staleTime: 1 * 60 * 1000,
  });
};

// Alias for backward compatibility
export const useStudentHealthLogs = useClassHealthLogs;

export const useBatchUpdateHealthLogs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      classId, records, termPeriod,
    }: {
      classId: number | string;
      records: Array<{ studentId: number; height?: number; weight?: number; note?: string }>;
      termPeriod?: string;
    }) => healthService.batchUpdateHealthLogs(classId, records, termPeriod),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['classHealthLogs', variables.classId] });
    },
  });
};

export const useCreateHealthLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      classId, studentId, payload,
    }: {
      classId: number | string;
      studentId: number | string;
      payload: SubmitHealthMeasurementPayload;
    }) => healthService.createHealthLog(classId, studentId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['classHealthLogs', variables.classId] });
      queryClient.invalidateQueries({ queryKey: ['detailedStudents', variables.classId] });
    },
  });
};

export const useUpdateHealthLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      classId, logId, payload,
    }: {
      classId: number | string;
      logId: number;
      payload: { height?: number; weight?: number; notes?: string };
    }) => healthService.updateHealthLog(classId, logId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['classHealthLogs', variables.classId] });
    },
  });
};

export const useDeleteHealthLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, logId }: { classId: number | string; logId: number }) =>
      healthService.deleteHealthLog(classId, logId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['classHealthLogs', variables.classId] });
    },
  });
};

// ─── Development Assessments ───────────────────────────────────────────────────

export const useClassDevelopmentAssessments = (classId: number | string | undefined, termPeriod?: string) => {
  return useQuery({
    queryKey: ['classDevelopmentAssessments', classId, termPeriod],
    queryFn: () => healthService.getDevelopmentAssessments(classId!, termPeriod),
    enabled: !!classId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useUpsertDevelopmentAssessments = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      classId, items, termPeriod,
    }: {
      classId: number | string;
      items: Array<{
        studentId: number;
        physicalScore?: number;
        emotionalScore?: number;
        socialScore?: number;
        languageScore?: number;
        cognitiveScore?: number;
        overallNote?: string;
      }>;
      termPeriod?: string;
    }) => healthService.upsertDevelopmentAssessments(classId, items, termPeriod),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['classDevelopmentAssessments', variables.classId] });
    },
  });
};
