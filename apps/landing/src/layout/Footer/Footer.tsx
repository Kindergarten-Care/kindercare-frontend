import React from 'react';
import Image from 'next/image';
import { FacebookIcon, ZaloIcon, YoutubeIcon, TiktokIcon } from '@/svgs';
import {
  FOOTER_BADGES,
  FOOTER_COLUMNS,
} from '@/resources/landingContent';
import { useTranslation } from '@kindercare/ui';
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
  const { t } = useTranslation();

  const footerTagline = t('Landing.Footer.tagline');
  
  const footerBadges = FOOTER_BADGES.map((badge, index) => ({
    ...badge,
    label: t(`Landing.Footer.badge${index + 1}`),
  }));

  const footerColumns = FOOTER_COLUMNS.map((column, cIndex) => {
    const colNum = cIndex + 1;
    const links = column.links.map((link, lIndex) => ({
      ...link,
      label: t(`Landing.Footer.col${colNum}.link${lIndex + 1}`),
    }));
    return {
      title: t(`Landing.Footer.col${colNum}.title`),
      links,
    };
  });

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
            <BrandTagline>{footerTagline}</BrandTagline>
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

          {footerColumns.map((column) => (
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
          <Copy>
            {t('Landing.Footer.copyright')}
          </Copy>
          <BadgeRow>
            {footerBadges.map((badge) => (
              <Badge key={badge.label}>{badge.label}</Badge>
            ))}
          </BadgeRow>
        </FooterBottom>
      </FooterInner>
    </FooterRoot>
  );
}
