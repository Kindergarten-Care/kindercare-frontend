'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@kindercare/core';
import { financeService } from '@/services/Principal/FinanceService';
import { FeesDataDto } from '@/config/types/finance';
import EditFeeModal, { EditFieldConfig } from './components/EditFeeModal';
import InvoiceReviewPanel from './components/InvoiceReviewPanel';
import InvoiceStatsPanel from './components/InvoiceStatsPanel';
import {
  Container,
  Title,
  Tabs,
  TabButton,
  SectionTitle,
  CardGrid,
  PackageCard,
  PackageName,
  PackageMeta,
  DiscountBadge,
  EditButton,
  TableCard,
  TableScroll,
  Table,
  Th,
  Tr,
  Td,
  LoadingText,
  ErrorText,
  ActiveTag,
  InactiveTag,
} from './styles';
import styled from 'styled-components';

const PrimaryButton = styled.button`
  padding: 8px 14px;
  background-color: #047857;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #065f46;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

type EditTarget =
  | { kind: 'createPackage'; title: string; fields: EditFieldConfig[]; values: Record<string, any> }
  | { kind: 'package'; id: number; title: string; fields: EditFieldConfig[]; values: Record<string, any> }
  | { kind: 'baseFee'; id: number; title: string; fields: EditFieldConfig[]; values: Record<string, any> }
  | { kind: 'createExtracurricular'; title: string; fields: EditFieldConfig[]; values: Record<string, any> }
  | { kind: 'extracurricular'; id: number; title: string; fields: EditFieldConfig[]; values: Record<string, any> };

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)} đ`;

export default function FinanceView() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<'fees' | 'invoices' | 'review'>('fees');

  const [fees, setFees] = useState<FeesDataDto | null>(null);
  const [feesLoading, setFeesLoading] = useState(true);
  const [feesError, setFeesError] = useState<string | null>(null);

  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchFees();
    }
  }, [isAuthenticated, authLoading]);

  const fetchFees = async () => {
    try {
      setFeesLoading(true);
      const data = await financeService.getFees();
      setFees(data);
    } catch (err: any) {
      setFeesError(err.message || 'Lỗi khi tải biểu phí');
    } finally {
      setFeesLoading(false);
    }
  };

  const handleSaveEdit = async (values: Record<string, any>) => {
    if (!editTarget) return;

    switch (editTarget.kind) {
      case 'baseFee':
        await financeService.updateBaseFee(editTarget.id, {
          monthlyTuition: values.monthlyTuition,
          dailyMealFee: values.dailyMealFee,
        });
        break;
      case 'package':
        await financeService.updatePaymentPackage(editTarget.id, {
          name: values.name,
          duration: values.duration,
          discount: values.discount,
        });
        break;
      case 'createPackage':
        await financeService.createPaymentPackage({
          name: values.name,
          duration: values.duration,
          discount: values.discount,
        });
        break;
      case 'extracurricular':
        await financeService.updateExtracurricular(editTarget.id, {
          name: values.name,
          monthlyFee: values.monthlyFee,
          description: values.description,
        });
        break;
      case 'createExtracurricular':
        await financeService.createExtracurricular({
          name: values.name,
          monthlyFee: values.monthlyFee,
          description: values.description,
        });
        break;
    }

    await fetchFees();
  };

  if (authLoading) return null;

  return (
    <Container>
      <Title>Biểu phí & Tài chính</Title>

      <Tabs>
        <TabButton $active={activeTab === 'fees'} onClick={() => setActiveTab('fees')}>
          Biểu phí
        </TabButton>
        <TabButton $active={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')}>
          Hóa đơn & Thống kê
        </TabButton>
        <TabButton $active={activeTab === 'review'} onClick={() => setActiveTab('review')}>
          Duyệt hóa đơn
        </TabButton>
      </Tabs>

      {activeTab === 'fees' && (
        <>
          {feesLoading ? (
            <LoadingText>Đang tải dữ liệu...</LoadingText>
          ) : feesError ? (
            <ErrorText>{feesError}</ErrorText>
          ) : (
            <>
              <div>
                <SectionHeader>
                  <SectionTitle style={{ marginBottom: 0 }}>Gói học phí</SectionTitle>
                  <PrimaryButton
                    onClick={() =>
                      setEditTarget({
                        kind: 'createPackage',
                        title: 'Thêm gói học phí mới',
                        fields: [
                          { key: 'name', label: 'Tên gói', type: 'text', required: true },
                          { key: 'duration', label: 'Thời hạn', type: 'number', suffix: 'tháng', required: true },
                          { key: 'discount', label: 'Giảm giá', type: 'number', suffix: '%' },
                        ],
                        values: { name: '', duration: '', discount: 0 },
                      })
                    }
                  >
                    + Thêm gói
                  </PrimaryButton>
                </SectionHeader>
                <CardGrid>
                  {fees?.packages.map(pkg => (
                    <PackageCard key={pkg.id}>
                      <PackageName>
                        <span>{pkg.name}</span>
                        <EditButton
                          onClick={() =>
                            setEditTarget({
                              kind: 'package',
                              id: pkg.id,
                              title: `Sửa gói: ${pkg.name}`,
                              fields: [
                                { key: 'name', label: 'Tên gói', type: 'text' },
                                { key: 'duration', label: 'Thời hạn', type: 'number', suffix: 'tháng' },
                                { key: 'discount', label: 'Giảm giá', type: 'number', suffix: '%' },
                              ],
                              values: { name: pkg.name, duration: pkg.duration, discount: pkg.discount },
                            })
                          }
                        >
                          ✏️ Sửa
                        </EditButton>
                      </PackageName>
                      <PackageMeta>
                        <span>Thời hạn</span>
                        <span>{pkg.duration} tháng</span>
                      </PackageMeta>
                      <PackageMeta>
                        <span>Giảm giá</span>
                        <span>{pkg.discount}%</span>
                      </PackageMeta>
                      {pkg.discount > 0 && <DiscountBadge>Tiết kiệm {pkg.discount}%</DiscountBadge>}
                    </PackageCard>
                  ))}
                </CardGrid>
              </div>

              <div>
                <SectionTitle>Học phí cơ bản theo năm học</SectionTitle>
                <TableCard>
                  <TableScroll>
                    <Table>
                      <thead>
                        <Tr>
                          <Th>Năm học</Th>
                          <Th>Học phí/tháng</Th>
                          <Th>Phí ăn/ngày</Th>
                          <Th style={{ textAlign: 'center' }}>Thao tác</Th>
                        </Tr>
                      </thead>
                      <tbody>
                        {fees?.baseFees.length === 0 ? (
                          <Tr><Td colSpan={4}><LoadingText>Không có dữ liệu.</LoadingText></Td></Tr>
                        ) : (
                          fees?.baseFees.map(fee => (
                            <Tr key={fee.id}>
                              <Td>
                                {fee.yearName || 'Đã xóa'}
                                {fee.isActive ? <ActiveTag>Đang áp dụng</ActiveTag> : <InactiveTag>Đã kết thúc</InactiveTag>}
                              </Td>
                              <Td>{formatVND(fee.monthlyTuition)}</Td>
                              <Td>{formatVND(fee.dailyMealFee)}</Td>
                              <Td style={{ textAlign: 'center' }}>
                                {!!fee.isActive && (
                                  <EditButton
                                    onClick={() =>
                                      setEditTarget({
                                        kind: 'baseFee',
                                        id: fee.id,
                                        title: `Sửa học phí: ${fee.yearName || 'Năm học đã xóa'}`,
                                        fields: [
                                          { key: 'monthlyTuition', label: 'Học phí/tháng', type: 'number', suffix: 'đ' },
                                          { key: 'dailyMealFee', label: 'Phí ăn/ngày', type: 'number', suffix: 'đ' },
                                        ],
                                        values: { monthlyTuition: fee.monthlyTuition, dailyMealFee: fee.dailyMealFee },
                                      })
                                    }
                                  >
                                    ✏️ Sửa
                                  </EditButton>
                                )}
                              </Td>
                            </Tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </TableScroll>
                </TableCard>
              </div>

              <div>
                <SectionHeader>
                  <SectionTitle style={{ marginBottom: 0 }}>Hoạt động ngoại khóa</SectionTitle>
                  <PrimaryButton
                    onClick={() =>
                      setEditTarget({
                        kind: 'createExtracurricular',
                        title: 'Thêm hoạt động ngoại khóa mới',
                        fields: [
                          { key: 'name', label: 'Tên hoạt động', type: 'text', required: true },
                          { key: 'monthlyFee', label: 'Phí/tháng', type: 'number', suffix: 'đ', required: true },
                          { key: 'description', label: 'Mô tả', type: 'textarea' },
                        ],
                        values: { name: '', monthlyFee: '', description: '' },
                      })
                    }
                  >
                    + Thêm hoạt động
                  </PrimaryButton>
                </SectionHeader>
                <CardGrid>
                  {fees?.extracurriculars.length === 0 ? (
                    <LoadingText>Không có dữ liệu.</LoadingText>
                  ) : (
                    fees?.extracurriculars.map(act => (
                      <PackageCard key={act.id} style={{ borderTopColor: '#d97706' }}>
                        <PackageName>
                          <span>{act.name}</span>
                          <EditButton
                            onClick={() =>
                              setEditTarget({
                                kind: 'extracurricular',
                                id: act.id,
                                title: `Sửa hoạt động: ${act.name}`,
                                fields: [
                                  { key: 'name', label: 'Tên hoạt động', type: 'text' },
                                  { key: 'monthlyFee', label: 'Phí/tháng', type: 'number', suffix: 'đ' },
                                  { key: 'description', label: 'Mô tả', type: 'textarea' },
                                ],
                                values: { name: act.name, monthlyFee: act.monthlyFee, description: act.description || '' },
                              })
                            }
                          >
                            ✏️ Sửa
                          </EditButton>
                        </PackageName>
                        <PackageMeta>
                          <span>Phí/tháng</span>
                          <span>{formatVND(act.monthlyFee)}</span>
                        </PackageMeta>
                        {act.description && (
                          <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '8px' }}>{act.description}</div>
                        )}
                      </PackageCard>
                    ))
                  )}
                </CardGrid>
              </div>
            </>
          )}
        </>
      )}

      {activeTab === 'invoices' && <InvoiceStatsPanel />}

      {activeTab === 'review' && <InvoiceReviewPanel />}

      {editTarget && (
        <EditFeeModal
          title={editTarget.title}
          fields={editTarget.fields}
          initialValues={editTarget.values}
          onClose={() => setEditTarget(null)}
          onSave={handleSaveEdit}
        />
      )}
    </Container>
  );
}
