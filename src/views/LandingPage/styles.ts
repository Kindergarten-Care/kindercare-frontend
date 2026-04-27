import styled from 'styled-components';

export const MainContainer = styled.main`
  background-color: ${props => props.theme.colors.bgLight};
  color: ${props => props.theme.colors.textDark};
  font-family: ${props => props.theme.fonts.main};
  overflow-x: hidden;
`;

export const Section = styled.section<{ $bg?: string }>`
  padding: 80px 48px;
  background-color: ${props => props.$bg || props.theme.colors.bgWhite};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SectionHeading = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 8px;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  color: ${props => props.theme.colors.textDark};
  margin-bottom: 16px;
  text-align: center;
  line-height: 1.25;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const SectionDescription = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.textGray};
  text-align: center;
  max-width: 660px;
  line-height: 1.5;
  margin-bottom: 48px;
`;
