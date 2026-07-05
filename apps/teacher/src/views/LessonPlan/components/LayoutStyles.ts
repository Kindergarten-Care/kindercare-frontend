import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  background: #E9F1EC;
`;

export const MainContent = styled.main<{ $collapsed?: boolean }>`
  margin-left: ${({ $collapsed }) => ($collapsed ? '88px' : '262px')};
  padding: 24px 32px 44px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 100vh;
  transition: margin-left 0.2s ease;

  @media (max-width: 1080px) {
    overflow-x: auto;
  }

  @media (max-width: 760px) {
    margin-left: 0;
    padding: 16px;
  }
`;
