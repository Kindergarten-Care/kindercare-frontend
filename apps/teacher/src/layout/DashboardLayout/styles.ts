import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: calc(100% - 262px);
  margin-left: 262px;
  overflow: hidden;
  background: #E9F1EC;
  box-sizing: border-box;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 100%;
    margin-left: 0;
  }
`;

export const SidebarOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 9999;
  animation: fadeIn 0.2s ease-out;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: block;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
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
