import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  font-family: inherit;
  color: ${props => props.theme.colors.fg || props.theme.colors.text || '#1F2937'};
`;

export const Header = styled.section`
  background: linear-gradient(120deg, #005A36 0%, #00794A 60%, #0A8A57 100%);
  color: #fff;
  padding: 24px 28px;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
`;

export const HeaderTitle = styled.h1`
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 6px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const HeaderSubtitle = styled.p`
  font-size: 13px;
  opacity: 0.9;
  margin: 0;
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 16px;
  position: sticky;
  top: 16px;

  @media (max-width: 900px) {
    position: static;
    top: auto;
  }
`;

export const SidebarTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg || props.theme.colors.text};
`;

export const StudentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 52vh;
  overflow-y: auto;
  padding-right: 4px;

  /* Custom Scrollbar for modern look */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 99px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #94A3B8;
  }

  @media (max-width: 900px) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    max-height: none;
    padding-bottom: 8px;
    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #CBD5E1;
      border-radius: 99px;
    }
  }
`;

export const StudentItem = styled.button<{ $active?: boolean; $accent?: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid ${p => (p.$active ? p.theme.colors.green || '#15803d' : 'transparent')};
  background: ${p => (p.$active ? p.theme.colors.greenLight || '#f0fdf4' : 'transparent')};
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: 13px;
  font-weight: ${p => (p.$active ? 700 : 500)};
  color: ${p => (p.$active ? p.theme.colors.greenDark || '#166534' : p.theme.colors.fg || '#1e293b')};
  transition: background 0.15s ease, transform 0.15s ease;
  position: relative;
  outline: none;

  &:hover {
    background: ${p => (p.$active ? p.theme.colors.greenXLight || '#dcfce7' : '#F1F5F9')};
    transform: translateX(2px);
  }

  @media (max-width: 900px) {
    flex-shrink: 0;
    min-width: 140px;
    max-width: 160px;
    transform: none;
    &:hover {
      transform: none;
    }
  }
`;

export const Badge = styled.span`
  background: #DCFCE7;
  color: #166534;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 6px;
  border-radius: 8px;
  margin-left: auto;
`;

export const FilterBtn = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 6px 0;
  border-radius: 8px;
  border: 1px solid ${p => p.$active ? p.theme.colors.primary || '#005A36' : '#E2E8F0'};
  background: ${p => p.$active ? `${p.theme.colors.primary || '#005A36'}15` : '#F8FAFC'};
  color: ${p => p.$active ? p.theme.colors.primary || '#005A36' : '#64748B'};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const ChartCard = styled.section`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 18px 20px;
`;

export const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ChartTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const EmptyState = styled.div`
  padding: 24px;
  text-align: center;
  color: ${props => props.theme.colors.muted || '#64748B'};
  font-size: 13px;
`;

export const Spinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px;
  color: ${props => props.theme.colors.muted || '#64748B'};
  font-size: 13px;
`;

export const Toast = styled.div<{ $type: 'success' | 'error' }>`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: ${p => (p.$type === 'success' ? '#046E1E' : '#DC2626')};
  color: #fff;
  padding: 12px 18px;
  border-radius: 14px;
  font-size: 13px;
  box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.25);
  z-index: 50;
`;
