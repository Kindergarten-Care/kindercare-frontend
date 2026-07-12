'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { kcToast } from '@kindercare/ui';
import { studentService } from '@/services/Student/StudentService';
import { financeService } from '@/services/Principal/FinanceService';
import { FeePackageDto } from '@/config/types/finance';
import {
  Modal,
  ModalHeader,
  ModalBody,
  KmFoot,
  KmBtn,
  KmCallout,
  UploadIcon,
} from '@/components/Modal';

const UploadArea = styled.div<{ $compact?: boolean }>`
  border: 2px dashed ${({ theme }) => theme.colors.border || '#d1d5db'};
  border-radius: 10px;
  padding: ${({ $compact }) => ($compact ? '12px 16px' : '32px')};
  text-align: ${({ $compact }) => ($compact ? 'left' : 'center')};
  background: ${({ theme }) => theme.colors.neutralLighter || '#f9fafb'};
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 16px;
  display: ${({ $compact }) => ($compact ? 'flex' : 'block')};
  align-items: center;
  gap: 12px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary || '#047857'};
    background: ${({ theme }) => theme.colors.greenXLight || '#ecfdf5'};
  }
`;

const PackageList = styled.ul`
  margin: 8px 0 0;
  padding-left: 18px;
  font-size: 13px;

  li {
    margin-bottom: 2px;
  }

  b {
    font-variant-numeric: tabular-nums;
  }
`;

const PreviewWrap = styled.div`
  margin-top: 16px;
`;

const PreviewHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const PreviewTitle = styled.span`
  font-size: 13.5px;
  font-weight: 700;
  color: #1f2937;
`;

const PreviewCount = styled.span`
  font-size: 12.5px;
  color: #6b7280;
`;

const PreviewTableScroll = styled.div`
  max-height: 400px;
  overflow: auto;
  border: 1px solid #e6eee9;
  border-radius: 11px;
`;

const PreviewTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;

  th, td {
    text-align: left;
    padding: 8px 10px;
    white-space: nowrap;
    border-bottom: 1px solid #eef4f0;
  }

  th {
    position: sticky;
    top: 0;
    background: #f7fbf8;
    color: #374151;
    font-weight: 700;
    z-index: 1;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

interface ModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface CsvPreview {
  headers: string[];
  rows: string[][];
}

function parseCsvPreview(text: string): CsvPreview {
  const cleaned = text.replace(/^﻿/, '');
  const lines = cleaned.split(/\r?\n/).filter(line => line.trim().length > 0);
  const parseLine = (line: string) => {
    const cells: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
        else if (ch === '"') { inQuotes = false; }
        else { current += ch; }
      } else if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        cells.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
    cells.push(current);
    return cells.map(c => c.trim());
  };

  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map(parseLine);
  return { headers, rows };
}

async function parseXlsxPreview(file: File): Promise<CsvPreview> {
  const ExcelJS = (await import('exceljs')).default;
  const workbook = new ExcelJS.Workbook();
  const buffer = await file.arrayBuffer();
  await workbook.xlsx.load(buffer);
  const sheet = workbook.worksheets[0];
  if (!sheet) return { headers: [], rows: [] };

  const toText = (value: any): string => {
    if (value === null || value === undefined) return '';
    if (value instanceof Date) {
      const pad = (n: number) => String(n).padStart(2, '0');
      return `${pad(value.getDate())}/${pad(value.getMonth() + 1)}/${value.getFullYear()}`;
    }
    if (typeof value === 'object' && 'text' in value) return String(value.text ?? '');
    if (typeof value === 'object' && 'result' in value) return String(value.result ?? '');
    return String(value);
  };

  const headerRow = sheet.getRow(1);
  const headers: string[] = [];
  headerRow.eachCell({ includeEmpty: true }, cell => headers.push(toText(cell.value)));

  const rows: string[][] = [];
  for (let r = 2; r <= sheet.rowCount; r++) {
    const row = sheet.getRow(r);
    if (row.cellCount === 0) continue;
    const values: string[] = [];
    for (let c = 1; c <= headers.length; c++) values.push(toText(row.getCell(c).value));
    if (values.some(v => v.trim() !== '')) rows.push(values);
  }

  return { headers, rows };
}

export default function StudentImportModal({ onClose, onSuccess }: ModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<CsvPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [packages, setPackages] = useState<FeePackageDto[]>([]);
  const [templateLoading, setTemplateLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    financeService.getFees()
      .then(fees => setPackages(fees.packages || []))
      .catch(() => {});
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const isCsv = selectedFile.name.toLowerCase().endsWith('.csv');
      const isXlsx = selectedFile.name.toLowerCase().endsWith('.xlsx');
      if (!isCsv && !isXlsx) {
        setError('Vui lòng chọn file định dạng .csv hoặc .xlsx');
        setFile(null);
        setPreview(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
      setPreview(null);

      if (isCsv) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            setPreview(parseCsvPreview(String(reader.result || '')));
          } catch {
            setPreview(null);
          }
        };
        reader.readAsText(selectedFile, 'utf-8');
      } else {
        parseXlsxPreview(selectedFile).then(setPreview).catch(() => setPreview(null));
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      setLoading(true);
      setError(null);
      const result = await studentService.importStudents(file);
      const imported = result?.imported ?? 0;
      const tuitionPlansCreated = result?.tuitionPlansCreated ?? 0;
      kcToast.success(`Đã tạo ${imported} học sinh, ${tuitionPlansCreated} học sinh được đăng ký gói học phí.`);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Lỗi khi import dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = async () => {
    try {
      setTemplateLoading(true);
      const fees = await financeService.getFees();
      const currentPackages = fees.packages || [];

      const ExcelJS = (await import('exceljs')).default;
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Học sinh');

      sheet.columns = [
        { header: 'FullName', key: 'fullName', width: 24 },
        { header: 'DateOfBirth', key: 'dateOfBirth', width: 16 },
        { header: 'Gender', key: 'gender', width: 10 },
        { header: 'Allergies', key: 'allergies', width: 20 },
        { header: 'AdmissionDate', key: 'admissionDate', width: 16 },
        { header: 'PackageID', key: 'packageId', width: 14 },
      ];
      sheet.getRow(1).font = { bold: true };

      sheet.addRow({
        fullName: 'Nguyễn Văn A',
        dateOfBirth: '15/05/2023',
        gender: 'Nam',
        allergies: '',
        admissionDate: '01/09/2026',
        packageId: '',
      });
      sheet.addRow({
        fullName: 'Trần Thị B',
        dateOfBirth: '20/08/2023',
        gender: 'Nữ',
        allergies: 'Dị ứng hải sản',
        admissionDate: '01/09/2026',
        packageId: '',
      });

      if (currentPackages.length > 0) {
        const formulae = [`"${currentPackages.map(p => p.id).join(',')}"`];
        for (let row = 2; row <= 300; row++) {
          sheet.getCell(`F${row}`).dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae,
            showErrorMessage: true,
            errorTitle: 'PackageID không hợp lệ',
            error: 'Vui lòng chọn 1 PackageID trong danh sách gói học phí hiện có.',
          };
        }

        const legendSheet = workbook.addWorksheet('Danh sách gói học phí');
        legendSheet.columns = [
          { header: 'PackageID', key: 'id', width: 12 },
          { header: 'Tên gói', key: 'name', width: 24 },
          { header: 'Thời hạn (tháng)', key: 'duration', width: 16 },
          { header: 'Giảm giá (%)', key: 'discount', width: 14 },
        ];
        legendSheet.getRow(1).font = { bold: true };
        currentPackages.forEach(p => legendSheet.addRow(p));
      }

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'student_import_template.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      kcToast.error(err.message || 'Không thể tạo file mẫu, vui lòng thử lại');
    } finally {
      setTemplateLoading(false);
    }
  };

  return (
    <Modal size="xl" onClose={onClose}>
      <ModalHeader
        icon={<UploadIcon />}
        iconVariant="brand"
        title="Import Học sinh"
        subtitle="Tải lên danh sách học sinh từ file CSV hoặc Excel theo mẫu quy định"
        onClose={onClose}
      />

      <ModalBody>
        {error && (
          <KmCallout $variant="red">
            <span>{error}</span>
          </KmCallout>
        )}
        <KmCallout $variant="amber" style={{ marginTop: error ? 12 : 0 }}>
          <span>
            Tải về{' '}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); if (!templateLoading) downloadTemplate(); }}
              style={{ fontWeight: 600, textDecoration: 'underline' }}
            >
              file mẫu (template.xlsx)
            </a>{' '}
            và điền dữ liệu theo đúng định dạng trước khi tải lên. Cột <b>PackageID</b> là dropdown chọn sẵn, không bắt buộc — chọn 1 gói học phí nếu muốn đăng ký gói ngay lúc import.
            {packages.length > 0 && (
              <PackageList>
                {packages.map(p => (
                  <li key={p.id}><b>{p.id}</b> — {p.name}{p.discount ? ` (giảm ${p.discount}%)` : ''}</li>
                ))}
              </PackageList>
            )}
          </span>
        </KmCallout>

        <UploadArea $compact={!!file} onClick={() => fileInputRef.current?.click()}>
          <input
            type="file"
            accept=".csv,.xlsx"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {file ? (
            <>
              <span style={{ fontSize: '1.4rem' }}>📄</span>
              <div>
                <p style={{ fontWeight: 500, color: '#374151', fontSize: '13.5px' }}>{file.name}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Nhấn để chọn file khác</p>
              </div>
            </>
          ) : (
            <div>
              <span style={{ fontSize: '2rem' }}>📥</span>
              <p style={{ marginTop: '8px', fontWeight: 500, color: '#374151' }}>Nhấn vào đây để tải file lên</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Hỗ trợ file .csv hoặc .xlsx</p>
            </div>
          )}
        </UploadArea>

        {preview && preview.rows.length > 0 && (
          <PreviewWrap>
            <PreviewHead>
              <PreviewTitle>Xem trước dữ liệu</PreviewTitle>
              <PreviewCount>{preview.rows.length} học sinh</PreviewCount>
            </PreviewHead>
            <PreviewTableScroll>
              <PreviewTable>
                <thead>
                  <tr>
                    {preview.headers.map((h, i) => <th key={i}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {preview.rows.map((row, ri) => (
                    <tr key={ri}>
                      {preview.headers.map((_, ci) => <td key={ci}>{row[ci] || '—'}</td>)}
                    </tr>
                  ))}
                </tbody>
              </PreviewTable>
            </PreviewTableScroll>
          </PreviewWrap>
        )}
      </ModalBody>

      <KmFoot>
        <KmBtn $variant="ghost" onClick={onClose}>Hủy bỏ</KmBtn>
        <KmBtn $variant="brand" onClick={handleUpload} disabled={!file || loading}>
          {loading ? 'Đang import...' : 'Import Dữ liệu'}
        </KmBtn>
      </KmFoot>
    </Modal>
  );
}
