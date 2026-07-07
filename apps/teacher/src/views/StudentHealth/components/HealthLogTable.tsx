'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import * as S from '../styles';
import type {
  CreateHealthLogPayload,
  HealthLogDomainModel,
  LogSeverity,
  LogType,
} from '@/config/types/studentHealth';

interface HealthLogTableProps {
  logs: HealthLogDomainModel[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isReadOnly: boolean;
  onRetry: () => void;
  onSubmit: (payload: CreateHealthLogPayload) => Promise<void>;
  onUpdate: (logId: number, payload: Partial<CreateHealthLogPayload>) => Promise<void>;
  onDelete: (logId: number) => Promise<void>;
}

const DEFAULT_FORM: CreateHealthLogPayload = {
  logType: 'Observation',
  value: '',
  description: '',
  severity: 'Normal',
  actionTaken: '',
  loggedAt: Math.floor(Date.now() / 1000),
};

const formatDate = (ts: bigint): string =>
  new Date(Number(ts) * 1000).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
  });

export const HealthLogTable: React.FC<HealthLogTableProps> = ({
  logs,
  isLoading,
  isError,
  error,
  isReadOnly,
  onRetry,
  onSubmit,
  onUpdate,
  onDelete,
}) => {
  const [openForm, setOpenForm] = React.useState(false);
  const [form, setForm] = React.useState<CreateHealthLogPayload>(DEFAULT_FORM);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.logType) return;
    try {
      setSubmitting(true);
      await onSubmit({
        logType: form.logType,
        value: form.value?.trim() || null,
        description: form.description?.trim() || null,
        severity: form.severity,
        actionTaken: form.actionTaken?.trim() || null,
        loggedAt: form.loggedAt,
      });
      setOpenForm(false);
      setForm(DEFAULT_FORM);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <S.TableCard>
      <S.TableHeader>
        <h2>Nhật ký sức khỏe trong ngày</h2>
        {!isReadOnly && (
          <S.AddButton type="button" onClick={() => setOpenForm(true)}>
            <Plus size={14} /> Ghi nhật ký
          </S.AddButton>
        )}
      </S.TableHeader>

      {isLoading ? (
        <S.SpinnerOverlay>Đang tải nhật ký…</S.SpinnerOverlay>
      ) : isError ? (
        <S.ErrorBox>
          <span>{(error as Error)?.message || 'Không thể tải nhật ký'}</span>
          <button type="button" onClick={() => onRetry()}>
            Thử lại
          </button>
        </S.ErrorBox>
      ) : logs.length === 0 ? (
        <S.EmptyStateBox>Chưa có nhật ký nào trong ngày hôm nay.</S.EmptyStateBox>
      ) : (
        <S.StyledTable>
          <thead>
            <tr>
              <th style={{ width: 130 }}>Thời gian</th>
              <th style={{ width: 120 }}>Loại</th>
              <th style={{ width: 100 }}>Mức độ</th>
              <th>Ghi chú / Hành động</th>
              {!isReadOnly && <th style={{ width: 120 }}></th>}
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.logId}>
                <td>{formatDate(log.loggedAt)}</td>
                <td>{log.logType}</td>
                <td>
                  <S.SeverityPill $severity={log.severity}>{log.severity}</S.SeverityPill>
                </td>
                <td>
                  {log.value && (
                    <div style={{ fontWeight: 600 }}>{log.value}</div>
                  )}
                  {log.description && <div>{log.description}</div>}
                  {log.actionTaken && (
                    <div style={{ color: '#3b5247', marginTop: 4 }}>
                      → {log.actionTaken}
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                    Bởi {log.loggedByName ?? `User #${log.loggedBy}`}
                  </div>
                </td>
                {!isReadOnly && (
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <S.ActionButton
                        type="button"
                        $variant="ghost"
                        onClick={() =>
                          onUpdate(log.logId, {
                            severity:
                              log.severity === 'Severe'
                                ? 'Moderate'
                                : log.severity === 'Moderate'
                                ? 'Mild'
                                : log.severity === 'Mild'
                                ? 'Normal'
                                : 'Severe',
                          })
                        }
                      >
                        Bật cảnh báo
                      </S.ActionButton>
                      <S.ActionButton
                        type="button"
                        $variant="danger"
                        onClick={() => onDelete(log.logId)}
                      >
                        <Trash2 size={12} />
                      </S.ActionButton>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </S.StyledTable>
      )}

      {openForm && (
        <S.ModalBackdrop onClick={() => !submitting && setOpenForm(false)}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Ghi nhật ký sức khỏe</h3>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <S.Field>
                Loại nhật ký
                <select
                  value={form.logType}
                  onChange={(e) =>
                    setForm({ ...form, logType: e.target.value as LogType })
                  }
                >
                  <option value="Temperature">Nhiệt độ</option>
                  <option value="Incident">Sự cố</option>
                  <option value="Observation">Quan sát</option>
                  <option value="Mood">Tâm trạng</option>
                  <option value="Meal">Bữa ăn</option>
                  <option value="Nap">Giấc ngủ</option>
                </select>
              </S.Field>
              <S.Field>
                Giá trị
                <input
                  value={form.value ?? ''}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  placeholder="VD: 38.5°C, Bình thường"
                  maxLength={100}
                />
              </S.Field>
              <S.Field>
                Mô tả
                <textarea
                  value={form.description ?? ''}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </S.Field>
              <S.Field>
                Mức độ
                <select
                  value={form.severity}
                  onChange={(e) =>
                    setForm({ ...form, severity: e.target.value as LogSeverity })
                  }
                >
                  <option value="Normal">Bình thường</option>
                  <option value="Mild">Nhẹ</option>
                  <option value="Moderate">Trung bình</option>
                  <option value="Severe">Nặng</option>
                </select>
              </S.Field>
              <S.Field>
                Hành động đã xử lý
                <textarea
                  value={form.actionTaken ?? ''}
                  onChange={(e) => setForm({ ...form, actionTaken: e.target.value })}
                />
              </S.Field>
              <S.ModalActions>
                <S.ActionButton
                  type="button"
                  $variant="ghost"
                  onClick={() => setOpenForm(false)}
                  disabled={submitting}
                >
                  Hủy
                </S.ActionButton>
                <S.AddButton type="submit" disabled={submitting}>
                  {submitting ? 'Đang lưu…' : 'Lưu'}
                </S.AddButton>
              </S.ModalActions>
            </form>
          </S.ModalCard>
        </S.ModalBackdrop>
      )}
    </S.TableCard>
  );
};