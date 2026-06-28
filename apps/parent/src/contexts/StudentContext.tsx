'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@kindercare/core';
import { StudentDomainModel } from '@/config/types/student';
import { studentService } from '@/services/Student/StudentService';

interface StudentContextValue {
  children: StudentDomainModel[];
  activeStudent: StudentDomainModel | null;
  loading: boolean;
  error: string | null;
  setActiveStudent: (student: StudentDomainModel) => void;
  refreshChildren: () => Promise<void>;
}

const StudentContext = createContext<StudentContextValue | null>(null);

export function StudentProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [students, setStudents] = useState<StudentDomainModel[]>([]);
  const [activeStudent, setActiveStudentState] = useState<StudentDomainModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChildren = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getChildren();
      setStudents(data);
      if (data.length > 0) {
        // Set the primary child as active, or default to the first one
        const primary = data.find(s => s.isPrimary === 1) || data[0];
        setActiveStudentState(primary);
      } else {
        setActiveStudentState(null);
      }
    } catch (err: any) {
      console.error('Failed to fetch children:', err);
      setError(err.message || 'Failed to load children');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;

    if (isAuthenticated) {
      fetchChildren();
    } else {
      setStudents([]);
      setActiveStudentState(null);
    }
  }, [isAuthenticated, authLoading, fetchChildren]);

  const setActiveStudent = (student: StudentDomainModel) => {
    setActiveStudentState(student);
  };

  const value: StudentContextValue = {
    children: students,
    activeStudent,
    loading,
    error,
    setActiveStudent,
    refreshChildren: fetchChildren,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent(): StudentContextValue {
  const ctx = useContext(StudentContext);
  if (!ctx) {
    throw new Error('useStudent must be used inside a StudentProvider');
  }
  return ctx;
}
