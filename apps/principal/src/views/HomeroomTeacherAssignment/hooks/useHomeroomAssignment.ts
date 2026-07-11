import { useState, useEffect, useCallback } from 'react';
import { gradeService } from '@/services/grade/GradeService';
import { classService } from '@/services/Class/ClassService';
import { GradeDomainModel, ClassDomainModel } from '@/config/types/grade';
import { ClassDetailDomainModel } from '@/config/types/class';

interface UseHomeroomAssignmentReturn {
  grades: GradeDomainModel[];
  selectedClass: ClassDomainModel | null;
  classDetail: ClassDetailDomainModel | null;
  loading: boolean;
  fetchGrades: () => Promise<void>;
  handleSelectClass: (cls: ClassDomainModel) => Promise<void>;
  handleRefresh: () => Promise<void>;
}

export const useHomeroomAssignment = (): UseHomeroomAssignmentReturn => {
  const [grades, setGrades] = useState<GradeDomainModel[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassDomainModel | null>(null);
  const [classDetail, setClassDetail] = useState<ClassDetailDomainModel | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchClassDetail = useCallback(async (classId: number) => {
    try {
      setLoading(true);
      const detail = await classService.getClassDetail(classId);
      setClassDetail(detail);
    } catch (err) {
      console.error(err);
      setClassDetail(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchGrades = useCallback(async () => {
    try {
      const data = await gradeService.getGradesAndClasses();
      setGrades(data);
      if (data.length > 0 && data[0].classes.length > 0) {
        const first = data[0].classes[0];
        setSelectedClass(first);
        await fetchClassDetail(first.classId);
      }
    } catch (err) {
      console.error(err);
    }
  }, [fetchClassDetail]);

  useEffect(() => {
    fetchGrades();
  }, [fetchGrades]);

  const handleSelectClass = useCallback(async (cls: ClassDomainModel) => {
    setSelectedClass(cls);
    await fetchClassDetail(cls.classId);
  }, [fetchClassDetail]);

  const handleRefresh = useCallback(async () => {
    if (selectedClass) {
      await fetchClassDetail(selectedClass.classId);
    }
  }, [selectedClass, fetchClassDetail]);

  return {
    grades,
    selectedClass,
    classDetail,
    loading,
    fetchGrades,
    handleSelectClass,
    handleRefresh,
  };
};
