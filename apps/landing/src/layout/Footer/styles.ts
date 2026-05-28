'use client';

import styled from 'styled-components';

export const FooterRoot = styled.footer`
  background: ${({ theme }) => theme.colors.footerBg};
  color: rgba(255, 255, 255, 0.65);
  padding: 4rem 1.5rem 2rem;
`;

export const FooterInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const FooterBrand = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 1 / -1;
  }
`;

export const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1rem;
`;

export const BrandName = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const BrandTagline = styled.p`
  font-size: 0.88rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

export const SocialRow = styled.div`
  display: flex;
  gap: 0.6rem;
`;

export const SocialButton = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.35);
  }
`;

export const FooterCol = styled.div`
  h4 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 0.95rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: 1rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  ul a {
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.55);
    transition: color 0.15s;
  }

  ul a:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.82rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Copy = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.82rem;
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const Badge = styled.div`
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
`;
