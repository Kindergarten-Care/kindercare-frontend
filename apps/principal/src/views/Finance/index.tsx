'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@kindercare/core';
import { financeService } from '@/services/Principal/FinanceService';
import { FeesDataDto, InvoiceDto } from '@/config/types/finance';
import InvoiceStatusChart from './components/InvoiceStatusChart';
import RevenueByMonthChart from './components/RevenueByMonthChart';
import EditFeeModal, { EditFieldConfig } from './components/EditFeeModal';
import { Dropdown } from '@kindercare/ui';
import {
  Container,
  Title,
  Tabs,
  TabButton,
  SectionTitle,
  KPIGrid,
  KPICard,
  KPIValue,
  KPILabel,
  ChartsGrid,
  CardGrid,
  PackageCard,
  PackageName,
  PackageMeta,
  DiscountBadge,
  EditButton,
  TableCard,
  Table,
  Th,
  Tr,
  Td,
  StatusBadge,
  TypeBadge,
  HeaderActions,
  FilterBar,
  SearchInput,
  LoadingText,
  ErrorText,
  PaginationContainer,
  PaginationText,
  PaginationGroup,
  PageButton,
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

const formatDate = (timestamp: number | null) => {
  if (!timestamp) return 'Chưa cập nhật';
  return new Date(timestamp * 1000).toLocaleDateString('vi-VN');
};

function statusVariant(status: string): 'paid' | 'unpaid' | 'overdue' | 'other' {
  const s = status?.toLowerCase();
  if (s === 'paid') return 'paid';
  if (s === 'overdue') return 'overdue';
  if (s === 'unpaid') return 'unpaid';
  return 'other';
}

function statusLabel(status: string): string {
  const s = status?.toLowerCase();
  if (s === 'paid') return 'Đã thanh toán';
  if (s === 'overdue') return 'Quá hạn';
  if (s === 'unpaid') return 'Chưa thanh toán';
  return status;
}

function typeVariant(type: string): 'monthly' | 'extracurricular' | 'other' {
  const t = type?.toUpperCase();
  if (t === 'MONTHLY') return 'monthly';
  if (t === 'EXTRACURRICULAR') return 'extracurricular';
  return 'other';
}

function typeLabel(type: string): string {
  const t = type?.toUpperCase();
  if (t === 'MONTHLY') return 'Học phí tháng';
  if (t === 'EXTRACURRICULAR') return 'Ngoại khóa';
  return type;
}

export default function FinanceView() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<'fees' | 'invoices'>('fees');

  const [fees, setFees] = useState<FeesDataDto | null>(null);
  const [feesLoading, setFeesLoading] = useState(true);
  const [feesError, setFeesError] = useState<string | null>(null);

  const [invoices, setInvoices] = useState<InvoiceDto[]>([]);
  const [invoicesLoading, setInvoicesLoading] = useState(true);
  const [invoicesError, setInvoicesError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchFees();
      fetchInvoices();
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

  const fetchInvoices = async () => {
    try {
      setInvoicesLoading(true);
      const data = await financeService.getInvoices();
      setInvoices(data);
    } catch (err: any) {
      setInvoicesError(err.message || 'Lỗi khi tải danh sách hóa đơn');
    } finally {
      setInvoicesLoading(false);
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

  const invoiceStatuses = useMemo(
    () => Array.from(new Set(invoices.map(i => i.paymentStatus).filter(Boolean))),
    [invoices]
  );
  const invoiceTypes = useMemo(
    () => Array.from(new Set(invoices.map(i => i.invoiceType).filter(Boolean))),
    [invoices]
  );

  const filteredInvoices = invoices.filter(inv => {
    if (statusFilter !== 'all' && inv.paymentStatus !== statusFilter) return false;
    if (typeFilter !== 'all' && inv.invoiceType !== typeFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const name = inv.studentFullName?.toLowerCase() || '';
      const id = String(inv.id);
      return name.includes(term) || id.includes(term);
    }
    return true;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter]);

  const kpis = useMemo(() => {
    const amountOf = (i: InvoiceDto) => {
      const n = typeof i.totalAmount === 'number' ? i.totalAmount : parseFloat(String(i.totalAmount));
      return Number.isFinite(n) ? n : 0;
    };
    const paidInvoices = invoices.filter(i => i.paymentStatus === 'Paid');
    const unpaidInvoices = invoices.filter(i => i.paymentStatus !== 'Paid');
    const totalRevenue = invoices.reduce((sum, i) => sum + amountOf(i), 0);
    const paidRevenue = paidInvoices.reduce((sum, i) => sum + amountOf(i), 0);
    const unpaidRevenue = unpaidInvoices.reduce((sum, i) => sum + amountOf(i), 0);
    const unpaidCount = unpaidInvoices.length;
    return { totalRevenue, paidRevenue, unpaidRevenue, unpaidCount };
  }, [invoices]);

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

      {activeTab === 'invoices' && (
        <>
          {invoicesLoading ? (
            <LoadingText>Đang tải dữ liệu...</LoadingText>
          ) : invoicesError ? (
            <ErrorText>{invoicesError}</ErrorText>
          ) : (
            <>
              <KPIGrid>
                <KPICard>
                  <KPIValue>{formatVND(kpis.totalRevenue)}</KPIValue>
                  <KPILabel>Tổng giá trị hóa đơn</KPILabel>
                </KPICard>
                <KPICard style={{ borderLeftColor: '#16a34a' }}>
                  <KPIValue>{formatVND(kpis.paidRevenue)}</KPIValue>
                  <KPILabel>Đã thu</KPILabel>
                </KPICard>
                <KPICard style={{ borderLeftColor: '#f87171' }}>
                  <KPIValue>{formatVND(kpis.unpaidRevenue)}</KPIValue>
                  <KPILabel>Chưa thu</KPILabel>
                </KPICard>
                <KPICard style={{ borderLeftColor: '#d97706' }}>
                  <KPIValue>{kpis.unpaidCount}</KPIValue>
                  <KPILabel>Hóa đơn chưa thanh toán</KPILabel>
                </KPICard>
              </KPIGrid>

              <ChartsGrid>
                <InvoiceStatusChart invoices={invoices} />
                <RevenueByMonthChart invoices={invoices} />
              </ChartsGrid>

              <div>
                <HeaderActions style={{ marginBottom: 16 }}>
                  <SectionTitle style={{ marginBottom: 0 }}>Danh sách hóa đơn</SectionTitle>
                </HeaderActions>

                <FilterBar style={{ marginBottom: 16 }}>
                  <SearchInput
                    placeholder="Tìm kiếm theo tên học sinh hoặc mã hóa đơn..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div style={{ minWidth: 160 }}>
                    <Dropdown
                      value={statusFilter}
                      onChange={setStatusFilter}
                      options={[
                        { value: 'all', label: 'Tất cả trạng thái' },
                        ...invoiceStatuses.map(s => ({ value: s, label: statusLabel(s) })),
                      ]}
                    />
                  </div>
                  <div style={{ minWidth: 160 }}>
                    <Dropdown
                      value={typeFilter}
                      onChange={setTypeFilter}
                      options={[
                        { value: 'all', label: 'Tất cả loại' },
                        ...invoiceTypes.map(t => ({ value: t, label: typeLabel(t) })),
                      ]}
                    />
                  </div>
                </FilterBar>

                <TableCard>
                  <Table>
                    <thead>
                      <Tr>
                        <Th>Mã HĐ</Th>
                        <Th>Học sinh</Th>
                        <Th>Loại</Th>
                        <Th>Gói</Th>
                        <Th>Tháng</Th>
                        <Th>Tổng tiền</Th>
                        <Th>Trạng thái</Th>
                        <Th>Hạn thanh toán</Th>
                      </Tr>
                    </thead>
                    <tbody>
                      {currentData.length === 0 ? (
                        <Tr><Td colSpan={8}><LoadingText>Không tìm thấy hóa đơn nào.</LoadingText></Td></Tr>
                      ) : (
                        currentData.map(inv => (
                          <Tr key={inv.id}>
                            <Td>#{inv.id}</Td>
                            <Td style={{ fontWeight: 500 }}>{inv.studentFullName || 'Không xác định'}</Td>
                            <Td><TypeBadge $type={typeVariant(inv.invoiceType)}>{typeLabel(inv.invoiceType)}</TypeBadge></Td>
                            <Td>{inv.packageName || '-'}</Td>
                            <Td>{inv.billingMonth}</Td>
                            <Td style={{ fontWeight: 600 }}>{formatVND(inv.totalAmount)}</Td>
                            <Td><StatusBadge $status={statusVariant(inv.paymentStatus)}>{statusLabel(inv.paymentStatus)}</StatusBadge></Td>
                            <Td>{formatDate(inv.dueDate)}</Td>
                          </Tr>
                        ))
                      )}
                    </tbody>
                  </Table>

                  {filteredInvoices.length > 0 && (
                    <PaginationContainer>
                      <PaginationText>
                        Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredInvoices.length)} của {filteredInvoices.length} hóa đơn
                      </PaginationText>
                      <PaginationGroup>
                        <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                          Trước
                        </PageButton>
                        <PageButton disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                          Sau
                        </PageButton>
                      </PaginationGroup>
                    </PaginationContainer>
                  )}
                </TableCard>
              </div>
            </>
          )}
        </>
      )}

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
