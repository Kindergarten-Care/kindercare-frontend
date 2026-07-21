'use client';

import styled from 'styled-components';

export const HeadRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px 24px 18px 24px;
  border-bottom: 1px solid #f1f5f9;
`;

export const DateFieldWrapper = styled.div`
  padding: 16px 24px 0 24px;
`;

export const DateSelectBtn = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${p => (p.$active ? '#f8fafc' : '#ffffff')};
  border: 1px solid ${p => (p.$active ? 'var(--brand)' : '#e2e8f0')};
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  color: #334155;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

export const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #fee2e2;
  color: #dc2626;
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const TitleWrap = styled.div`
  flex: 1;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.3;
`;

export const Subtitle = styled.div`
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
  font-weight: 500;
`;

export const CloseBtn = styled.button`
  border: none;
  background: #f1f5f9;
  color: #64748b;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #e2e8f0;
    color: #0f172a;
  }
`;

export const ContentForm = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: calc(90vh - 160px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
`;

export const MedicineCard = styled.div`
  border: 1px solid #e2e8f0;
  background: #ffffff;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const CardBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--brand);
  background: var(--brand-tint);
  padding: 6px 12px;
  border-radius: 8px;
`;

export const RemoveCardBtn = styled.button`
  border: none;
  background: none;
  color: #dc2626;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.8;
  }
`;

export const CardBodyGrid = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ImageUploadSlot = styled.div`
  width: 96px;
  height: 120px;
  border: 1.5px dashed #cbd5e1;
  border-radius: 12px;
  background: #f8fafc;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-shrink: 0;
  transition: border-color 0.15s, background-color 0.15s;
  overflow: hidden;
  position: relative;

  &:hover {
    border-color: var(--brand);
    background: var(--brand-tint);
  }
`;

export const UploadSlotLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  text-align: center;
  padding: 0 4px;
`;

export const AttachedImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageOverlayActions = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.6);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`;

export const RemovePhotoBtn = styled.button`
  background: #dc2626;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.12s;

  &:hover {
    background: #b91c1c;
  }
`;

export const CardFieldsWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InputLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #475569;
`;

export const RowGrid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const StyledInput = styled.input`
  width: 100%;
  font: inherit;
  font-size: 14px;
  color: #0f172a;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 8px 12px;
  outline: none;
  transition: border-color 0.15s, background-color 0.15s;

  &:focus {
    border-color: var(--brand);
    background: #ffffff;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const TimingLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 2px;
`;

export const PillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const PillBtn = styled.button<{ $active: boolean }>`
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.15s ease;
  background: ${p => p.$active ? 'var(--brand-tint)' : '#f8fafc'};
  color: ${p => p.$active ? 'var(--brand)' : '#475569'};
  border: 1px solid ${p => p.$active ? 'var(--brand)' : '#e2e8f0'};

  &:hover {
    background: ${p => p.$active ? 'var(--brand-tint)' : '#f1f5f9'};
    border-color: ${p => p.$active ? 'var(--brand)' : '#cbd5e1'};
  }
`;

export const AddMoreBtn = styled.button`
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--brand);
  background: none;
  border: 1.5px dashed var(--brand);
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: var(--brand-tint);
    border-color: var(--brand-hover);
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SectionLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #334155;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  height: 80px;
  font: inherit;
  font-size: 14px;
  color: #0f172a;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 14px;
  outline: none;
  resize: none;
  transition: border-color 0.15s, background-color 0.15s;

  &:focus {
    border-color: var(--brand);
    background: #ffffff;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 18px 24px;
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;
`;

export const CancelBtn = styled.button`
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  background: #f1f5f9;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;

  &:hover {
    background: #e2e8f0;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const SubmitBtn = styled.button`
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background: var(--brand);
  border: none;
  padding: 10px 22px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.15s, transform 0.1s;
  box-shadow: 0 4px 12px -2px rgba(0, 90, 54, 0.3);

  &:hover {
    background: var(--brand-hover);
  }

  &:active {
    transform: scale(0.98);
  }
`;
