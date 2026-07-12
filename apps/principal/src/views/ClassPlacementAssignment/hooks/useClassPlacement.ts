import { useState, useEffect, useCallback, useMemo } from 'react';
import { studentService } from '@/services/Student/StudentService';
import { gradeService } from '@/services/grade/GradeService';
import { classService } from '@/services/Class/ClassService';
import { assignmentService } from '@/services/Principal/AssignmentService';
import { GradeDomainModel } from '@/config/types/grade';
import { ClassDetailDomainModel, ClassStudentDomainModel } from '@/config/types/class';

interface UseClassPlacementReturn {
  grades: GradeDomainModel[];
  sourceClassId: string;
  sourceStudents: ClassStudentDomainModel[];
  selectedClassId: string;
  classDetail: ClassDetailDomainModel | null;
  selectedStudentIds: number[];
  stagedStudents: ClassStudentDomainModel[];
  loading: boolean;
  loadingClass: boolean;
  saving: boolean;
  error: string | null;
  handleSourceClassChange: (classId: string) => void;
  handleTargetClassChange: (classId: string) => void;
  toggleStudentSelection: (studentId: number) => void;
  selectAllSource: () => void;
  clearSourceSelection: () => void;
  moveSelectedToStaging: () => void;
  unstageStudent: (studentId: number) => void;
  handleSaveAssignment: () => Promise<void>;
}

export const useClassPlacement = (): UseClassPlacementReturn => {
  const [grades, setGrades] = useState<GradeDomainModel[]>([]);
  const [sourceClassId, setSourceClassId] = useState('');
  const [sourceStudentsRaw, setSourceStudentsRaw] = useState<ClassStudentDomainModel[]>([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [classDetail, setClassDetail] = useState<ClassDetailDomainModel | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
  const [stagedStudents, setStagedStudents] = useState<ClassStudentDomainModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingClass, setLoadingClass] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        setSourceStudentsRaw(data);
      } else {
        const detail = await classService.getClassDetail(parseInt(classId));
        setSourceStudentsRaw(detail.students ?? []);
      }
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

  // Ẩn khỏi nguồn những học sinh đã được đưa vào hàng chờ (staging) để tránh chọn trùng.
  const sourceStudents = useMemo(() => {
    const stagedIds = new Set(stagedStudents.map(s => s.studentId));
    return sourceStudentsRaw.filter(s => !stagedIds.has(s.studentId));
  }, [sourceStudentsRaw, stagedStudents]);

  const resetStaging = useCallback(() => {
    setStagedStudents([]);
    setSelectedStudentIds([]);
    setError(null);
  }, []);

  const handleSourceClassChange = useCallback((classId: string) => {
    resetStaging();
    setSourceClassId(classId);
  }, [resetStaging]);

  const handleTargetClassChange = useCallback(async (classId: string) => {
    resetStaging();
    setSelectedClassId(classId);
    if (classId) {
      await fetchClassDetail(classId);
    } else {
      setClassDetail(null);
    }
  }, [fetchClassDetail, resetStaging]);

  const toggleStudentSelection = useCallback((studentId: number) => {
    setSelectedStudentIds(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  }, []);

  const selectAllSource = useCallback(() => {
    setSelectedStudentIds(sourceStudents.map(s => s.studentId));
  }, [sourceStudents]);

  const clearSourceSelection = useCallback(() => {
    setSelectedStudentIds([]);
  }, []);

  const moveSelectedToStaging = useCallback(() => {
    if (selectedStudentIds.length === 0) return;
    const toMove = sourceStudents.filter(s => selectedStudentIds.includes(s.studentId));
    setStagedStudents(prev => [...prev, ...toMove]);
    setSelectedStudentIds([]);
  }, [selectedStudentIds, sourceStudents]);

  const unstageStudent = useCallback((studentId: number) => {
    setStagedStudents(prev => prev.filter(s => s.studentId !== studentId));
  }, []);

  const handleSaveAssignment = useCallback(async () => {
    if (!selectedClassId || stagedStudents.length === 0) return;
    try {
      setSaving(true);
      setError(null);
      const studentIds = stagedStudents.map(s => s.studentId);
      await assignmentService.assignStudentsToClass(studentIds, parseInt(selectedClassId));
      setStagedStudents([]);
      await fetchSourceStudents(sourceClassId);
      await fetchClassDetail(selectedClassId);
    } catch (err: unknown) {
      setError((err as Error)?.message ?? 'Có lỗi xảy ra khi xếp lớp');
    } finally {
      setSaving(false);
    }
  }, [selectedClassId, stagedStudents, sourceClassId, fetchSourceStudents, fetchClassDetail]);

  return {
    grades,
    sourceClassId,
    sourceStudents,
    selectedClassId,
    classDetail,
    selectedStudentIds,
    stagedStudents,
    loading,
    loadingClass,
    saving,
    error,
    handleSourceClassChange,
    handleTargetClassChange,
    toggleStudentSelection,
    selectAllSource,
    clearSourceSelection,
    moveSelectedToStaging,
    unstageStudent,
    handleSaveAssignment,
  };
};
