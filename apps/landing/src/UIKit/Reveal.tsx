'use client';

import React from 'react';
import styled from 'styled-components';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

const RevealRoot = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '24px')});
  transition: opacity 0.6s ease, transform 0.6s ease;
`;

export function Reveal({ children, as, className }: RevealProps): React.ReactElement {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  return (
    <RevealRoot ref={ref} $visible={visible} as={as} className={className}>
      {children}
    </RevealRoot>
  );
}
