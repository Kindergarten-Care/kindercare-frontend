'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { LinkButton, Responsive } from '@/UIKit';
import { LanguageSwitcher, useTranslation } from '@kindercare/ui';
import { PARENT_PORTAL_HREF } from '@/resources/landingContent';
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
  const { locale, t } = useTranslation();

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((value) => !value), []);

  const handleLocaleChange = useCallback((newLocale: 'vi' | 'en') => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    const newPath = newLocale === 'vi' ? '/' : `/${newLocale}`;
    window.location.href = `${newPath}${hash}`;
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const translatedNavLinks = [
    { href: `#${SECTION_IDS.ENVIRONMENT}`, label: t('Landing.Nav.learningEnvironment') },
    { href: `#${SECTION_IDS.TECHNOLOGY}`, label: t('Landing.Nav.technology') },
    { href: `#${SECTION_IDS.ENROLLMENT}`, label: t('Landing.Nav.enrollment') },
    { href: `#${SECTION_IDS.CONTACT}`, label: t('Landing.Nav.contact') },
  ];

  const translatedMobileNavLinks = [
    { href: `#${SECTION_IDS.ENVIRONMENT}`, label: t('Landing.Nav.mobile.learningEnvironment'), icon: '🌿' },
    { href: `#${SECTION_IDS.TECHNOLOGY}`, label: t('Landing.Nav.technology'), icon: '📱' },
    { href: `#${SECTION_IDS.ENROLLMENT}`, label: t('Landing.Nav.mobile.enrollmentTuition'), icon: '🎒' },
    { href: `#${SECTION_IDS.CONTACT}`, label: t('Landing.Nav.mobile.contactConsultation'), icon: '📞' },
  ];

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
                {translatedNavLinks.map((link) => (
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
                {t('Landing.Nav.parentPortal')}
              </LinkButton>
              <LinkButton href={`#${SECTION_IDS.CONTACT}`} $variant="primary">
                {t('Landing.Nav.requestConsultation')}
              </LinkButton>
              <LanguageSwitcher currentLocale={locale} onLocaleChange={handleLocaleChange} />
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
            {translatedMobileNavLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={closeDrawer}>
                {link.icon ? `${link.icon} ` : ''}
                {link.label}
              </a>
            ))}
          </DrawerLinks>
          <DrawerCta>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
              <LanguageSwitcher currentLocale={locale} onLocaleChange={handleLocaleChange} />
            </div>
            <LinkButton href={PARENT_PORTAL_HREF} $variant="outline" onClick={closeDrawer}>
              {t('Landing.Nav.parentPortal')}
            </LinkButton>
            <LinkButton
              href={`#${SECTION_IDS.CONTACT}`}
              $variant="primary"
              onClick={closeDrawer}
            >
              {t('Landing.Nav.mobile.registerNow')}
            </LinkButton>
          </DrawerCta>
        </NavDrawer>
      </Responsive>
    </>
  );
}
