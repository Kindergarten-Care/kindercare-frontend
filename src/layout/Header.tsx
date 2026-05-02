import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Login from '@/views/Login';

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
  cursor: pointer;
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
  transition: all 0.3s ease;
  position: relative;
  padding-bottom: 6px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    font-weight: 700;
    
    &::after {
      width: 100%;
    }
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
  cursor: pointer;

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
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ['hero', 'environment', 'technology', 'enrollment', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
          setActiveSection('contact');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveSection(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <HeaderWrapper>
        <Container>
          <LogoSection onClick={(e) => handleNavClick(e, 'hero')}>
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
            <NavLink 
              className={activeSection === 'hero' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'hero')}
            >
              Trang chủ
            </NavLink>
            <NavLink 
              className={activeSection === 'environment' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'environment')}
            >
              Môi trường
            </NavLink>
            <NavLink 
              className={activeSection === 'technology' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'technology')}
            >
              Công nghệ
            </NavLink>
            <NavLink 
              className={activeSection === 'enrollment' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'enrollment')}
            >
              Tuyển sinh
            </NavLink>
            <NavLink 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Liên hệ
            </NavLink>
          </NavLinks>

          <ActionsSection>
            <LoginButton onClick={() => setIsLoginOpen(true)} style={{ cursor: 'pointer' }}>
              Phụ huynh Đăng nhập
            </LoginButton>
            <RegisterButton 
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Đăng ký tư vấn
            </RegisterButton>
          </ActionsSection>
        </Container>
      </HeaderWrapper>
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;

