'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { useAuth } from '@kindercare/core';
import { studentService } from '@/services/Student/StudentService';
import { ViewIcon } from '@/icons/ViewIcon';
import {
  Container,
  Title,
  HeaderActions,
  SearchContainer,
  SearchInput,
  Select,
  TableCard,
  Table,
  Th,
  Tr,
  Td,
  UserInfoCell,
  AvatarWrapper,
  AvatarImg,
  AvatarText,
  IconBtn,
  LoadingText,
  ErrorText,
  PaginationContainer,
  PaginationText,
  PaginationGroup,
  PageButton
} from './styles';
import { getInitials } from '../AccountList/utils/getInitials';

export default function StudentListView() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [classes, setClasses] = useState<string[]>([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchStudents();
    }
  }, [isAuthenticated, authLoading]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAllStudents();
      setStudents(data);
      
      // Extract unique classes for filter
      const uniqueClasses = Array.from(new Set(data.map(s => s.currentClass).filter(Boolean))) as string[];
      setClasses(uniqueClasses.sort());
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Lỗi khi tải danh sách học sinh');
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (studentId: number) => {
    router.push(`/students/${studentId}`);
  };

  // Filter
  const filteredStudents = students.filter(student => {
    if (classFilter !== 'all' && student.currentClass !== classFilter) {
      return false;
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const name = student.fullName?.toLowerCase() || '';
      const id = String(student.id);
      return name.includes(term) || id.includes(term);
    }
    
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, classFilter]);

  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'Chưa cập nhật';
    return new Date(timestamp * 1000).toLocaleDateString('vi-VN');
  };

  if (authLoading) return null;

  return (
    <Container>
      <Title>Danh sách Học sinh</Title>
      
      <HeaderActions>
        <SearchContainer>
          <SearchInput 
            placeholder="Tìm kiếm theo tên hoặc mã học sinh..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        
        <Select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
          <option value="all">Tất cả lớp học</option>
          {classes.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </Select>
      </HeaderActions>

      <TableCard>
        <Table>
          <thead>
            <Tr>
              <Th>STT</Th>
              <Th>Học sinh</Th>
              <Th>Mã HS</Th>
              <Th>Ngày sinh</Th>
              <Th>Giới tính</Th>
              <Th>Lớp hiện tại</Th>
              <Th>Thao tác</Th>
            </Tr>
          </thead>
          <tbody>
            {loading ? (
              <Tr><Td colSpan={7}><LoadingText>Đang tải dữ liệu...</LoadingText></Td></Tr>
            ) : error ? (
              <Tr><Td colSpan={7}><ErrorText>{error}</ErrorText></Td></Tr>
            ) : currentData.length === 0 ? (
              <Tr><Td colSpan={7}><LoadingText>Không tìm thấy học sinh nào.</LoadingText></Td></Tr>
            ) : (
              currentData.map((student, index) => (
                <Tr key={student.id}>
                  <Td>{startIndex + index + 1}</Td>
                  <Td>
                    <UserInfoCell>
                      <AvatarWrapper>
                        {student.avatarUrl ? (
                          <AvatarImg src={student.avatarUrl} alt={student.fullName} />
                        ) : (
                          <AvatarText>{getInitials(student.fullName)}</AvatarText>
                        )}
                      </AvatarWrapper>
                      <span style={{ fontWeight: 500 }}>{student.fullName}</span>
                    </UserInfoCell>
                  </Td>
                  <Td>{student.id}</Td>
                  <Td>{formatDate(student.dateOfBirth)}</Td>
                  <Td>{student.gender || 'Chưa cập nhật'}</Td>
                  <Td>
                    {student.currentClass ? (
                      <span style={{ color: '#047857', fontWeight: 500 }}>{student.currentClass}</span>
                    ) : (
                      <span style={{ color: '#6b7280' }}>Chờ xếp lớp</span>
                    )}
                  </Td>
                  <Td>
                    <IconBtn 
                      title="Xem hồ sơ" 
                      onClick={() => handleViewProfile(student.id)}
                    >
                      <ViewIcon width={20} height={20} />
                    </IconBtn>
                  </Td>
                </Tr>
              ))
            )}
          </tbody>
        </Table>

        {!loading && !error && filteredStudents.length > 0 && (
          <PaginationContainer>
            <PaginationText>
              Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredStudents.length)} của {filteredStudents.length} học sinh
            </PaginationText>
            <PaginationGroup>
              <PageButton 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                Trước
              </PageButton>
              <PageButton 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                Sau
              </PageButton>
            </PaginationGroup>
          </PaginationContainer>
        )}
      </TableCard>
    </Container>
  );
}
