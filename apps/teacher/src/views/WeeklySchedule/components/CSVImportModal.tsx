'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, History, Clock, User } from 'lucide-react';
import * as S from '../styles';
import type { CSVPreviewResult } from '@/services/weeklySchedule/WeeklyScheduleService';

interface CSVImportModalProps {
  isOpen: boolean;
  preview: CSVPreviewResult | null;
  isImporting: boolean;
  onClose: () => void;
  onPreview: (file: File) => void;
  onImport: (file: File) => void;
  classId?: number;
  year?: number;
  month?: number;
  onViewHistory?: () => void;
  hasHistory?: boolean;
}

export const CSVImportModal: React.FC<CSVImportModalProps> = ({
  isOpen,
  preview,
  isImporting,
  onClose,
  onPreview,
  onImport,
  onViewHistory,
  hasHistory,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setSelectedFile(file);
        onPreview(file);
      }
    }
  }, [onPreview]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onPreview(file);
    }
  }, [onPreview]);

  const handleImport = useCallback(() => {
    if (selectedFile) {
      onImport(selectedFile);
    }
  }, [selectedFile, onImport]);

  if (!isOpen) return null;

  return (
    <S.ModalBackdrop onClick={onClose}>
      <S.ImportModalBox
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <S.ModalHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <S.ModalIcon>
              <Upload size={21} />
            </S.ModalIcon>
            <div>
              <S.ModalTitle>Import Thời khóa biểu</S.ModalTitle>
              <S.ModalSubtitle>Tải lên file CSV chứa dữ liệu 4 tuần</S.ModalSubtitle>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {hasHistory && (
              <button
                type="button"
                onClick={onViewHistory}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  background: '#e0e7ff',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#4338ca',
                  cursor: 'pointer',
                }}
              >
                <History size={14} />
                Lịch sử import
              </button>
            )}
            <S.ModalCloseBtn onClick={onClose}>
              <X size={18} />
            </S.ModalCloseBtn>
          </div>
        </S.ModalHeader>

        {/* BODY */}
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
                  <Upload size={48} style={{ color: '#667eea' }} />
                </S.DropZoneIcon>
                <S.DropZoneText>
                  Kéo thả file CSV vào đây hoặc click để chọn file
                </S.DropZoneText>
                <S.DropZoneHint>
                  Định dạng: .csv (UTF-8)
                </S.DropZoneHint>
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
                  Hướng dẫn format CSV:
                </h4>
                <pre style={{
                  fontSize: 11,
                  color: '#4a5568',
                  background: '#edf2f7',
                  padding: 12,
                  borderRadius: 6,
                  overflow: 'auto',
                  margin: 0
                }}>
{`Week,Day,StartTime,EndTime,ActivityName,ActivityType,Details,Location
1,Monday,07:30,08:30,Đón bé,pickup,Tập bài dân vũ,Sân trường
1,Monday,08:30,09:00,Ăn sáng,meal,Suất ăn sáng,Phòng ăn
2,Monday,07:30,08:30,Đón bé,pickup,Tập bài dân vũ,Sân trường`}
                </pre>
                <p style={{ margin: '12px 0 0 0', fontSize: 12, color: '#718096' }}>
                  <strong>ActivityType:</strong> pickup, meal, study, nap, play, dropoff, other
                </p>
                <p style={{ margin: 4, fontSize: 12, color: '#718096' }}>
                  <strong>Day:</strong> Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
                </p>
              </div>
            </>
          ) : (
            <>
              {/* PREVIEW */}
              {selectedFile && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 12,
                  background: '#f0fdf4',
                  borderRadius: 8,
                  marginBottom: 16
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
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#718096'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              {/* INVALID DAYS WARNING */}
              {preview?.invalidDays && preview.invalidDays.length > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: 12,
                  background: '#FEF2F2',
                  borderRadius: 8,
                  marginBottom: 16,
                  border: '1px solid #EF4444'
                }}>
                  <AlertCircle size={24} style={{ color: '#EF4444', flexShrink: 0 }} />
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#DC2626' }}>
                      CSV chứa ngày không hợp lệ
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#991B1B' }}>
                      Chỉ chấp nhận Thứ 2-6. Các dòng không hợp lệ: {preview.invalidDays.map(d => `${d.day} (dòng ${d.row})`).join(', ')}
                    </p>
                  </div>
                </div>
              )}

              {/* PREVIOUS MONTH BLOCKED BANNER */}
              {preview.importAllowed === false && (
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: 12,
                  background: '#FEF3C7',
                  borderRadius: 8,
                  marginBottom: 16,
                  border: '1px solid #F59E0B'
                }}>
                  <Clock size={24} style={{ color: '#D97706', flexShrink: 0 }} />
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#92400E' }}>
                      Không thể import tháng này
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#78350F' }}>
                      {preview.blockedReason || 'Tháng trước chưa được duyệt hoàn toàn.'}
                    </p>
                  </div>
                </div>
              )}

              {/* EXISTING WEEKS WARNING */}
              {preview.existingWeeks && preview.existingWeeks.length > 0 && (
                <div style={{
                  padding: 12,
                  background: '#FFFBEB',
                  borderRadius: 8,
                  marginBottom: 16,
                  border: '1px solid #FDE68A'
                }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: 13, fontWeight: 600, color: '#92400E' }}>
                    Cảnh báo: {preview.existingWeeks.length} tuần đã có lịch trong tháng này
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {preview.existingWeeks.map((w) => {
                      const label =
                        w.status === 'Approved' ? 'Đã duyệt'
                        : w.status === 'Submitted' ? 'Đang chờ duyệt'
                        : w.status === 'Rejected' ? 'Đã bị từ chối'
                        : w.status === 'RevisionRequested' ? 'Yêu cầu chỉnh sửa'
                        : 'Nháp';

                      let badgeBg = '#e5e7eb';
                      let badgeColor = '#374151';
                      let decision = '';
                      if (w.hasPendingChangeRequest) {
                        badgeBg = '#FEE2E2';
                        badgeColor = '#991B1B';
                        decision = 'Có change request — sẽ bỏ qua';
                      } else if (w.status === 'Approved') {
                        badgeBg = '#D1FAE5';
                        badgeColor = '#065F46';
                        decision = 'Sẽ bỏ qua (đã duyệt, không ghi đè)';
                      } else if (w.status === 'Submitted') {
                        badgeBg = '#FEF3C7';
                        badgeColor = '#92400E';
                        decision = 'Sẽ bỏ qua (đang chờ duyệt)';
                      } else if (w.status === 'Rejected' || w.status === 'RevisionRequested') {
                        badgeBg = '#FEE2E2';
                        badgeColor = '#991B1B';
                        decision = 'Sẽ bỏ qua';
                      } else {
                        badgeBg = '#E0E7FF';
                        badgeColor = '#3730A3';
                        decision = 'Sẽ bị ghi đè';
                      }

                      return (
                        <div
                          key={`${w.weekNumber}-${w.templateId}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 12,
                            padding: '8px 10px',
                            background: 'white',
                            borderRadius: 6,
                            fontSize: 13,
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontWeight: 600 }}>Tuần {w.weekNumber}</span>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: 12,
                              background: badgeBg,
                              color: badgeColor,
                              fontSize: 11,
                              fontWeight: 600,
                            }}>
                              {label}
                            </span>
                          </div>
                          <span style={{ fontSize: 12, color: '#4B5563' }}>{decision}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SUMMARY */}
              <S.PreviewSummary>
                <S.SummaryItem>
                  <S.SummaryLabel>Tổng số dòng</S.SummaryLabel>
                  <S.SummaryValue>{preview.totalRows}</S.SummaryValue>
                </S.SummaryItem>
                <S.SummaryItem>
                  <S.SummaryLabel>Số tuần</S.SummaryLabel>
                  <S.SummaryValue>{preview.weeks.length}</S.SummaryValue>
                </S.SummaryItem>
              </S.PreviewSummary>

              {/* WEEK BREAKDOWN */}
              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: '#2d3748' }}>
                  Chi tiết theo tuần:
                </h4>
                {preview.weeks.map((week) => (
                  <div
                    key={week.weekNumber}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      background: '#f7fafc',
                      borderRadius: 6,
                      marginBottom: 8
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Tuần {week.weekNumber}</span>
                    <span style={{ fontSize: 12, color: '#718096' }}>
                      {week.itemCount} hoạt động
                    </span>
                  </div>
                ))}
              </div>

              {/* SAMPLE ROWS */}
              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: '#2d3748' }}>
                  Sample dữ liệu:
                </h4>
                <S.PreviewTable>
                  <thead>
                    <tr>
                      <th>Week</th>
                      <th>Day</th>
                      <th>Time</th>
                      <th>Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.sampleRows.map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.Week || (row as any).weekNumber}</td>
                        <td>{row.Day || (row as any).dayOfWeek}</td>
                        <td>{(row as any).startTime || (row as any).StartTime}</td>
                        <td>{(row as any).activityName || (row as any).ActivityName}</td>
                      </tr>
                    ))}
                  </tbody>
                </S.PreviewTable>
              </div>
            </>
          )}
        </S.ModalBody>

        {/* FOOTER */}
        <S.ModalFooter>
          <S.CancelBtn type="button" onClick={onClose}>
            Hủy
          </S.CancelBtn>
          {preview && (() => {
            const hasInvalid = preview.invalidDays && preview.invalidDays.length > 0;
            const blocked = preview.importAllowed === false;
            const isDisabled = isImporting || hasInvalid || blocked;
            const label = isImporting
              ? 'Đang import...'
              : hasInvalid
              ? 'Không thể import - ngày không hợp lệ'
              : blocked
              ? 'Không thể import - tháng trước chưa duyệt hết'
              : `Import ${preview.totalRows} dòng`;
            return (
              <S.SaveBtn
                type="button"
                onClick={handleImport}
                disabled={isDisabled}
                style={isDisabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
              >
                {!isImporting && <CheckCircle size={16} />}
                {label}
              </S.SaveBtn>
            );
          })()}
        </S.ModalFooter>
      </S.ImportModalBox>
    </S.ModalBackdrop>
  );
};
