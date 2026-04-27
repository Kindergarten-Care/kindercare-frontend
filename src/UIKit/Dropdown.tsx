'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
`;

const SelectedValue = styled.div<{ $isOpen: boolean; $hasValue: boolean }>`
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid ${props => props.$isOpen ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.1)'};
  background-color: #FFFFFF;
  font-size: 15px;
  font-family: inherit;
  color: ${props => props.$hasValue ? props.theme.colors.textDark : '#9CA3AF'};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  box-sizing: border-box;
  box-shadow: ${props => props.$isOpen ? '0px 0px 0px 4px rgba(43, 105, 77, 0.1)' : 'none'};

  &:hover {
    border-color: ${props => props.$isOpen ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.2)'};
  }
`;

const ArrowIcon = styled.span<{ $isOpen: boolean }>`
  border: solid #4B5563;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: ${props => props.$isOpen ? 'rotate(-135deg)' : 'rotate(45deg)'};
  transition: transform 0.3s ease;
`;

const OptionsList = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  box-sizing: border-box;
`;

const OptionItem = styled.div<{ $isSelected: boolean }>`
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  color: ${props => props.$isSelected ? props.theme.colors.bgWhite : props.theme.colors.textDark};
  background-color: ${props => props.$isSelected ? props.theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$isSelected ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.05)'};
  }
`;

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Chọn',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <SelectedValue
        $isOpen={isOpen}
        $hasValue={!!selectedOption}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <ArrowIcon $isOpen={isOpen} />
      </SelectedValue>

      {isOpen && (
        <OptionsList>
          {options.map((option) => (
            <OptionItem
              key={option.value}
              $isSelected={option.value === value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
