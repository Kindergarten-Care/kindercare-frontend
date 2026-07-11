import { useState, useEffect, useCallback } from 'react';
import { studentService } from '@/services/Student/StudentService';
import { gradeService } from '@/services/grade/GradeService';
import { StudentDetailDomainModel, StudentDetailApiDto } from '@/config/types/student';
import { StudentMapper } from '@/services/Student/StudentMapper';
import { ITEMS_PER_PAGE } from '@/constants';

export type SortKey = 'name_asc' | 'name_desc';

interface UseStudentListReturn {
  students: StudentDetailDomainModel[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  classFilter: string;
  sortBy: SortKey;
  classes: string[];
  currentPage: number;
  totalPages: number;
  currentData: StudentDetailDomainModel[];
  setSearchTerm: (v: string) => void;
  setClassFilter: (v: string) => void;
  setSortBy: (v: SortKey) => void;
  setCurrentPage: (v: number | ((prev: number) => number)) => void;
  handleViewProfile: (studentId: number) => void;
  fetchStudents: () => Promise<void>;
}

export const useStudentList = (): UseStudentListReturn => {
  const [students, setStudents] = useState<StudentDetailDomainModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [sortBy, setSortBy] = useState<SortKey>('name_asc');
  const [classes, setClasses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const [rawData, grades] = await Promise.all([
        studentService.getAllStudents(),
        gradeService.getGradesAndClasses(),
      ]);
      // Map through StudentMapper to convert API DTO → Domain Model
      const mapped: StudentDetailDomainModel[] = (rawData as StudentDetailApiDto[]).map(
        StudentMapper.toStudentDetailDomain
      );
      setStudents(mapped);
      // Danh sách lớp lấy từ toàn bộ khối/lớp trong trường, không chỉ suy ra từ học sinh đã có
      // để các lớp chưa có học sinh nào vẫn xuất hiện trong bộ lọc.
      const allClasses = grades.flatMap(g => g.classes.map(c => c.className));
      setClasses(Array.from(new Set(allClasses)).sort());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi khi tải danh sách học sinh');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, classFilter, sortBy]);

  const handleViewProfile = useCallback((studentId: number) => {
    window.location.href = `/students/${studentId}`;
  }, []);

  const filtered = students.filter(s => {
    if (classFilter !== 'all' && s.className !== classFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const name = (s.fullName ?? '').toLowerCase();
      const id = String(s.id);
      return name.includes(term) || id.includes(term);
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const nameA = ((a.fullName ?? '').split(' ').pop() ?? '').toLowerCase();
    const nameB = ((b.fullName ?? '').split(' ').pop() ?? '').toLowerCase();
    if (sortBy === 'name_asc') return nameA.localeCompare(nameB, 'vi-VN');
    return nameB.localeCompare(nameA, 'vi-VN');
  });

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return {
    students,
    loading,
    error,
    searchTerm,
    classFilter,
    sortBy,
    classes,
    currentPage,
    totalPages,
    currentData,
    setSearchTerm,
    setClassFilter,
    setSortBy,
    setCurrentPage,
    handleViewProfile,
    fetchStudents,
  };
};
