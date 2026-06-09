import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(90deg, #f8fafc 0%, #ffffff 100%);
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 280px; /* Space for the sidebar */
  width: calc(100% - 280px);
`;

export const PageContent = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  position: relative;
  z-index: 1;
`;
