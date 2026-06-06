import styled from 'styled-components';
import Link from 'next/link';

export const SidebarContainer = styled.aside`
  width: 228px;
  flex-shrink: 0;
  background: var(--surface, #ffffff);
  border-right: 1px solid var(--border, #dde8d9);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
`;

export const SidebarLogo = styled.div`
  padding: 16px 14px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--border, #dde8d9);
`;

export const LogoMark = styled.div`
  width: 36px;
  height: 36px;
  background: var(--accent, #005e2c);
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  flex-shrink: 0;
`;

export const LogoText = styled.div`
  strong {
    display: block;
    font-size: 13px;
    font-weight: 700;
  }
  span {
    font-size: 11px;
    color: var(--muted, #627062);
  }
`;

export const ChildSwitcher = styled.div`
  margin: 10px 8px 6px;
  background: var(--accent-xlight, #f0faf3);
  border: 1px solid var(--accent-light, #dcfce7);
  border-radius: var(--r-md, 12px);
  padding: 10px 11px;
  display: flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  transition: background 0.12s;

  &:hover {
    background: var(--accent-light, #dcfce7);
  }
`;

export const CsAv = styled.div`
  width: 38px;
  height: 38px;
  background: #ffd9b3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.8);
`;

export const CsInfo = styled.div`
  flex: 1;
  min-width: 0;
  strong {
    display: block;
    font-size: 13px;
    font-weight: 700;
  }
  span {
    font-size: 11px;
    color: var(--accent-mid, #0e793c);
    font-weight: 500;
  }
`;

export const CsChevron = styled.span`
  font-size: 10px;
  color: var(--muted, #627062);
  flex-shrink: 0;
`;

export const AbsenceCta = styled.div`
  margin: 4px 8px 6px;
  background: #fff5f5;
  border: 1.5px solid #fca5a5;
  border-radius: var(--r-md, 12px);
  padding: 9px 11px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.14s;

  &:hover {
    background: var(--danger-light, #fee2e2);
  }
`;

export const AbsenceCtaIcon = styled.div`
  width: 30px;
  height: 30px;
  background: var(--danger-light, #fee2e2);
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  flex-shrink: 0;
`;

export const AbsenceCtaText = styled.div`
  strong {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: var(--danger, #b91c1c);
  }
  span {
    font-size: 10px;
    color: #ef4444;
    opacity: 0.7;
  }
`;

export const AbsenceBadge = styled.span`
  margin-left: auto;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: #ef4444;
  padding: 2px 6px;
  border-radius: 10px;
  letter-spacing: 0.04em;
  flex-shrink: 0;
`;

export const NavSection = styled.div`
  padding: 8px 8px 2px;
`;

export const NavLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--muted, #627062);
  padding: 0 8px;
  margin-bottom: 2px;
`;

export const NavItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 9px;
  border-radius: var(--r-sm, 8px);
  font-size: 13px;
  font-weight: ${props => props.$active ? '600' : '500'};
  color: ${props => props.$active ? 'var(--accent, #005e2c)' : 'var(--muted, #627062)'};
  background: ${props => props.$active ? 'var(--accent-light, #dcfce7)' : 'transparent'};
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
  margin-bottom: 1px;
  text-decoration: none;

  &:hover {
    background: ${props => props.$active ? 'var(--accent-light, #dcfce7)' : 'var(--accent-xlight, #f0faf3)'};
    color: ${props => props.$active ? 'var(--accent, #005e2c)' : 'var(--fg, #181d18)'};
  }
`;

export const NavIcon = styled.span`
  font-size: 15px;
  flex-shrink: 0;
  width: 19px;
  text-align: center;
`;

export const NavBadge = styled.span<{ $warn?: boolean }>`
  margin-left: auto;
  background: ${props => props.$warn ? 'var(--warn, #c77b0a)' : 'var(--accent, #005e2c)'};
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 10px;
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding: 10px;
  border-top: 1px solid var(--border, #dde8d9);
`;

export const ParentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px;
  border-radius: var(--r-sm, 8px);
  cursor: pointer;

  &:hover {
    background: var(--accent-xlight, #f0faf3);
  }
`;

export const ParentAv = styled.div`
  width: 32px;
  height: 32px;
  background: var(--accent-light, #dcfce7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

export const ParentInfo = styled.div`
  strong {
    display: block;
    font-size: 12px;
    font-weight: 600;
  }
  span {
    font-size: 11px;
    color: var(--muted, #627062);
  }
`;

export const SettingsBtn = styled.button`
  margin-left: auto;
  width: 26px;
  height: 26px;
  background: none;
  border: 1px solid var(--border, #dde8d9);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  color: var(--muted, #627062);

  &:hover {
    background: var(--accent-xlight, #f0faf3);
  }
`;
