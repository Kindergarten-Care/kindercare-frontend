'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useStudent } from '@/contexts/StudentContext';
import { medicationRequestService } from '@/services/MedicationRequest/MedicationRequestService';
import { kcToast } from '@kindercare/ui';

interface MedicineItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  selectedTimes: string[];
  photo: File | null;
  photoUrl: string | null;
}

interface UseMedicationRequestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

const createEmptyMedicine = (index: number): MedicineItem => ({
  id: `med-${Date.now()}-${index}`,
  name: '',
  dosage: '',
  frequency: '',
  selectedTimes: ['Sau ăn trưa'],
  photo: null,
  photoUrl: null
});

export const useMedicationRequestPopup = ({ isOpen, onClose, onSubmitSuccess }: UseMedicationRequestPopupProps) => {
  const t = useTranslations('Dashboard');
  const { activeStudent } = useStudent();
  const [medicines, setMedicines] = useState<MedicineItem[]>([createEmptyMedicine(1)]);
  const [generalNote, setGeneralNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const activeUrlsRef = useRef<Set<string>>(new Set());

  // Cleanup all active Object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      activeUrlsRef.current.forEach(url => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  const handleAddMedicine = () => {
    setMedicines(prev => [...prev, createEmptyMedicine(prev.length + 1)]);
  };

  const cleanupUrls = () => {
    activeUrlsRef.current.forEach(url => {
      URL.revokeObjectURL(url);
    });
    activeUrlsRef.current.clear();
  };

  const handleClose = () => {
    cleanupUrls();
    onClose();
  };

  const handleRemoveMedicine = (id: string) => {
    if (medicines.length <= 1) return;
    setMedicines(prev => {
      const target = prev.find(m => m.id === id);
      if (target?.photoUrl) {
        URL.revokeObjectURL(target.photoUrl);
        activeUrlsRef.current.delete(target.photoUrl);
      }
      return prev.filter(m => m.id !== id);
    });
  };

  const handleFieldChange = (id: string, field: keyof MedicineItem, value: any) => {
    setMedicines(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, [field]: value };
      }
      return m;
    }));
  };

  const handleTimeToggle = (id: string, time: string) => {
    setMedicines(prev => prev.map(m => {
      if (m.id === id) {
        const isSelected = m.selectedTimes.includes(time);
        const nextTimes = isSelected
          ? m.selectedTimes.filter(t => t !== time)
          : [...m.selectedTimes, time];
        return { ...m, selectedTimes: nextTimes };
      }
      return m;
    }));
  };

  const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newUrl = URL.createObjectURL(file);
      activeUrlsRef.current.add(newUrl);

      setMedicines(prev => prev.map(m => {
        if (m.id === id) {
          if (m.photoUrl) {
            URL.revokeObjectURL(m.photoUrl);
            activeUrlsRef.current.delete(m.photoUrl);
          }
          return { ...m, photo: file, photoUrl: newUrl };
        }
        return m;
      }));
    }
  };

  const handleRemovePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setMedicines(prev => prev.map(m => {
      if (m.id === id) {
        if (m.photoUrl) {
          URL.revokeObjectURL(m.photoUrl);
          activeUrlsRef.current.delete(m.photoUrl);
        }
        return { ...m, photo: null, photoUrl: null };
      }
      return m;
    }));

    const inputEl = document.getElementById(`file-input-${id}`) as HTMLInputElement;
    if (inputEl) {
      inputEl.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!activeStudent) {
      kcToast.error(t('leave.errStudentNotFound'), t('errorTitle'));
      return;
    }

    const invalidMed = medicines.find(m => !m.name.trim());
    if (invalidMed) {
      kcToast.error(t('medication.errNameRequired'), t('errorTitle'));
      return;
    }

    setIsSubmitting(true);

    try {
      // Save the exact current timestamp (including hour, minute, second) when sending the request
      const requestDate = Math.floor(Date.now() / 1000);

      // Create promises for each medicine card
      const promises = medicines.map(m => {
        return medicationRequestService.createMedicationRequest({
          studentId: activeStudent.studentId,
          requestDate,
          medicineDetails: m.name.trim(),
          dosage: m.dosage.trim() || t('medication.dosageUnspecified'),
          frequency: m.frequency.trim() || null,
          timeToTake: m.selectedTimes.join(', ') || null,
          parentNote: generalNote.trim() || null,
        }, m.photo);
      });

      await Promise.all(promises);

      kcToast.success(t('medication.successMsg'), t('successTitle'));

      // Reset state and close
      cleanupUrls();
      setMedicines([createEmptyMedicine(1)]);
      setGeneralNote('');
      onSubmitSuccess?.();
      onClose();
    } catch (err: any) {
      console.error('Failed to create medication requests:', err);
      kcToast.error(err.message || t('medication.errSubmitFailed'), t('errorTitle'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    medicines,
    generalNote,
    setGeneralNote,
    isSubmitting,
    handleAddMedicine,
    handleRemoveMedicine,
    handleFieldChange,
    handleTimeToggle,
    handleFileChange,
    handleRemovePhoto,
    handleSubmit,
    handleClose,
  };
};
