'use client';

import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1640px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 40px 60px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-sizing: border-box;

  @media (max-width: 860px) {
    padding: 18px 18px 96px;
    gap: 20px;
  }

  @media (max-width: 768px) {
    padding: 16px 0 96px;
  }
`;