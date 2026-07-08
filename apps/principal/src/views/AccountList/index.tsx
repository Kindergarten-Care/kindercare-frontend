'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { useAuth } from '@kindercare/core';
import { Dropdown } from '@kindercare/ui';
import { AccountDomainModel } from '@/config/types/account';
import { useAccountList } from './hooks/useAccountList';
import { useAccountModal } from './hooks/useAccountModal';
import { getInitials } from './utils/getInitials';
import { ConfirmationModal } from './components/ConfirmationModal';
import { CreateAccountModal } from './components/CreateAccountModal';
import { ViewIcon } from '@/icons/ViewIcon';
import { LockIcon } from '@/icons/LockIcon';
import { UnlockIcon } from '@/icons/UnlockIcon';
import {
  Container,
  Title,
  TableCard,
  Table,
  Th,
  Tr,
  Td,
  LoadingText,
  ErrorText,
  ActionGroup,
  IconBtn,
  PaginationContainer,
  PaginationText,
  PaginationGroup,
  PageButton,
  UserInfoCell,
  AvatarWrapper,
  AvatarImg,
  AvatarText,
  SearchContainer,
  SearchInput,
  SearchButton,
  StatusBadge,
  HeaderActions,
  CreateButton
} from './styles';

export default function AccountListView() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get('role');

  const { accounts, loading, error, fetchAccounts } = useAccountList(role, isAuthenticated, authLoading);
  const { modalConfig, handleActionClick: handleModalClick, closeModal, confirmModalAction } = useAccountModal(fetchAccounts);

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayTitle = role === 'teacher' ? 'Danh sách Giáo viên' : role === 'parent' ? 'Danh sách Phụ huynh' : 'Danh sách Tài khoản';

  const handleActionClick = (account: AccountDomainModel, action: string) => {
    setActiveDropdown(null);
    if (action === 'view') {
      router.push(`/accounts/${role}/${account.id}`);
    } else if (action === 'lock' || action === 'unlock') {
      handleModalClick(account, action);
    }
  };

  const filteredAccounts = accounts.filter(acc => {
    // Status Filter
    if (statusFilter !== 'all') {
      const accStatus = acc.status?.toLowerCase() || 'inactive';
      if (statusFilter !== accStatus) return false;
    }

    // Text Filter
    if (!filterText) return true;
    const term = filterText.toLowerCase();
    const fullName = acc.fullName?.toLowerCase() || '';
    const email = acc.email?.toLowerCase() || '';
    const phone = acc.phoneNumber || '';
    
    return fullName.includes(term) || email.includes(term) || phone.includes(term);
  });

  return (
    <Container>
      <Title>{displayTitle}</Title>

      <HeaderActions>
        <SearchContainer>
          <SearchInput 
            placeholder="Tìm theo tên, email, SĐT..." 
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <SearchButton>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SearchButton>
        </SearchContainer>
        <div style={{ width: '200px' }}>
          <Dropdown 
            value={statusFilter} 
            onChange={(val) => setStatusFilter(val as string)}
            options={[
              { value: 'all', label: 'Tất cả trạng thái' },
              { value: 'active', label: 'Đang hoạt động' },
              { value: 'inactive', label: 'Đã khóa' }
            ]}
          />
        </div>
        {(role === 'teacher' || role === 'parent') && (
          <CreateButton onClick={() => setShowCreateModal(true)}>
            + Thêm tài khoản
          </CreateButton>
        )}
      </HeaderActions>

      {loading && <LoadingText>Đang tải dữ liệu...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}

      {!loading && !error && (
        <TableCard>
          <Table>
            <thead>
              <Tr>
                <Th>ID</Th>
                <Th>Họ Tên</Th>
                <Th>Tên Đăng Nhập</Th>
                <Th>Email</Th>
                <Th>Trạng thái</Th>
                <Th style={{ width: '150px', textAlign: 'center' }}>Thao tác</Th>
              </Tr>
            </thead>
            <tbody>
              {filteredAccounts.length === 0 ? (
                <Tr>
                  <Td colSpan={6}>
                    <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
                      Không có dữ liệu
                    </div>
                  </Td>
                </Tr>
              ) : (
                filteredAccounts.map((acc) => (
                  <Tr key={acc.id}>
                    <Td style={{ color: '#9CA3AF' }}>{acc.id || '—'}</Td>
                    <Td style={{ fontWeight: 600, color: '#111827' }}>
                      <UserInfoCell>
                        <AvatarWrapper>
                          {acc.avatarUrl ? (
                            <AvatarImg src={acc.avatarUrl} alt={acc.fullName} />
                          ) : (
                            <AvatarText>{getInitials(acc.fullName)}</AvatarText>
                          )}
                        </AvatarWrapper>
                        <span>{acc.fullName || '—'}</span>
                      </UserInfoCell>
                    </Td>
                    <Td>{acc.username || '—'}</Td>
                    <Td>{acc.email || '—'}</Td>
                    <Td>
                      <StatusBadge $status={acc.status?.toLowerCase() === 'active' ? 'active' : 'inactive'}>
                        {acc.status?.toLowerCase() === 'active' ? 'Hoạt động' : acc.status?.toLowerCase() === 'inactive' ? 'Đã khóa' : (acc.status || 'Đã khóa')}
                      </StatusBadge>
                    </Td>
                    <Td>
                      <ActionGroup>
                        <IconBtn onClick={() => handleActionClick(acc, 'view')} title="Xem">
                          <ViewIcon />
                        </IconBtn>
                        {acc.status?.toLowerCase() === 'active' ? (
                          <IconBtn onClick={() => handleActionClick(acc, 'lock')} title="Khóa">
                            <LockIcon />
                          </IconBtn>
                        ) : (
                          <IconBtn onClick={() => handleActionClick(acc, 'unlock')} title="Mở khóa">
                            <UnlockIcon />
                          </IconBtn>
                        )}
                      </ActionGroup>
                    </Td>
                  </Tr>
                ))
              )}
            </tbody>
          </Table>
          
          {filteredAccounts.length > 0 && (
            <PaginationContainer>
              <PaginationText>Hiển thị 1–{filteredAccounts.length} trong {filteredAccounts.length} tài khoản</PaginationText>
              <PaginationGroup>
                <PageButton>&larr;</PageButton>
                <PageButton $active>1</PageButton>
                <PageButton>&rarr;</PageButton>
              </PaginationGroup>
            </PaginationContainer>
          )}
        </TableCard>
      )}

      {modalConfig.isOpen && modalConfig.account && (
        <ConfirmationModal
          isOpen={modalConfig.isOpen}
          action={modalConfig.action}
          account={modalConfig.account}
          role={role}
          onClose={closeModal}
          onConfirm={confirmModalAction}
        />
      )}

      {showCreateModal && (role === 'teacher' || role === 'parent') && (
        <CreateAccountModal
          role={role}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchAccounts();
          }}
        />
      )}
    </Container>
  );
}
