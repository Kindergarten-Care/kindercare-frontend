import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.colors.bgWhite};
  border-top: 1px solid ${props => props.theme.colors.borderLight};
  padding: 64px 48px 32px;
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    padding: 48px 24px 32px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoText = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const Copyright = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.textGray};
`;

const LinksSection = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FooterLink = styled.a`
  font-size: 14px;
  color: ${props => props.theme.colors.textGray};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <Container>
        <BrandSection>
          <LogoSection>
            <Image
              src="/images/logo.png"
              alt="KinderCare Logo"
              width={32}
              height={32}
            />
            <LogoText>KinderCare</LogoText>
          </LogoSection>
          <Copyright>
            © 2024 KinderCare Preschool. Nurturing with love and technology.
          </Copyright>
        </BrandSection>

        <LinksSection>
          <FooterLink href="#">Chính sách bảo mật</FooterLink>
          <FooterLink href="#">Điều khoản sử dụng</FooterLink>
          <FooterLink href="#">Tuyển dụng</FooterLink>
          <FooterLink href="#">Liên hệ hợp tác</FooterLink>
        </LinksSection>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
