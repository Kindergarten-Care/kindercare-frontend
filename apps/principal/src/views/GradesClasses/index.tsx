'use client';

import React, { useEffect, useState } from 'react';
import { GradeDomainModel } from '@/config/types/grade';
import { gradeService } from '@/services/grade/GradeService';
import { useRouter } from '@/i18n/routing';
import {
  Container,
  Title,
  TreeContainer,
  TreeList,
  TreeItem,
  GradeNode,
  ChevronIcon,
  ClassListWrapper,
  ClassListInner,
  ClassList,
  ClassNode,
  FolderIcon,
  FileIcon,
  LoadingText,
  ErrorText,
  EmptyText
} from './styles';
import { CreateGradeClassModal } from './components/CreateGradeClassModal';

export default function GradesClassesView() {
  const [grades, setGrades] = useState<GradeDomainModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedGrades, setExpandedGrades] = useState<Record<number, boolean>>({});
  const router = useRouter();

  useEffect(() => {
    fetchGradesAndClasses();
  }, []);

  const fetchGradesAndClasses = async () => {
    try {
      setLoading(true);
      const data = await gradeService.getGradesAndClasses();
      setGrades(data);
      // Auto expand all by default
      const initialExpanded: Record<number, boolean> = {};
      data.forEach(g => {
        initialExpanded[g.gradeId] = true;
      });
      setExpandedGrades(initialExpanded);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải dữ liệu khối học và lớp học');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (gradeId: number) => {
    setExpandedGrades(prev => ({
      ...prev,
      [gradeId]: !prev[gradeId]
    }));
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title style={{ marginBottom: 0 }}>Khối học và Lớp học</Title>
        <button 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#047857',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onClick={() => setShowCreateModal(true)}
        >
          + Thêm Khối / Lớp
        </button>
      </div>

      {loading && <LoadingText>Đang tải dữ liệu...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
      {!loading && !error && grades.length === 0 && (
        <EmptyText>Chưa có dữ liệu Khối học và Lớp học.</EmptyText>
      )}

      {!loading && !error && grades.length > 0 && (
        <TreeContainer>
          <TreeList>
            {grades.map(grade => (
              <TreeItem key={grade.gradeId}>
                <GradeNode onClick={() => toggleExpand(grade.gradeId)}>
                  <ChevronIcon $isExpanded={!!expandedGrades[grade.gradeId]}>
                    ▶
                  </ChevronIcon>
                  <FolderIcon>🏫</FolderIcon>
                  {grade.gradeName} 
                  <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'normal' }}>
                    ({grade.classes.length} Lớp học)
                  </span>
                </GradeNode>
                
                <ClassListWrapper $isExpanded={!!expandedGrades[grade.gradeId]}>
                  <ClassListInner>
                    <ClassList>
                      {grade.classes.length > 0 ? (
                        grade.classes.map(cls => (
                          <ClassNode 
                            key={cls.classId}
                            onClick={() => router.push(`/classes/${cls.classId}`)}
                            style={{ cursor: 'pointer' }}
                          >
                            <FileIcon>📚</FileIcon>
                            {cls.className}
                          </ClassNode>
                        ))
                      ) : (
                        <ClassNode style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                          Chưa có lớp học nào
                        </ClassNode>
                      )}
                    </ClassList>
                  </ClassListInner>
                </ClassListWrapper>
              </TreeItem>
            ))}
          </TreeList>
        </TreeContainer>
      )}

      {showCreateModal && (
        <CreateGradeClassModal
          existingGrades={grades}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchGradesAndClasses();
          }}
        />
      )}
    </Container>
  );
}
