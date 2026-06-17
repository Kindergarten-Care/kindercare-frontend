import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: calc(100% - 280px);
  margin-left: 280px;
  overflow: hidden;
  background: linear-gradient(90deg, #f8fafc 0%, #ffffff 100%);
  box-sizing: border-box;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 0; /* Prevents flex child from overflowing */
`;

export const PageContent = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative; 
  z-index: 1;
  min-width: 0;
`;
