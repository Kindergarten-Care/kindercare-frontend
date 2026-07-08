'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@kindercare/core';
import { AccountDomainModel } from '@/config/types/account';
import { accountService } from '@/services/account/AccountService';
import { 
  Container, 
  Title, 
  Table, 
  Th, 
  Tr, 
  Td, 
  LoadingText, 
  ErrorText,
  DropdownContainer,
  ActionButton,
  DropdownMenu,
  DropdownItem
} from './styles';

export default function AccountListView() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  const [accounts, setAccounts] = useState<AccountDomainModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

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

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;
    if (role !== 'teacher' && role !== 'parent') {
      setError('Vai trò không hợp lệ');
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError('');
    setActiveDropdown(null);

    accountService.getAccountsByRole(role)
      .then(data => {
        if (isMounted) setAccounts(data);
      })
      .catch(err => {
        if (isMounted) setError(err.message || 'Lỗi khi tải danh sách');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [role, isAuthenticated, authLoading]);

  const displayTitle = role === 'teacher' ? 'Danh sách Giáo viên' : role === 'parent' ? 'Danh sách Phụ huynh' : 'Danh sách Tài khoản';

  const handleActionClick = (id: number, action: string) => {
    setActiveDropdown(null);
    if (action === 'view') {
      alert(`Xem chi tiết tài khoản ID: ${id}`);
    } else if (action === 'delete') {
      if (confirm(`Bạn có chắc chắn muốn xóa tài khoản ID ${id} không?`)) {
        alert(`Đã xóa tài khoản ID: ${id}`);
        // Here you would call accountService.deleteAccount(id) and then update state
      }
    }
  };

  return (
    <Container>
      <Title>{displayTitle}</Title>
      
      {loading && <LoadingText>Đang tải dữ liệu...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
      
      {!loading && !error && (
        <Table>
          <thead>
            <Tr>
              <Th>ID</Th>
              <Th>Họ Tên</Th>
              <Th>Tên Đăng Nhập</Th>
              <Th>Email</Th>
              <Th style={{ width: '80px', textAlign: 'center' }}>Thao tác</Th>
            </Tr>
          </thead>
          <tbody>
            {accounts.length === 0 ? (
              <Tr>
                <Td colSpan={5} style={{ textAlign: 'center', color: '#6b7280' }}>
                  Không có dữ liệu
                </Td>
              </Tr>
            ) : (
              accounts.map((acc) => (
                <Tr key={acc.id}>
                  <Td>{acc.id || '—'}</Td>
                  <Td style={{ fontWeight: 500 }}>{acc.fullName || '—'}</Td>
                  <Td>{acc.username || '—'}</Td>
                  <Td>{acc.email || '—'}</Td>
                  <Td style={{ textAlign: 'center' }}>
                    <DropdownContainer ref={activeDropdown === acc.id ? dropdownRef : null}>
                      <ActionButton onClick={() => setActiveDropdown(activeDropdown === acc.id ? null : acc.id)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </ActionButton>
                      
                      {activeDropdown === acc.id && (
                        <DropdownMenu>
                          <DropdownItem onClick={() => handleActionClick(acc.id, 'view')}>
                            👁️ Xem chi tiết
                          </DropdownItem>
                          <DropdownItem $danger onClick={() => handleActionClick(acc.id, 'delete')}>
                            🗑️ Xóa tài khoản
                          </DropdownItem>
                        </DropdownMenu>
                      )}
                    </DropdownContainer>
                  </Td>
                </Tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
