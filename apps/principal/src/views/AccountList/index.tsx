'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { useAuth } from '@kindercare/core';
import { Dropdown } from '@kindercare/ui';
import { AccountDomainModel } from '@/config/types/account';
import { useAccountList } from './hooks/useAccountList';
import { useAccountModal } from './hooks/useAccountModal';
import Avatar from '@/components/Avatar';
import { ConfirmationModal } from './components/ConfirmationModal';
import { CreateAccountModal } from './components/CreateAccountModal';
import {
  Container,
  PageHeader,
  TitleBlock,
  Title,
  StatBadge,
  ActionGroup,
  PrimaryButton,
  FilterBar,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  FilterSelect,
  TableCard,
  Table,
  Th,
  Tr,
  Td,
  FullName,
  StatusBadge,
  ActionGroupBtns,
  IconBtn,
  LoadingText,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptySubtitle,
} from './styles';

export default function AccountListView() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get('role');

  const { accounts, loading, error, fetchAccounts } = useAccountList(role, isAuthenticated, authLoading);
  const { modalConfig, handleActionClick: handleModalClick, closeModal, confirmModalAction } = useAccountModal(fetchAccounts);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const displayTitle = role === 'teacher' ? 'Danh sách Giáo viên' : role === 'parent' ? 'Danh sách Phụ huynh' : 'Danh sách Tài khoản';

  const filteredAccounts = accounts.filter(acc => {
    if (statusFilter !== 'all') {
      const accStatus = acc.status?.toLowerCase() || 'inactive';
      if (statusFilter !== accStatus) return false;
    }
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const fullName = (acc.fullName ?? '').toLowerCase();
    const email = (acc.email ?? '').toLowerCase();
    const phone = acc.phoneNumber || '';
    return fullName.includes(term) || email.includes(term) || phone.includes(term);
  });

  return (
    <Container>
      <PageHeader>
        <TitleBlock>
          <Title>
            {displayTitle}
            <StatBadge>| Quản lý tài khoản người dùng</StatBadge>
          </Title>
        </TitleBlock>
        {(role === 'teacher' || role === 'parent') && (
          <ActionGroup>
            <PrimaryButton onClick={() => setShowCreateModal(true)}>
              + Thêm tài khoản
            </PrimaryButton>
          </ActionGroup>
        )}
      </PageHeader>

      <FilterBar>
        <SearchWrapper>
          <SearchIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </SearchIcon>
          <SearchInput
            placeholder="Tìm theo tên, email, SĐT..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>

        <FilterSelect value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Đã khóa</option>
        </FilterSelect>
      </FilterBar>

      {loading ? (
        <LoadingText>Đang tải dữ liệu...</LoadingText>
      ) : error ? (
        <EmptyState>
          <EmptyIcon>⚠️</EmptyIcon>
          <EmptyTitle>Đã xảy ra lỗi</EmptyTitle>
          <EmptySubtitle>{error}</EmptySubtitle>
        </EmptyState>
      ) : (
        <TableCard>
          <Table>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Họ Tên</Th>
                <Th>Tên Đăng Nhập</Th>
                <Th>Email</Th>
                <Th>Trạng thái</Th>
                <Th style={{ width: 140, textAlign: 'center' }}>Thao tác</Th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.length === 0 ? (
                <tr>
                  <Td colSpan={6}>
                    <EmptyState>
                      <EmptyIcon>🔍</EmptyIcon>
                      <EmptyTitle>Không tìm thấy</EmptyTitle>
                      <EmptySubtitle>Không có tài khoản nào phù hợp với điều kiện lọc.</EmptySubtitle>
                    </EmptyState>
                  </Td>
                </tr>
              ) : (
                filteredAccounts.map(acc => (
                  <Tr key={acc.id}>
                    <Td style={{ color: '#9ca3af', fontWeight: 500 }}>#{acc.id}</Td>
                    <Td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Avatar src={acc.avatarUrl ?? undefined} name={acc.fullName ?? ''} size={40} />
                        <FullName>{acc.fullName || '—'}</FullName>
                      </div>
                    </Td>
                    <Td style={{ color: '#6b7280' }}>{acc.username || '—'}</Td>
                    <Td style={{ color: '#6b7280' }}>{acc.email || '—'}</Td>
                    <Td>
                      <StatusBadge $status={acc.status?.toLowerCase() === 'active' ? 'active' : 'inactive'}>
                        {acc.status?.toLowerCase() === 'active' ? '● Hoạt động' : '● Đã khóa'}
                      </StatusBadge>
                    </Td>
                    <Td>
                      <ActionGroupBtns>
                        <IconBtn
                          title="Xem chi tiết"
                          onClick={() => router.push(`/accounts/${role}/${acc.id}`)}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </IconBtn>
                        <IconBtn
                          title={acc.status?.toLowerCase() === 'active' ? 'Khóa tài khoản' : 'Mở khóa'}
                          onClick={() => handleModalClick(acc, acc.status?.toLowerCase() === 'active' ? 'lock' : 'unlock')}
                        >
                          {acc.status?.toLowerCase() === 'active' ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="11" width="18" height="11" rx="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="11" width="18" height="11" rx="2" />
                              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                            </svg>
                          )}
                        </IconBtn>
                      </ActionGroupBtns>
                    </Td>
                  </Tr>
                ))
              )}
            </tbody>
          </Table>
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
          onSuccess={() => { setShowCreateModal(false); fetchAccounts(); }}
        />
      )}
    </Container>
  );
}
