'use client';

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import '../theme/types';

export interface DropdownOption<T extends string = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps<T extends string = string> {
  value: T | null;
  onChange: (value: T) => void;
  options: DropdownOption<T>[];
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  id?: string;
  ariaLabel?: string;
}

const Root = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  font-family: ${({ theme }) => theme.fonts.body};
`;

const Trigger = styled.button<{ $open: boolean; $hasValue: boolean }>`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ $hasValue, theme }) => ($hasValue ? theme.colors.fg : theme.colors.muted)};
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.greenMid};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.bg};
  }

  ${({ $open, theme }) =>
    $open &&
    css`
      border-color: ${theme.colors.green};
      box-shadow: 0 0 0 3px rgba(45, 106, 34, 0.1);
    `}
`;

const Chevron = styled.span<{ $open: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.muted};
  transition: transform 0.2s ease, color 0.2s;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});

  ${Trigger}:hover:not(:disabled) & {
    color: ${({ theme }) => theme.colors.green};
  }
`;

const panelFade = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Panel = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 80;
  margin: 0;
  padding: 0.35rem;
  list-style: none;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-height: 240px;
  overflow-y: auto;
  animation: ${panelFade} 0.16s ease-out;
`;

const Item = styled.li<{ $active: boolean; $selected: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.6rem 0.85rem;
  border-radius: 8px;
  font-size: 0.92rem;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  color: ${({ theme, $selected, $disabled }) => {
    if ($disabled) return theme.colors.muted;
    if ($selected) return theme.colors.green;
    return theme.colors.fg;
  }};
  background: ${({ theme, $active, $selected }) => {
    if ($selected) return theme.colors.greenLight;
    if ($active) return theme.colors.greenXLight;
    return 'transparent';
  }};
  transition: background 0.12s, color 0.12s;
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const CheckIcon = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.green};
`;

function ChevronGlyph(): React.ReactElement {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckGlyph(): React.ReactElement {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2.5 7.5L5.5 10.5L11.5 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Dropdown<T extends string = string>({
  value,
  onChange,
  options,
  placeholder = 'Chọn một mục',
  disabled = false,
  fullWidth = false,
  id,
  ariaLabel,
}: DropdownProps<T>): React.ReactElement {
  const reactId = useId();
  const triggerId = id ?? `dropdown-${reactId}`;
  const listboxId = `${triggerId}-listbox`;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const selectedIndex = useMemo(
    () => options.findIndex((option) => option.value === value),
    [options, value],
  );
  const selectedLabel = selectedIndex >= 0 ? options[selectedIndex]?.label ?? placeholder : placeholder;

  const close = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const openMenu = useCallback(() => {
    setOpen(true);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [selectedIndex]);

  const moveActive = useCallback(
    (delta: number) => {
      setActiveIndex((current) => {
        const start = current < 0 ? (selectedIndex >= 0 ? selectedIndex : 0) : current;
        const total = options.length;
        let next = start;
        for (let step = 0; step < total; step += 1) {
          next = (next + delta + total) % total;
          const candidate = options[next];
          if (candidate && !candidate.disabled) return next;
        }
        return current;
      });
    },
    [options, selectedIndex],
  );

  const selectAt = useCallback(
    (index: number) => {
      const option = options[index];
      if (!option || option.disabled) return;
      onChange(option.value);
      close();
      triggerRef.current?.focus();
    },
    [close, onChange, options],
  );

  useEffect(() => {
    if (!open) return;
    const handler = (event: MouseEvent): void => {
      const root = rootRef.current;
      if (root && !root.contains(event.target as Node)) close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, close]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (disabled) return;

    if (!open) {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openMenu();
      }
      return;
    }

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        close();
        break;
      case 'ArrowDown':
        event.preventDefault();
        moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        moveActive(-1);
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(options.findIndex((option) => !option.disabled));
        break;
      case 'End':
        event.preventDefault();
        for (let index = options.length - 1; index >= 0; index -= 1) {
          if (!options[index]?.disabled) {
            setActiveIndex(index);
            break;
          }
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (activeIndex >= 0) selectAt(activeIndex);
        break;
      default:
        break;
    }
  };

  return (
    <Root ref={rootRef} $fullWidth={fullWidth}>
      <Trigger
        type="button"
        id={triggerId}
        ref={triggerRef}
        $open={open}
        $hasValue={selectedIndex >= 0}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-label={ariaLabel}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={handleKeyDown}
      >
        <span>{selectedLabel}</span>
        <Chevron $open={open}>
          <ChevronGlyph />
        </Chevron>
      </Trigger>

      {open && (
        <Panel id={listboxId} role="listbox" aria-labelledby={triggerId}>
          {options.map((option, index) => {
            const isSelected = index === selectedIndex;
            const isActive = index === activeIndex;
            return (
              <Item
                key={option.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                $active={isActive}
                $selected={isSelected}
                $disabled={option.disabled}
                onMouseEnter={() => !option.disabled && setActiveIndex(index)}
                onClick={() => selectAt(index)}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <CheckIcon>
                    <CheckGlyph />
                  </CheckIcon>
                )}
              </Item>
            );
          })}
        </Panel>
      )}
    </Root>
  );
}
