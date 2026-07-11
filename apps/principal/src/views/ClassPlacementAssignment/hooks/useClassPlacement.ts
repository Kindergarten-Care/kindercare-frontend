import { useState, useEffect, useCallback } from 'react';
import { studentService } from '@/services/Student/StudentService';
import { gradeService } from '@/services/grade/GradeService';
import { classService } from '@/services/Class/ClassService';
import { assignmentService } from '@/services/Principal/AssignmentService';
import { GradeDomainModel } from '@/config/types/grade';
import { ClassDetailDomainModel } from '@/config/types/class';
import { ClassStudentDomainModel } from '@/config/types/class';

interface UseClassPlacementReturn {
  grades: GradeDomainModel[];
  sourceClassId: string;
  sourceStudents: ClassStudentDomainModel[];
  selectedClassId: string;
  classDetail: ClassDetailDomainModel | null;
  selectedStudentIds: number[];
  loading: boolean;
  loadingClass: boolean;
  handleSourceClassChange: (classId: string) => void;
  handleTargetClassChange: (classId: string) => void;
  toggleStudentSelection: (studentId: number) => void;
  handleAssignToClass: () => Promise<void>;
}

export const useClassPlacement = (): UseClassPlacementReturn => {
  const [grades, setGrades] = useState<GradeDomainModel[]>([]);
  const [sourceClassId, setSourceClassId] = useState('');
  const [sourceStudents, setSourceStudents] = useState<ClassStudentDomainModel[]>([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [classDetail, setClassDetail] = useState<ClassDetailDomainModel | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingClass, setLoadingClass] = useState(false);

  const fetchGrades = useCallback(async () => {
    try {
      const data = await gradeService.getGradesAndClasses();
      setGrades(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchSourceStudents = useCallback(async (classId: string) => {
    try {
      setLoading(true);
      if (!classId) {
        const data = await studentService.getUnassignedStudents();
        setSourceStudents(data);
      } else {
        const detail = await classService.getClassDetail(parseInt(classId));
        setSourceStudents(detail.students ?? []);
      }
      setSelectedStudentIds([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchClassDetail = useCallback(async (classId: string) => {
    try {
      setLoadingClass(true);
      if (classId) {
        const detail = await classService.getClassDetail(parseInt(classId));
        setClassDetail(detail);
      } else {
        setClassDetail(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingClass(false);
    }
  }, []);

  useEffect(() => {
    fetchGrades();
  }, [fetchGrades]);

  useEffect(() => {
    fetchSourceStudents(sourceClassId);
  }, [sourceClassId, fetchSourceStudents]);

  const handleSourceClassChange = useCallback((classId: string) => {
    setSourceClassId(classId);
  }, []);

  const handleTargetClassChange = useCallback(async (classId: string) => {
    setSelectedClassId(classId);
    if (classId) {
      await fetchClassDetail(classId);
    } else {
      setClassDetail(null);
    }
  }, [fetchClassDetail]);

  const toggleStudentSelection = useCallback((studentId: number) => {
    setSelectedStudentIds(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  }, []);

  const handleAssignToClass = useCallback(async () => {
    if (!selectedClassId || selectedStudentIds.length === 0) return;
    try {
      setLoading(true);
      await assignmentService.assignStudentsToClass(selectedStudentIds, parseInt(selectedClassId));
      await fetchSourceStudents(sourceClassId);
      await fetchClassDetail(selectedClassId);
    } catch (err: unknown) {
      window.alert((err as Error)?.message ?? 'Có lỗi xảy ra khi xếp lớp');
    } finally {
      setLoading(false);
    }
  }, [selectedClassId, selectedStudentIds, sourceClassId, fetchSourceStudents, fetchClassDetail]);

  return {
    grades,
    sourceClassId,
    sourceStudents,
    selectedClassId,
    classDetail,
    selectedStudentIds,
    loading,
    loadingClass,
    handleSourceClassChange,
    handleTargetClassChange,
    toggleStudentSelection,
    handleAssignToClass,
  };
};
