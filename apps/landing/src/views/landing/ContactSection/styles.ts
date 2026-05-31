'use client';

import styled from 'styled-components';
import { Section } from '@/UIKit';

export const ContactSectionRoot = styled(Section)`
  background: ${({ theme }) => theme.colors.surface};
`;

export const Inner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: max-content;
    margin: 0 auto 2rem;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const ItemIcon = styled.div`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.greenLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
`;

export const ItemText = styled.div`
  strong {
    display: block;
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-size: 0.75rem;
    margin-bottom: 0.1rem;
  }

  span {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.fg};
  }
`;

export const MapContainer = styled.div`
  border-radius: 16px;
  overflow: hidden;
  height: 250px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  
  /* Make sure the iframe fills the container */
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

export const FormWrap = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  h3 {
    margin-bottom: 0.4rem;
  }

  > p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 1.8rem;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;

  label {
    font-size: 0.82rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.muted};
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  input,
  select,
  textarea {
    padding: 0.7rem 1rem;
    border: 1.5px solid ${({ theme }) => theme.colors.border};
    border-radius: 10px;
    font: inherit;
    font-size: 0.95rem;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.fg};
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: ${({ theme }) => theme.colors.green};
    box-shadow: 0 0 0 3px rgba(45, 106, 34, 0.1);
  }

  textarea {
    resize: vertical;
    min-height: 90px;
  }
`;

export const FormConsent = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  margin-top: 0.8rem;
`;

export const FormSuccess = styled.div`
  text-align: center;
  padding: 2rem;

  .success-icon {
    font-size: 3rem;
    margin-bottom: 0.75rem;
  }

  h4 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;
