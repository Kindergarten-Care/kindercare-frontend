'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { LinkButton, Responsive } from '@/UIKit';
import { MOBILE_NAV_LINKS, NAV_LINKS, PARENT_PORTAL_HREF } from '@/resources/landingContent';
import { SECTION_IDS } from '@/config/constants';
import { useNavScroll } from '@/hooks';
import {
  DrawerClose,
  DrawerCta,
  DrawerHeader,
  DrawerLinks,
  Hamburger,
  Nav,
  NavCta,
  NavDrawer,
  NavInner,
  NavLinks,
  NavLogo,
  NavOverlay,
} from './styles';

export function Navbar(): React.ReactElement {
  const scrolled = useNavScroll();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((value) => !value), []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <>
      <Nav $scrolled={scrolled} aria-label="Primary navigation">
        <NavInner>
          <NavLogo href="#">
            <Image
              src="https://media.kindercare.app/KinderCare%20Logo/KinderCare_LogoTextHorizontal.png"
              alt="KinderCare logo"
              width={120}
              height={44}
              priority
              unoptimized
              style={{
                objectFit: 'contain',
                width: 'auto',
                height: '44px',
                marginTop: '0px',
                marginBottom: '0px',
              }}
            />
          </NavLogo>

          <Responsive from="lg" display="contents">
            <nav aria-label="Main menu">
              <NavLinks>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </NavLinks>
            </nav>
          </Responsive>

          <Responsive from="lg" display="contents">
            <NavCta>
              <LinkButton href={PARENT_PORTAL_HREF} $variant="outline">
                Đăng nhập phụ huynh
              </LinkButton>
              <LinkButton href={`#${SECTION_IDS.CONTACT}`} $variant="primary">
                Đăng ký tư vấn
              </LinkButton>
            </NavCta>
          </Responsive>

          <Responsive to="lg" display="contents">
            <Hamburger
              type="button"
              aria-label="Toggle navigation drawer"
              aria-expanded={drawerOpen}
              $open={drawerOpen}
              onClick={toggleDrawer}
            >
              <span />
              <span />
              <span />
            </Hamburger>
          </Responsive>
        </NavInner>
      </Nav>

      <NavOverlay $open={drawerOpen} onClick={closeDrawer} />
      
      <Responsive to="lg" display="contents">
        <NavDrawer $open={drawerOpen} aria-hidden={!drawerOpen} aria-label="Mobile navigation">
          <DrawerClose type="button" aria-label="Close navigation drawer" onClick={closeDrawer}>
            ✕
          </DrawerClose>
          <DrawerHeader>
            <Image
              src="https://media.kindercare.app/KinderCare%20Logo/KinderCare_LogoTextHorizontal.png"
              alt="KinderCare logo"
              width={100}
              height={36}
              unoptimized
              style={{
                objectFit: 'contain',
                width: 'auto',
                height: '36px',
                marginTop: '0px',
                marginBottom: '0px',
              }}
            />
          </DrawerHeader>
          <DrawerLinks aria-label="Mobile navigation links">
            {MOBILE_NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={closeDrawer}>
                {link.icon ? `${link.icon} ` : ''}
                {link.label}
              </a>
            ))}
          </DrawerLinks>
          <DrawerCta>
            <LinkButton href={PARENT_PORTAL_HREF} $variant="outline" onClick={closeDrawer}>
              Đăng nhập phụ huynh
            </LinkButton>
            <LinkButton
              href={`#${SECTION_IDS.CONTACT}`}
              $variant="primary"
              onClick={closeDrawer}
            >
              Đăng ký tư vấn ngay
            </LinkButton>
          </DrawerCta>
        </NavDrawer>
      </Responsive>
    </>
  );
}
