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
  const [sortBy, setSortBy] = useState('name_asc');
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

  const getFirstName = (fullName: string) => {
    if (!fullName) return '';
    const parts = fullName.trim().split(' ');
    return parts[parts.length - 1];
  };

  const getLastName = (fullName: string) => {
    if (!fullName) return '';
    const parts = fullName.trim().split(' ');
    parts.pop();
    return parts.join(' ');
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

  // Sort
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const nameA = getFirstName(a.fullName).toLowerCase();
    const nameB = getFirstName(b.fullName).toLowerCase();
    
    if (sortBy === 'name_asc') {
      return nameA.localeCompare(nameB, 'vi-VN');
    } else if (sortBy === 'name_desc') {
      return nameB.localeCompare(nameA, 'vi-VN');
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedStudents.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, classFilter, sortBy]);

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

        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name_asc">Tên (A-Z)</option>
          <option value="name_desc">Tên (Z-A)</option>
        </Select>
      </HeaderActions>

      <TableCard>
        <Table>
          <thead>
            <Tr>
              <Th style={{ width: '60px', textAlign: 'center' }}>STT</Th>
              <Th style={{ width: '60px' }}></Th>
              <Th>Họ và tên đệm</Th>
              <Th>Tên</Th>
              <Th>Mã HS</Th>
              <Th>Ngày sinh</Th>
              <Th>Giới tính</Th>
              <Th>Lớp hiện tại</Th>
              <Th style={{ textAlign: 'center' }}>Thao tác</Th>
            </Tr>
          </thead>
          <tbody>
            {loading ? (
              <Tr><Td colSpan={9}><LoadingText>Đang tải dữ liệu...</LoadingText></Td></Tr>
            ) : error ? (
              <Tr><Td colSpan={9}><ErrorText>{error}</ErrorText></Td></Tr>
            ) : currentData.length === 0 ? (
              <Tr><Td colSpan={9}><LoadingText>Không tìm thấy học sinh nào.</LoadingText></Td></Tr>
            ) : (
              currentData.map((student, index) => (
                <Tr key={student.id}>
                  <Td style={{ textAlign: 'center' }}>{startIndex + index + 1}</Td>
                  <Td>
                    <AvatarWrapper>
                      {student.avatarUrl ? (
                        <AvatarImg src={student.avatarUrl} alt={student.fullName} />
                      ) : (
                        <AvatarText>{getInitials(student.fullName)}</AvatarText>
                      )}
                    </AvatarWrapper>
                  </Td>
                  <Td style={{ fontWeight: 500, color: '#111827' }}>{getLastName(student.fullName)}</Td>
                  <Td style={{ fontWeight: 500, color: '#111827' }}>{getFirstName(student.fullName)}</Td>
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
                  <Td style={{ textAlign: 'center' }}>
                    <IconBtn 
                      title="Xem hồ sơ" 
                      onClick={() => handleViewProfile(student.id)}
                      style={{ margin: '0 auto' }}
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
