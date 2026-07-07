'use client';

import { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { studentHealthService } from '@/services/studentHealth/StudentHealthService';
import type {
  CreateAllergyPayload,
  CreateHealthLogPayload,
  CreateMedicationPayload,
  MedicationStatus,
  UpdateAllergyPayload,
  UpdateHealthLogPayload,
  UpdateMedicationStatusPayload,
} from '@/config/types/studentHealth';

interface Toast {
  id: string;
  text: string;
  variant: 'success' | 'error' | 'warning' | 'info';
}

export interface StudentHealthInput {
  classId: number | string | undefined;
  studentId: number | string | undefined;
}

export const useStudentHealth = ({ classId, studentId }: StudentHealthInput) => {
  const queryClient = useQueryClient();

  const allergiesKey = ['studentHealth', 'allergies', classId, studentId] as const;
  const medicationsKey = ['studentHealth', 'medications', classId, studentId] as const;
  const logsKey = ['studentHealth', 'logs', classId, studentId] as const;

  const invalidateAll = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: allergiesKey });
    queryClient.invalidateQueries({ queryKey: medicationsKey });
    queryClient.invalidateQueries({ queryKey: logsKey });
  }, [queryClient, allergiesKey, medicationsKey, logsKey]);

  // ---------------------------------------------------------------- Queries

  const allergiesQuery = useQuery({
    queryKey: allergiesKey,
    queryFn: () => studentHealthService.listAllergies(classId!, studentId!),
    enabled: !!classId && !!studentId,
    staleTime: 5 * 60 * 1000,
  });

  const medicationsQuery = useQuery({
    queryKey: medicationsKey,
    queryFn: () => studentHealthService.listMedications(classId!, studentId!),
    enabled: !!classId && !!studentId,
    staleTime: 5 * 60 * 1000,
  });

  const logsQuery = useQuery({
    queryKey: logsKey,
    queryFn: () => studentHealthService.listHealthLogs(classId!, studentId!),
    enabled: !!classId && !!studentId,
    staleTime: 60 * 1000,
  });

  // ----------------------------------------------------------- Allergy mutations

  const addAllergyMutation = useMutation({
    mutationFn: (payload: CreateAllergyPayload) =>
      studentHealthService.createAllergy(classId!, studentId!, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: allergiesKey }),
  });

  const updateAllergyMutation = useMutation({
    mutationFn: ({ allergyId, payload }: { allergyId: number; payload: UpdateAllergyPayload }) =>
      studentHealthService.updateAllergy(classId!, allergyId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: allergiesKey }),
  });

  const deleteAllergyMutation = useMutation({
    mutationFn: (allergyId: number) => studentHealthService.deleteAllergy(classId!, allergyId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: allergiesKey }),
  });

  // ------------------------------------------------------- Medication mutations

  const addMedicationMutation = useMutation({
    mutationFn: (payload: CreateMedicationPayload) =>
      studentHealthService.createMedication(classId!, studentId!, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: medicationsKey }),
  });

  const updateMedicationStatusMutation = useMutation({
    mutationFn: ({ medicationId, payload }: { medicationId: number; payload: UpdateMedicationStatusPayload }) =>
      studentHealthService.updateMedicationStatus(classId!, medicationId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: medicationsKey }),
  });

  const deleteMedicationMutation = useMutation({
    mutationFn: (medicationId: number) => studentHealthService.deleteMedication(classId!, medicationId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: medicationsKey }),
  });

  // ------------------------------------------------------- Health log mutations

  const addLogMutation = useMutation({
    mutationFn: (payload: CreateHealthLogPayload) =>
      studentHealthService.createHealthLog(classId!, studentId!, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: logsKey }),
  });

  const updateLogMutation = useMutation({
    mutationFn: ({ logId, payload }: { logId: number; payload: UpdateHealthLogPayload }) =>
      studentHealthService.updateHealthLog(classId!, logId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: logsKey }),
  });

  const deleteLogMutation = useMutation({
    mutationFn: (logId: number) => studentHealthService.deleteHealthLog(classId!, logId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: logsKey }),
  });

  // ----------------------------------------------------------- Toast stack

  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((text: string, variant: Toast['variant'] = 'success') => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, text, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // ------------------------------------------------------- Filter helpers

  const filterMedications = (status: MedicationStatus | 'All') => {
    const list = medicationsQuery.data ?? [];
    if (status === 'All') return list;
    return list.filter((m) => m.status === status);
  };

  return {
    // queries
    allergies: allergiesQuery.data ?? [],
    medications: medicationsQuery.data ?? [],
    logs: logsQuery.data ?? [],
    isLoadingAllergies: allergiesQuery.isLoading,
    isLoadingMedications: medicationsQuery.isLoading,
    isLoadingLogs: logsQuery.isLoading,
    isErrorAllergies: allergiesQuery.isError,
    isErrorMedications: medicationsQuery.isError,
    isErrorLogs: logsQuery.isError,
    errorAllergies: allergiesQuery.error,
    errorMedications: medicationsQuery.error,
    errorLogs: logsQuery.error,
    refetchAllergies: allergiesQuery.refetch,
    refetchMedications: medicationsQuery.refetch,
    refetchLogs: logsQuery.refetch,

    // mutations
    addAllergy: addAllergyMutation.mutateAsync,
    isAddingAllergy: addAllergyMutation.isPending,
    updateAllergy: updateAllergyMutation.mutateAsync,
    isUpdatingAllergy: updateAllergyMutation.isPending,
    deleteAllergy: deleteAllergyMutation.mutateAsync,
    isDeletingAllergy: deleteAllergyMutation.isPending,

    addMedication: addMedicationMutation.mutateAsync,
    isAddingMedication: addMedicationMutation.isPending,
    updateMedicationStatus: updateMedicationStatusMutation.mutateAsync,
    isUpdatingMedicationStatus: updateMedicationStatusMutation.isPending,
    deleteMedication: deleteMedicationMutation.mutateAsync,
    isDeletingMedication: deleteMedicationMutation.isPending,

    addLog: addLogMutation.mutateAsync,
    isAddingLog: addLogMutation.isPending,
    updateLog: updateLogMutation.mutateAsync,
    isUpdatingLog: updateLogMutation.isPending,
    deleteLog: deleteLogMutation.mutateAsync,
    isDeletingLog: deleteLogMutation.isPending,

    // helpers
    filterMedications,
    invalidateAll,
    toasts,
    showToast,
  };
};