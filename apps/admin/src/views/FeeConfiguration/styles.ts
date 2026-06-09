import styled from 'styled-components';
import { adminTheme } from '@/theme/tokens';

const { feeConfig } = adminTheme.colors;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
  background-image: linear-gradient(90deg, ${feeConfig.iconBg.gray} 0%, ${feeConfig.iconBg.gray} 100%), linear-gradient(90deg, #fff 0%, #fff 100%);
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  gap: 32px;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: ${feeConfig.title.gray};
  margin: 0;
  line-height: 1.2;
`;

export const SubTitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${feeConfig.subtext.gray};
  margin: 0;
  line-height: 1.5;
`;

export const CreateButton = styled.button`
  background-color: ${feeConfig.iconBg.green};
  color: white;
  border: none;
  border-radius: 8px;
  height: 56px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  width: 100%;
`;
