'use client';

import React from 'react';
import { Card, CardTitle, CardDescription, Table, Th, Td, Tr, Badge, PrimaryButton, LoadingText, EmptyState } from '../styles';
import { formatTimestamp } from '@/utils/date';

interface AcademicYearItem {
  YearID: number;
  YearName: string;
  StartDate: number;
  EndDate: number;
  IsActive: number;
}

interface YearListCardProps {
  years: AcademicYearItem[];
  loading: boolean;
  onActivate: (yearId: number) => void;
  loadingActivate: number | null;
}

export default function YearListCard({ years, loading, onActivate, loadingActivate }: YearListCardProps) {
  return (
    <Card>
      {loading ? (
        <LoadingText>Đang tải dữ liệu năm học...</LoadingText>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Tên năm học</Th>
              <Th>Ngày bắt đầu</Th>
              <Th>Ngày kết thúc</Th>
              <Th>Trạng thái</Th>
              <Th style={{ width: 140, textAlign: 'center' }}>Thao tác</Th>
            </tr>
          </thead>
          <tbody>
            {years.map(y => (
              <Tr key={y.YearID}>
                <Td style={{ color: '#9ca3af', fontWeight: 500 }}>#{y.YearID}</Td>
                <Td>
                  <span style={{ fontWeight: 600, color: '#111827' }}>{y.YearName}</span>
                </Td>
                <Td style={{ color: '#6b7280' }}>{formatTimestamp(y.StartDate)}</Td>
                <Td style={{ color: '#6b7280' }}>{formatTimestamp(y.EndDate)}</Td>
                <Td>
                  <Badge $active={y.IsActive === 1}>
                    {y.IsActive === 1 ? (
                      <>
                        <span>●</span> Đang hoạt động
                      </>
                    ) : 'Chưa kích hoạt'}
                  </Badge>
                </Td>
                <Td style={{ textAlign: 'center' }}>
                  {y.IsActive === 0 && (
                    <PrimaryButton
                      onClick={() => onActivate(y.YearID)}
                      disabled={loadingActivate === y.YearID}
                      style={{ padding: '7px 14px', fontSize: '0.8125rem' }}
                    >
                      {loadingActivate === y.YearID ? 'Đang xử lý...' : 'Kích hoạt'}
                    </PrimaryButton>
                  )}
                </Td>
              </Tr>
            ))}
            {years.length === 0 && (
              <tr>
                <Td colSpan={6}>
                  <EmptyState>Chưa có dữ liệu năm học nào.</EmptyState>
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Card>
  );
}
