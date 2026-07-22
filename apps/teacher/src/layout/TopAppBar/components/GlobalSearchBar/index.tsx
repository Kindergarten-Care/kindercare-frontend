'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, User, BookOpen, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from '@/i18n/routing';
import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import type { StudentDetailedDomainModel, DetailedStudentsApiResponse } from '@/config/types/student';
import { fixImageUrl } from '@/utils/imageUrl';
import { getStudentInitials } from '@/utils/string';
import { StudentMapper } from '@/services/student/StudentMapper';
import styled, { keyframes } from 'styled-components';

// ──────────────────────────────────────────────────────────
// Styled Components
// ──────────────────────────────────────────────────────────
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-6px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0)   scale(1); }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 11px;
  flex: 1;
  max-width: 460px;
  height: 48px;
  padding: 0 18px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #E6EEE9;
  box-shadow: 0 4px 18px -8px rgba(0, 90, 54, 0.08);
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #34D399;
    box-shadow: 0 4px 20px -6px rgba(0, 90, 54, 0.15);
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: #1F2937;

  &::placeholder { color: #9CA3AF; }
`;

const ClearBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F3F4F6;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  color: #6B7280;
  flex-shrink: 0;
  transition: background 0.15s;

  &:hover { background: #E5E7EB; }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 18px;
  border: 1px solid #E6EEE9;
  box-shadow: 0 16px 48px -12px rgba(0, 90, 54, 0.18);
  z-index: 9999;
  overflow: hidden;
  animation: ${fadeIn} 0.18s ease;
  min-width: 360px;
`;

const DropdownSection = styled.div`
  padding: 10px 0 4px;
`;

const SectionLabel = styled.div`
  font-size: 10.5px;
  font-weight: 700;
  color: #9CA3AF;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0 16px 6px;
`;

const ResultItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 9px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: background 0.12s;
  border-radius: 0;

  &:hover { background: #F0FFF8; }
`;

const Avatar = styled.div<{ $color?: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${p => p.$color || 'linear-gradient(135deg, #34D399, #005A36)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  font-size: 13px;
  flex-shrink: 0;
  overflow: hidden;
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.div`
  font-size: 13.5px;
  font-weight: 600;
  color: #1F2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemSub = styled.div`
  font-size: 11.5px;
  color: #9CA3AF;
  margin-top: 1px;
`;

const IconWrap = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const LoadingWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #9CA3AF;
  gap: 8px;
  font-size: 13px;
`;

const EmptyWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #9CA3AF;
  gap: 6px;
  font-size: 13px;
`;

const Divider = styled.div`
  height: 1px;
  background: #F3F4F6;
  margin: 4px 0;
`;

const ViewAll = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #059669;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.12s;

  &:hover { background: #F0FFF8; }
`;

// ──────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────
interface QuickLink {
  id: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
  href: string;
}

const QUICK_LINKS: QuickLink[] = [
  { id: 'attendance', label: 'Điểm danh hôm nay', desc: 'Xem & cập nhật điểm danh', icon: <BookOpen size={16} color="#059669" />, href: '/attendance' },
  { id: 'leave',      label: 'Đơn xin nghỉ',      desc: 'Xem danh sách đơn chờ duyệt', icon: <FileText size={16} color="#F59E0B" />, href: '/leave-requests' },
  { id: 'students',   label: 'Danh sách học sinh', desc: 'Quản lý học sinh trong lớp', icon: <User size={16} color="#3B82F6" />, href: '/students' },
];

// ──────────────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────────────
export const GlobalSearchBar: React.FC = () => {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [open, setOpen]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<StudentDetailedDomainModel[]>([]);
  const [classId, setClassId]   = useState<number | null>(null);

  // Fetch classId one time using the same pattern as TeacherDashboard
  useEffect(() => {
    apiClient
      .get<ApiResponse<{ classId: number; className: string }>>(SERVER.teacher.getMyActiveClass)
      .then(res => {
        const id = res.data?.data?.classId;
        if (id) setClassId(id);
      })
      .catch(() => {
        // Fallback: get from classes list
        apiClient
          .get<ApiResponse<Array<{ classId: number; className: string }>>>(SERVER.teacher.getClasses)
          .then(res2 => {
            const first = res2.data?.data?.[0];
            if (first?.classId) setClassId(first.classId);
          })
          .catch(() => {});
      });
  }, []);

  // Debounced search
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(searchTimeout.current);

    if (!val.trim()) {
      setStudents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    searchTimeout.current = setTimeout(async () => {
      try {
        if (!classId) { setLoading(false); return; }
        const endpoint = SERVER.teacher.getDetailedStudents.replace(':classId', classId.toString());
        const res = await apiClient.get<ApiResponse<DetailedStudentsApiResponse>>(endpoint);
        const rawStudents = res.data?.data?.students ?? [];
        const domainStudents = StudentMapper.toDomainList(rawStudents);
        const q = val.toLowerCase();
        const filtered = domainStudents.filter(s =>
          s.fullName?.toLowerCase().includes(q) ||
          s.nickname?.toLowerCase().includes(q)
        );
        setStudents(filtered.slice(0, 5));
      } catch {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    }, 280);
  };

  const clear = () => {
    setQuery('');
    setStudents([]);
    setOpen(false);
  };

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleStudentClick = (s: StudentDetailedDomainModel) => {
    router.push(`/students?studentId=${s.studentId}`);
    clear();
  };

  const handleViewAll = () => {
    router.push(`/students?search=${encodeURIComponent(query)}`);
    clear();
  };

  const showDropdown = open && (query.trim() || true); // show on focus too
  const hasResults   = query.trim().length > 0;

  return (
    <Wrapper ref={wrapperRef}>
      <Search size={19} color="#9CA3AF" strokeWidth={2.2} style={{ flexShrink: 0 }} />
      <Input
        type="text"
        placeholder="Tìm bé, hoạt động hoặc danh mục…"
        value={query}
        onChange={handleChange}
        onFocus={() => setOpen(true)}
      />
      {query && (
        <ClearBtn onClick={clear} aria-label="Xóa tìm kiếm">
          <X size={12} />
        </ClearBtn>
      )}

      {showDropdown && (
        <Dropdown>
          {/* Searching state */}
          {loading && (
            <LoadingWrap>
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              Đang tìm kiếm…
            </LoadingWrap>
          )}

          {/* Student results */}
          {!loading && hasResults && students.length > 0 && (
            <DropdownSection>
              <SectionLabel>Học sinh</SectionLabel>
              {students.map(s => (
                <ResultItem key={s.studentId} onClick={() => handleStudentClick(s)}>
                  <Avatar>
                    {s.avatarUrl ? (
                      <AvatarImg src={fixImageUrl(s.avatarUrl)} alt={s.fullName} />
                    ) : (
                      getStudentInitials(s.fullName)
                    )}
                  </Avatar>
                  <ItemInfo>
                    <ItemName>{s.fullName}</ItemName>
                    <ItemSub>
                      {s.gender === 'Nam' ? '👦' : '👧'}{' '}
                      {s.allergies ? `Dị ứng: ${s.allergies}` : 'Không dị ứng'}
                    </ItemSub>
                  </ItemInfo>
                  <ArrowRight size={14} color="#CBD5E1" />
                </ResultItem>
              ))}
              {students.length >= 5 && (
                <>
                  <Divider />
                  <ViewAll onClick={handleViewAll}>
                    <ArrowRight size={14} />
                    Xem tất cả kết quả cho &ldquo;{query}&rdquo;
                  </ViewAll>
                </>
              )}
            </DropdownSection>
          )}

          {/* No results */}
          {!loading && hasResults && students.length === 0 && (
            <EmptyWrap>
              <Search size={28} color="#D1D5DB" />
              <span>Không tìm thấy <strong>&ldquo;{query}&rdquo;</strong></span>
              <span style={{ fontSize: 11, color: '#CBD5E1' }}>Thử tìm với tên khác</span>
            </EmptyWrap>
          )}

          {/* Quick links (when no query) */}
          {!loading && !hasResults && (
            <DropdownSection>
              <SectionLabel>Truy cập nhanh</SectionLabel>
              {QUICK_LINKS.map(link => (
                <ResultItem key={link.id} onClick={() => { router.push(link.href as any); setOpen(false); }}>
                  <IconWrap>{link.icon}</IconWrap>
                  <ItemInfo>
                    <ItemName>{link.label}</ItemName>
                    <ItemSub>{link.desc}</ItemSub>
                  </ItemInfo>
                  <ArrowRight size={14} color="#CBD5E1" />
                </ResultItem>
              ))}
            </DropdownSection>
          )}
        </Dropdown>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </Wrapper>
  );
};
