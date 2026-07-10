'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import * as S from '../styles';
import { ACTIVITY_TYPE_LABELS, DAY_LABELS } from '@/config/types/weeklySchedule';
import type { SchoolDay, CSVPreviewResult } from '@/config/types/weeklySchedule';

interface CSVImportModalProps {
  isOpen: boolean;
  preview: CSVPreviewResult | null;
  isImporting: boolean;
  onClose: () => void;
  onPreview: (file: File) => void;
  onImport: (file: File) => void;
}

const DAYS: SchoolDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const CSVImportModal: React.FC<CSVImportModalProps> = ({
  isOpen,
  preview,
  isImporting,
  onClose,
  onPreview,
  onImport,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      setSelectedFile(file);
      onPreview(file);
    }
  }, [onPreview]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onPreview(file);
    }
  }, [onPreview]);

  const handleReset = useCallback(() => {
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  const handleImport = useCallback(() => {
    if (selectedFile) onImport(selectedFile);
  }, [selectedFile, onImport]);

  if (!isOpen) return null;

  return (
    <S.ModalBackdrop onClick={onClose}>
      <S.ImportModalBox onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <S.ModalHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <S.ModalIcon style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <Upload size={21} />
            </S.ModalIcon>
            <div>
              <S.ModalTitle>Import CSV cho tuần này</S.ModalTitle>
              <S.ModalSubtitle>Tải lên file CSV — dữ liệu sẽ thay thế hoàn toàn hoạt động hiện tại</S.ModalSubtitle>
            </div>
          </div>
          <S.ModalCloseBtn onClick={onClose}><X size={18} /></S.ModalCloseBtn>
        </S.ModalHeader>

        <S.ModalBody>
          {!preview ? (
            <>
              {/* DROP ZONE */}
              <S.DropZone
                $active={dragActive}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
              >
                <S.DropZoneIcon>
                  <Upload size={48} style={{ color: '#10B981' }} />
                </S.DropZoneIcon>
                <S.DropZoneText>
                  Kéo thả file CSV vào đây hoặc click để chọn file
                </S.DropZoneText>
                <S.DropZoneHint>Định dạng: .csv (UTF-8)</S.DropZoneHint>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </S.DropZone>

              {/* INSTRUCTIONS */}
              <div style={{ background: '#f7fafc', padding: 16, borderRadius: 8 }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: '#2d3748' }}>
                  Cấu trúc file CSV:
                </h4>
                <pre style={{
                  fontSize: 11, color: '#4a5568', background: '#edf2f7',
                  padding: 12, borderRadius: 6, overflow: 'auto', margin: 0,
                }}>
                  {`DayOfWeek,StartTime,EndTime,ActivityName,ActivityType,Details,Location
Monday,07:30,08:30,Đón bé,pickup,Tập bài dân vũ,Sân trường
Monday,08:30,09:00,Ăn sáng,meal,Suất ăn sáng,Phòng ăn
Tuesday,09:00,10:15,Học tập,study,Giờ học Tiếng Việt,Lớp học`}
                </pre>
                <p style={{ margin: '12px 0 0 0', fontSize: 12, color: '#718096' }}>
                  <strong>DayOfWeek:</strong> Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
                </p>
                <p style={{ margin: 4, fontSize: 12, color: '#718096' }}>
                  <strong>ActivityType:</strong> pickup, meal, study, nap, play, dropoff, other
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Selected File */}
              {selectedFile && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: 12, background: '#f0fdf4', borderRadius: 8, marginBottom: 0,
                }}>
                  <FileText size={24} style={{ color: '#10B981' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#166534' }}>
                      {selectedFile.name}
                    </p>
                    <p style={{ margin: 0, fontSize: 12, color: '#15803d' }}>
                      File hợp lệ
                    </p>
                  </div>
                  <button type="button" onClick={handleReset} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#718096' }}>
                    <X size={18} />
                  </button>
                </div>
              )}

              {/* Parse Errors */}
              {preview.errors.length > 0 && (
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: 12, background: '#FEF2F2', borderRadius: 8,
                  border: '1px solid #EF4444',
                }}>
                  <AlertCircle size={24} style={{ color: '#EF4444', flexShrink: 0 }} />
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#DC2626' }}>
                      {preview.errors.length} lỗi trong file CSV
                    </p>
                    <ul style={{ margin: '4px 0 0 0', fontSize: 12, color: '#991B1B', paddingLeft: 16 }}>
                      {preview.errors.slice(0, 5).map((err: string, i: number) => <li key={i}>{err}</li>)}
                      {preview.errors.length > 5 && <li>...và {preview.errors.length - 5} lỗi khác</li>}
                    </ul>
                  </div>
                </div>
              )}

              {/* Summary */}
              <S.PreviewSummary>
                <S.SummaryItem>
                  <S.SummaryLabel>Tổng hoạt động</S.SummaryLabel>
                  <S.SummaryValue>{preview.totalRows}</S.SummaryValue>
                </S.SummaryItem>
              </S.PreviewSummary>

              {/* Preview by Day */}
              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: '#2d3748' }}>
                  Xem trước theo ngày:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {DAYS.map(day => {
                    const items = (preview.items || []).filter((it) => it.dayOfWeek === day);
                    if (items.length === 0) return null;
                    return (
                      <div key={day} style={{
                        padding: '10px 14px', background: '#f7fafc', borderRadius: 8,
                        borderLeft: '3px solid #10B981',
                      }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: '#2d3748', marginBottom: 8 }}>
                          {DAY_LABELS[day]} — {items.length} hoạt động
                        </div>
                        {items.map((item: WeeklyScheduleDetail & { weekOrder: number }, idx: number) => (
                          <div key={idx} style={{
                            display: 'flex', gap: 8, alignItems: 'center',
                            padding: '4px 0', fontSize: 12, color: '#4a5568',
                            borderBottom: idx < items.length - 1 ? '1px solid #e2e8f0' : 'none',
                          }}>
                            <span style={{ minWidth: 50, color: '#718096' }}>
                              {item.startTime.slice(0, 5)}-{item.endTime.slice(0, 5)}
                            </span>
                            <span style={{ fontWeight: 600 }}>{item.activityName}</span>
                            <span style={{ marginLeft: 'auto', fontSize: 11, color: '#10B981', background: '#D1FAE5', padding: '1px 6px', borderRadius: 10 }}>
                              {ACTIVITY_TYPE_LABELS[item.activityType]}
                            </span>
                            {item.location && (
                              <span style={{ fontSize: 11, color: '#A0AEC0' }}>📍 {item.location}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                  {preview.totalRows === 0 && (
                    <p style={{ textAlign: 'center', color: '#A0AEC0', fontSize: 13 }}>Không có dữ liệu</p>
                  )}
                </div>
              </div>
            </>
          )}
        </S.ModalBody>

        <S.ModalFooter>
          <S.CancelBtn type="button" onClick={onClose}>Hủy</S.CancelBtn>
          {preview && preview.errors.length === 0 && (
            <S.SaveBtn
              type="button"
              onClick={handleImport}
              disabled={isImporting}
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
            >
              {!isImporting && <CheckCircle size={16} />}
              {isImporting ? 'Đang import...' : `Import ${preview.totalRows} hoạt động`}
            </S.SaveBtn>
          )}
          {preview && preview.errors.length > 0 && (
            <span style={{ fontSize: 13, color: '#DC2626' }}>
              Vui lòng sửa lỗi CSV trước khi import
            </span>
          )}
        </S.ModalFooter>
      </S.ImportModalBox>
    </S.ModalBackdrop>
  );
};
