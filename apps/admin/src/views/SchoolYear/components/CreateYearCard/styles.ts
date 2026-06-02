import styled from 'styled-components';

export const CreateCardContainer = styled.button`
  background-color: #f7fafc;
  border: 2px dashed #e0e3e5;
  border-radius: 24px;
  min-height: 320px;
  padding: 40px 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;

  &:hover {
    background-color: #f1f4f6;
    border-color: #bfcab9;
  }
`;

export const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 9999px;
  background-color: rgba(0, 100, 148, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: #006494;
`;

export const CreateTitle = styled.h4`
  font-family: 'Lexend', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #181c1e;
  margin: 0 0 8px 0;
  text-align: center;
`;

export const CreateDescription = styled.p`
  font-family: 'Lexend', sans-serif;
  font-size: 14px;
  color: #3f493d;
  text-align: center;
  margin: 0;
  max-width: 200px;
  line-height: 20px;
`;
