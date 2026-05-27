import React from 'react';
import Image from 'next/image';
import { FacebookIcon, ZaloIcon, YoutubeIcon, TiktokIcon } from '@/svgs';
import {
  FOOTER_BADGES,
  FOOTER_COLUMNS,
  FOOTER_TAGLINE,
} from '@/resources/landingContent';
import {
  Badge,
  BadgeRow,
  BrandHeader,
  BrandTagline,
  Copy,
  FooterBottom,
  FooterBrand,
  FooterCol,
  FooterGrid,
  FooterInner,
  FooterRoot,
  SocialButton,
  SocialRow,
} from './styles';

export function Footer(): React.ReactElement {
  return (
    <FooterRoot>
      <FooterInner>
        <FooterGrid>
          <FooterBrand>
            <BrandHeader>
              <Image
                src="https://media.kindercare.app/KinderCare%20Logo/KinderCare_LogoTextHorizontal.png"
                alt="KinderCare logo"
                width={120}
                height={44}
                unoptimized
                style={{
                  objectFit: 'contain',
                  width: 'auto',
                  height: '44px',
                  marginTop: '0px',
                  marginBottom: '0px',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </BrandHeader>
            <BrandTagline>{FOOTER_TAGLINE}</BrandTagline>
            <SocialRow>
              <SocialButton href="#" aria-label="Facebook">
                <FacebookIcon />
              </SocialButton>
              <SocialButton href="#" aria-label="Zalo">
                <ZaloIcon />
              </SocialButton>
              <SocialButton href="#" aria-label="YouTube">
                <YoutubeIcon />
              </SocialButton>
              <SocialButton href="#" aria-label="TikTok">
                <TiktokIcon />
              </SocialButton>
            </SocialRow>
          </FooterBrand>

          {FOOTER_COLUMNS.map((column) => (
            <FooterCol key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </FooterCol>
          ))}
        </FooterGrid>

        <FooterBottom>
          <Copy>© 2025 KinderCare Education. Tất cả quyền được bảo lưu.</Copy>
          <BadgeRow>
            {FOOTER_BADGES.map((badge) => (
              <Badge key={badge.label}>{badge.label}</Badge>
            ))}
          </BadgeRow>
        </FooterBottom>
      </FooterInner>
    </FooterRoot>
  );
}
