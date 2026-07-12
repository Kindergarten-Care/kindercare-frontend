'use client';

import styled, { keyframes } from 'styled-components';

/* ─── Animations ─── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

/* ─── Background & Decorations ─── */
export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #f0fdf4, #dcfce7, #f0f9ff, #ecfeff);
  background-size: 400% 400%;
  animation: ${gradientBG} 15s ease infinite;

  position: relative;
  padding: 1rem;
`;

export const FloatingStar = styled.div<{ $top: string; $left: string; $delay: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  font-size: 1.5rem;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.$delay};
  opacity: 0.3;
  pointer-events: none;
  user-select: none;
`;

/* ─── Login Modal Card ─── */
export const LoginModal = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  background-color: #ffffff;
  border-radius: 24px;
  padding: 2.5rem 2rem;
  box-shadow:
    0 4px 6px rgba(35, 122, 60, 0.04),
    0 12px 32px rgba(35, 122, 60, 0.10),
    0 32px 64px rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(35, 122, 60, 0.10);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  animation: ${fadeIn} 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
    border-radius: 20px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
`;

export const Logo = styled.img`
  height: 60px;
  width: auto;
  object-fit: contain;
  margin-bottom: 0.5rem;
`;

export const PortalLabel = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.01em;

  margin: 0;
`;

/* ─── Form Elements ─── */
export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const FieldLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;

`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 14px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  pointer-events: none;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  background-color: #f9fafb;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #111827;
  outline: none;

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }

  &:focus {
    background-color: #ffffff;
    border-color: #237A3C;
    box-shadow: 0 0 0 4px rgba(35, 122, 60, 0.08);
  }
`;

export const TogglePasswordBtn = styled.button`
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  font-size: 1.1rem;
  transition: color 0.2s;

  &:hover {
    color: #237A3C;
  }
`;

/* ─── Checkbox ─── */
export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  user-select: none;

`;

export const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background-color: #ffffff;
  border: 2px solid #d1d5db;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:checked {
    background-color: #237A3C;
    border-color: #237A3C;
  }

  &:checked::after {
    content: '✓';
    color: #ffffff;
    font-size: 12px;
    font-weight: 800;
  }

  &:hover {
    border-color: #237A3C;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(35, 122, 60, 0.25);
  }
`;

/* ─── Submit Button ─── */
export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(135deg, #237A3C 0%, #2f9e4f 100%);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 14px;
  cursor: pointer;

  letter-spacing: 0.2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px rgba(35, 122, 60, 0.15);
  margin-top: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(35, 122, 60, 0.25);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

/* ─── Error Message ─── */
export const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  color: #dc2626;
  font-size: 0.85rem;
  padding: 0.6rem 0.9rem;
  text-align: center;
`;
