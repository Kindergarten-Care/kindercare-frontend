import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};
  z-index: 100;
  display: flex;
  justify-content: center;
  padding: 16px 48px;

  @media (max-width: 768px) {
    padding: 16px 24px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoSection = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
`;

const LogoText = styled.span`
  font-size: 24px;
  font-weight: 900;
  color: ${props => props.theme.colors.primary};
  letter-spacing: -0.025em;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 24px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.textGray};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    font-weight: 700;
  }
`;

const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RegisterButton = styled.a`
  padding: 12px 24px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.bgWhite};
  font-weight: 700;
  font-size: 14px;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${props => props.theme.colors.accentDarkGreen};
    transform: translateY(-1px);
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const LoginButton = styled.a`
  padding: 12px 24px;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  font-weight: 700;
  font-size: 14px;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.bgWhite};
    transform: translateY(-1px);
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Container>
        <LogoSection href="#hero">
          <Image
            src="/images/logo.png"
            alt="KinderCare Logo"
            width={32}
            height={32}
            style={{ objectFit: 'contain' }}
          />
          <LogoText>KinderCare</LogoText>
        </LogoSection>

        <NavLinks>
          <NavLink href="#hero" className="active">Trang chủ</NavLink>
          <NavLink href="#environment">Môi trường</NavLink>
          <NavLink href="#technology">Công nghệ</NavLink>
          <NavLink href="#enrollment">Tuyển sinh</NavLink>
          <NavLink href="#contact">Liên hệ</NavLink>
        </NavLinks>

        <ActionsSection>
          <LoginButton href="/login">Phụ huynh Đăng nhập</LoginButton>
          <RegisterButton href="#contact">Đăng ký tư vấn</RegisterButton>
        </ActionsSection>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
