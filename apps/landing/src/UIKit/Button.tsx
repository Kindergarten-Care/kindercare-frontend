'use client';

import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'outline' | 'amber' | 'ghost';
export type ButtonSize = 'md' | 'lg';

interface ButtonStyleProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
}

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 3px 14px rgba(45, 106, 34, 0.35);
    &:hover {
      background: ${({ theme }) => theme.colors.greenMid};
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(45, 106, 34, 0.4);
    }
  `,
  outline: css`
    border: 1.5px solid ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.green};
    &:hover {
      background: ${({ theme }) => theme.colors.greenXLight};
    }
  `,
  amber: css`
    background: ${({ theme }) => theme.colors.amber};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 3px 14px rgba(196, 136, 10, 0.35);
    &:hover {
      background: ${({ theme }) => theme.colors.amberMid};
      transform: translateY(-1px);
    }
  `,
  ghost: css`
    color: ${({ theme }) => theme.colors.white};
    border: 1.5px solid rgba(255, 255, 255, 0.5);
    &:hover {
      background: rgba(255, 255, 255, 0.12);
    }
  `,
} as const;

const baseStyles = css<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: ${({ $size }) => ($size === 'lg' ? '0.85rem 2rem' : '0.65rem 1.4rem')};
  border-radius: 50px;
  font-size: ${({ $size }) => ($size === 'lg' ? '1rem' : '0.9rem')};
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s;
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}
  ${({ $variant = 'primary' }) => variantStyles[$variant]}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    ${({ $size }) =>
      $size === 'lg' &&
      css`
        padding: 0.75rem 1.5rem;
        font-size: 0.95rem;
      `}
  }
`;

export const Button = styled.button<ButtonStyleProps>`
  ${baseStyles}
`;

export const LinkButton = styled.a<ButtonStyleProps>`
  ${baseStyles}
`;
