'use client';

import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const WelcomeSubtitle = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 30px;
`;

export const CenterImage = styled.img`
  max-width: 100%;
  object-fit: contain;
`;
