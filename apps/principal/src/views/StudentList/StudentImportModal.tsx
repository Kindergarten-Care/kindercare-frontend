'use client';

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { studentService } from '@/services/Student/StudentService';
import {
  Modal,
  ModalHeader,
  ModalBody,
  KmFoot,
  KmBtn,
  KmCallout,
  UploadIcon,
} from '@/components/Modal';

const UploadArea = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border || '#d1d5db'};
  border-radius: 10px;
  padding: 32px;
  text-align: center;
  background: ${({ theme }) => theme.colors.neutralLighter || '#f9fafb'};
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 16px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary || '#047857'};
    background: ${({ theme }) => theme.colors.greenXLight || '#ecfdf5'};
  }
`;

interface ModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function StudentImportModal({ onClose, onSuccess }: ModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.name.endsWith('.csv')) {
        setError('Vui lòng chọn file định dạng CSV');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      setLoading(true);
      setError(null);
      await studentService.importStudents(file);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Lỗi khi import dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "FullName,DateOfBirth,Gender,Allergies,AdmissionDate\nNguyễn Văn A,15/05/2023,Nam,,01/09/2026\nTrần Thị B,20/08/2023,Nữ,Dị ứng hải sản,01/09/2026";
    // BOM ﻿ bắt buộc để Excel nhận diện đúng UTF-8, nếu không sẽ đoán nhầm sang ANSI và vỡ font tiếng Việt.
    const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "student_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal size="md" onClose={onClose}>
      <ModalHeader
        icon={<UploadIcon />}
        iconVariant="brand"
        title="Import Học sinh từ CSV"
        subtitle="Tải lên danh sách học sinh từ file CSV theo mẫu quy định"
        onClose={onClose}
      />

      <ModalBody>
        {error && (
          <KmCallout $variant="red">
            {error}
          </KmCallout>
        )}
        <KmCallout $variant="amber" style={{ marginTop: error ? 12 : 0 }}>
          Tải về{' '}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); downloadTemplate(); }}
            style={{ fontWeight: 600, textDecoration: 'underline' }}
          >
            file mẫu (template.csv)
          </a>{' '}
          và điền dữ liệu theo đúng định dạng trước khi tải lên.
        </KmCallout>

        <UploadArea onClick={() => fileInputRef.current?.click()}>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {file ? (
            <div>
              <span style={{ fontSize: '2rem' }}>📄</span>
              <p style={{ marginTop: '8px', fontWeight: 500, color: '#374151' }}>{file.name}</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Nhấn để chọn file khác</p>
            </div>
          ) : (
            <div>
              <span style={{ fontSize: '2rem' }}>📥</span>
              <p style={{ marginTop: '8px', fontWeight: 500, color: '#374151' }}>Nhấn vào đây để tải file lên</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Chỉ hỗ trợ file .csv</p>
            </div>
          )}
        </UploadArea>
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
