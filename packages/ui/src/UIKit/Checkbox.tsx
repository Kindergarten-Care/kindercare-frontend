'use client';

import React from 'react';
import styled from 'styled-components';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.colors.textSecondary};
  width: fit-content;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? props.theme.colors.primary : props.theme.colors.white)};
  border: 1.5px solid ${props => (props.checked ? props.theme.colors.primary : props.theme.colors.border)};
  border-radius: 4px;
  transition: all 150ms;
  display: flex;
  align-items: center;
  justify-content: center;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px rgba(4, 110, 30, 0.1);
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
  id,
  ...props
}) => {
  return (
    <Wrapper htmlFor={id}>
      <HiddenCheckbox id={id} checked={checked} onChange={onChange} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
      <span>{label}</span>
    </Wrapper>
  );
};
