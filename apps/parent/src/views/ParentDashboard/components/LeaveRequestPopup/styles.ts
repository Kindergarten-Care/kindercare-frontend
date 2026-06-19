'use client';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 24px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: ${scaleIn} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const HeadRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px 24px 18px 24px;
  border-bottom: 1px solid #f1f5f9;
`;

export const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--brand-tint);
  color: var(--brand);
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

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FieldLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #334155;
`;

export const ToggleContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
  user-select: none;
`;

export const ToggleInput = styled.input`
  display: none;
`;

export const ToggleSwitch = styled.div<{ $checked: boolean }>`
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background: ${p => p.$checked ? 'var(--brand)' : '#cbd5e1'};
  position: relative;
  transition: background 0.2s;

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ffffff;
    top: 2px;
    left: ${p => p.$checked ? '18px' : '2px'};
    transition: left 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }
`;

export const DateGrid = styled.div`
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
  border-radius: 12px;
  padding: 10px 14px;
  outline: none;
  transition: border-color 0.15s, background-color 0.15s;

  &:focus {
    border-color: var(--brand);
    background: #ffffff;
  }
`;

export const ChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ReasonChip = styled.button<{ $active: boolean }>`
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.18s ease;
  background: ${p => p.$active ? 'var(--brand-tint)' : '#ffffff'};
  color: ${p => p.$active ? 'var(--brand)' : '#475569'};
  border: 1px solid ${p => p.$active ? 'var(--brand)' : '#e2e8f0'};

  &:hover {
    background: ${p => p.$active ? 'var(--brand-tint)' : '#f8fafc'};
    border-color: ${p => p.$active ? 'var(--brand)' : '#cbd5e1'};
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  height: 90px;
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

export const AttachmentArea = styled.div`
  border: 1.5px dashed #cbd5e1;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  background: #f8fafc;
  transition: border-color 0.15s, background-color 0.15s;
  position: relative;
  cursor: pointer;

  &:hover {
    border-color: var(--brand);
    background: var(--brand-tint);
  }
`;

export const AttachmentLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #475569;
  font-weight: 500;

  span {
    font-size: 11px;
    color: #94a3b8;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const AttachedFileBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--brand-tint);
  border: 1px solid #bbf7d0;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  color: var(--brand);
  font-weight: 500;
`;

export const RemoveFileBtn = styled.button`
  border: none;
  background: none;
  color: #dc2626;
  font-weight: 600;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.1s;

  &:hover {
    opacity: 0.8;
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
