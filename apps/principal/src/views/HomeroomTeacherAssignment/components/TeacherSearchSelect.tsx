'use client';

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import Avatar from '@/components/Avatar';
import { AccountDomainModel } from '@/config/types/account';

export interface TeacherSearchSelectProps {
  teachers: AccountDomainModel[];
  value: string;
  onChange: (id: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Root = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;

const TriggerInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem 2.2rem 0.7rem 1rem;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.fg};
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.green};
    box-shadow: 0 0 0 3px rgba(45, 106, 34, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.bg};
  }
`;

const Chevron = styled.span<{ $open: boolean }>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%) rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  pointer-events: none;
  display: inline-flex;
  color: ${({ theme }) => theme.colors.muted};
  transition: transform 0.2s ease;
`;

const panelFade = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Panel = styled.ul<{ $top: number; $left: number; $width: number }>`
  position: fixed;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  width: ${({ $width }) => $width}px;
  box-sizing: border-box;
  z-index: 1001;
  margin: 0;
  padding: 6px;
  list-style: none;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-height: 280px;
  overflow-y: auto;
  animation: ${panelFade} 0.16s ease-out;
`;

const Item = styled.li<{ $active: boolean; $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  background: ${({ theme, $active, $selected }) => {
    if ($selected) return theme.colors.greenLight;
    if ($active) return theme.colors.greenXLight;
    return 'transparent';
  }};
  transition: background 0.12s;
`;

const ItemText = styled.div`
  min-width: 0;
  flex: 1;
`;

const ItemName = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.fg};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemUsername = styled.div`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.muted};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EmptyItem = styled.li`
  padding: 12px 10px;
  text-align: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export default function TeacherSearchSelect({ teachers, value, onChange, placeholder = 'Tìm và chọn giáo viên...', disabled }: TeacherSearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [panelRect, setPanelRect] = useState<{ top: number; left: number; width: number } | null>(null);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLUListElement | null>(null);

  const selected = useMemo(() => teachers.find(t => String(t.id) === value) ?? null, [teachers, value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teachers;
    return teachers.filter(t =>
      t.fullName.toLowerCase().includes(q) || t.username.toLowerCase().includes(q)
    );
  }, [teachers, query]);

  const close = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const openMenu = useCallback(() => {
    setOpen(true);
    setQuery('');
    setActiveIndex(selected ? filtered.findIndex(t => t.id === selected.id) : 0);
  }, [selected, filtered]);

  const selectAt = useCallback(
    (index: number) => {
      const teacher = filtered[index];
      if (!teacher) return;
      onChange(String(teacher.id));
      close();
      inputRef.current?.blur();
    },
    [close, filtered, onChange]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, close]);

  const updatePanelRect = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    setPanelRect({ top: rect.bottom + 6, left: rect.left, width: rect.width });
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setPanelRect(null);
      return;
    }
    updatePanelRect();
    window.addEventListener('scroll', updatePanelRect, true);
    window.addEventListener('resize', updatePanelRect);
    return () => {
      window.removeEventListener('scroll', updatePanelRect, true);
      window.removeEventListener('resize', updatePanelRect);
    };
  }, [open, updatePanelRect]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (disabled) return;

    if (!open) {
      if (event.key === 'ArrowDown' || event.key === 'Enter') {
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
        setActiveIndex(i => Math.min(i + 1, filtered.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        if (activeIndex >= 0) selectAt(activeIndex);
        break;
      default:
        break;
    }
  };

  return (
    <Root ref={rootRef}>
      <TriggerInput
        ref={inputRef}
        value={open ? query : (selected ? `${selected.fullName} (@${selected.username})` : '')}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={openMenu}
        onChange={e => {
          setQuery(e.target.value);
          setActiveIndex(0);
          if (!open) setOpen(true);
        }}
        onKeyDown={handleKeyDown}
      />
      <Chevron $open={open}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Chevron>

      {open && panelRect && typeof document !== 'undefined' && createPortal(
        <Panel ref={panelRef} $top={panelRect.top} $left={panelRect.left} $width={panelRect.width}>
          {filtered.length === 0 ? (
            <EmptyItem>Không tìm thấy giáo viên phù hợp</EmptyItem>
          ) : (
            filtered.map((teacher, index) => (
              <Item
                key={teacher.id}
                $active={index === activeIndex}
                $selected={teacher.id === selected?.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectAt(index)}
              >
                <Avatar src={teacher.avatarUrl} name={teacher.fullName} size={32} />
                <ItemText>
                  <ItemName>{teacher.fullName}</ItemName>
                  <ItemUsername>@{teacher.username}</ItemUsername>
                </ItemText>
              </Item>
            ))
          )}
        </Panel>,
        document.body
      )}
    </Root>
  );
}
