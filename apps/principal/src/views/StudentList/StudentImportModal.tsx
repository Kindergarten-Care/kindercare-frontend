'use client';

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { studentService } from '@/services/Student/StudentService';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  width: 90%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#e5e7eb'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text || '#111827'};
`;

const CloseBtn = styled.button.attrs({ type: 'button' })`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.muted || '#6b7280'};
  &:hover { color: ${({ theme }) => theme.colors.text || '#111827'}; }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border || '#e5e7eb'};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button.attrs({ type: 'button' })<{ $primary?: boolean }>`
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${props => props.$primary ? (props.theme.colors.primary || '#047857') : (props.theme.colors.border || '#d1d5db')};
  background: ${props => props.$primary ? (props.theme.colors.primary || '#047857') : 'white'};
  color: ${props => props.$primary ? 'white' : (props.theme.colors.fg || '#374151')};
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$primary ? (props.theme.colors.greenDark || '#1a5c2d') : (props.theme.colors.neutralLighter || '#f9fafb')};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const UploadArea = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border || '#d1d5db'};
  border-radius: 10px;
  padding: 32px;
  text-align: center;
  background: ${({ theme }) => theme.colors.neutralLighter || '#f9fafb'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary || '#047857'};
    background: ${({ theme }) => theme.colors.greenXLight || '#ecfdf5'};
  }
`;

const Alert = styled.div<{ $type: 'success' | 'error' | 'info' }>`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 0.875rem;
  background: ${props => props.$type === 'error' ? '#fef2f2' : props.$type === 'success' ? (props.theme.colors.successLight || '#ecfdf5') : '#eff6ff'};
  color: ${props => props.$type === 'error' ? '#991b1b' : props.$type === 'success' ? '#065f46' : '#1e40af'};
  border: 1px solid ${props => props.$type === 'error' ? '#f87171' : props.$type === 'success' ? '#34d399' : '#93c5fd'};
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
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "student_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <Title>Import Học sinh từ CSV</Title>
          <CloseBtn onClick={onClose}>&times;</CloseBtn>
        </ModalHeader>
        
        <ModalBody>
          {error && <Alert $type="error">{error}</Alert>}
          <Alert $type="info">
            Tải về <a href="#" onClick={(e) => { e.preventDefault(); downloadTemplate(); }} style={{ fontWeight: 600, color: '#1e40af', textDecoration: 'underline' }}>file mẫu (template.csv)</a> và điền dữ liệu theo đúng định dạng trước khi tải lên.
          </Alert>

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
        
        <ModalFooter>
          <Button onClick={onClose}>Hủy bỏ</Button>
          <Button $primary onClick={handleUpload} disabled={!file || loading}>
            {loading ? 'Đang import...' : 'Import Dữ liệu'}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
}
