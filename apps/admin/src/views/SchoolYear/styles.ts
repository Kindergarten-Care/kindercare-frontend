import styled from 'styled-components';

export const PageWrapper = styled.div`
  position: fixed;
  top: 64px;
  left: 280px;
  width: calc(100vw - 280px);
  height: calc(100vh - 64px);
  background-color: #f7fafc; 
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

export const MainContent = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 40px 32px;
`;

export const PageHeader = styled.div`
  margin-bottom: 32px;
`;

export const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 800; /* ExtraBold */
  font-size: 28px;
  color: #1e293b;
  margin: 0 0 24px 0;
  letter-spacing: -0.5px;
`;

export const TabSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0px; /* Tabs will sit on the border */
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #e6f3f8; /* Light blue */
  color: #006494;
  font-family: 'Lexend', sans-serif;
  font-weight: 500;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 10px;

  &:hover {
    background-color: #d0e7f2;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 32px;
  margin-top: 40px;
`;
