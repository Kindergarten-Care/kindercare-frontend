'use client';

import styled, { css } from 'styled-components';

export const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 900;
  height: ${({ theme }) => theme.layout.navHeight};
  background: rgba(250, 248, 244, 0.88);
  backdrop-filter: blur(14px) saturate(1.4);
  -webkit-backdrop-filter: blur(14px) saturate(1.4);
  border-bottom: 1px solid rgba(228, 224, 216, 0.7);
  transition: box-shadow 0.3s;
  ${({ $scrolled }) =>
    $scrolled &&
    css`
      box-shadow: 0 2px 20px rgba(30, 50, 28, 0.1);
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: ${({ theme }) => theme.layout.navHeightMobile};
  }
`;

export const NavInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0 1.5rem;
`;

export const NavLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-shrink: 0;
`;

export const NavLogoText = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.green};
  letter-spacing: -0.01em;
`;

export const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin: 0 auto;

  a {
    padding: 0.45rem 0.85rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.muted};
    transition: color 0.15s, background 0.15s;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.green};
    background: ${({ theme }) => theme.colors.greenXLight};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const NavCta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const Hamburger = styled.button<{ $open: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-left: auto;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.greenXLight};
  }

  span {
    display: block;
    height: 2px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.fg};
    transition: all 0.25s;
    width: 22px;
    margin: 0 auto;
  }

  ${({ $open }) =>
    $open &&
    css`
      span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
  }
`;

export const NavOverlay = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  position: fixed;
  inset: 0;
  z-index: 940;
  background: rgba(0, 0, 0, 0.35);
`;

export const NavDrawer = styled.aside<{ $open: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  z-index: 950;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: -8px 0 40px rgba(30, 50, 28, 0.15);
  padding: 1.5rem;
  flex-direction: column;
  gap: 1rem;
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
  }
`;

export const DrawerClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.3rem;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.greenXLight};
    color: ${({ theme }) => theme.colors.green};
  }
`;

export const DrawerLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 3rem;

  a {
    display: block;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.fg};
    transition: background 0.15s;
  }

  a:hover {
    background: ${({ theme }) => theme.colors.greenXLight};
    color: ${({ theme }) => theme.colors.green};
  }
`;

export const DrawerCta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 1rem;
`;
