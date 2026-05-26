'use client';

import React from 'react';
import styled from 'styled-components';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  text-align: left;
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border-radius: 9999px;
  border: 1px solid ${props => (props.hasError ? 'red' : props.theme.colors.border)};
  font-family: inherit;
  font-size: 14px;
  outline: none;
  background-color: ${props => props.theme.colors.white};
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(4, 110, 30, 0.1);
  }
`;

const ErrorText = styled.span`
  font-size: 11px;
  color: red;
  margin-top: -4px;
  text-align: left;
`;

export const Input: React.FC<InputProps> = ({
  label,
  error,
  id,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <Wrapper>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <StyledInput
        id={inputId}
        hasError={!!error}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        {...props}
      />
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </Wrapper>
  );
};
