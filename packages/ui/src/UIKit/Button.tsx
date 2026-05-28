'use client';

import React from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text' | 'tab' | 'activeTab';
  fullWidth?: boolean;
}

const StyledButton = styled.button<{ $variant?: ButtonProps['variant']; $fullWidth?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  border-radius: 9999px;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: ${props => (props.$fullWidth ? '100%' : 'auto')};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return css`
          background-color: ${props.theme.colors.primary};
          color: ${props.theme.colors.white};
          box-shadow: 0 4px 6px -1px rgba(4, 110, 30, 0.2);

          &:hover:not(:disabled) {
            background-color: #035216; /* Muted darker emerald */
            box-shadow: 0 4px 12px rgba(4, 110, 30, 0.3);
          }
        `;
      case 'secondary':
        return css`
          background-color: ${props.theme.colors.white};
          color: ${props.theme.colors.primary};
          border: 1.5px solid ${props.theme.colors.primary};

          &:hover:not(:disabled) {
            background-color: rgba(4, 110, 30, 0.05);
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          color: ${props.theme.colors.accent};
          padding: 0;
          font-weight: 500;
          font-size: 12px;

          &:hover:not(:disabled) {
            text-decoration: underline;
          }
        `;
      case 'activeTab':
        return css`
          background-color: ${props.theme.colors.white};
          color: ${props.theme.colors.primary};
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        `;
      case 'tab':
        return css`
          background-color: transparent;
          color: ${props.theme.colors.textSecondary};
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;

          &:hover:not(:disabled) {
            color: ${props.theme.colors.text};
          }
        `;
      default:
        return css`
          background-color: ${props.theme.colors.primary};
          color: ${props.theme.colors.white};
        `;
    }
  }}
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButton $variant={variant} $fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  );
};
