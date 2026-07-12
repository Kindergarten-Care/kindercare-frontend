'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { LOGO_URL } from '../Icons';
import {
  MobileHeroBanner,
  MobileBannerTopRow,
  MobileHeroTitle,
  BadgeCapsule,
  SparkDot,
  TwinkleStar,
} from './styles';

export default function MobileHeroBannerPanel(): React.ReactElement {
  const t = useTranslations('Login');

  return (
    <MobileHeroBanner>
      {/* Minimal decorations */}
      <SparkDot $top="18%" $right="8%"   $size="5px" $color="rgba(250,204,21,0.55)" $speed="4s" />
      <SparkDot $bottom="20%" $right="18%" $size="4px" $color="rgba(255,255,255,0.4)" $speed="6s" $reverse />
      <TwinkleStar $top="15%"    $right="20%" $size="0.75rem" $color="rgba(250,204,21,0.6)"   $speed="2.5s" />
      <TwinkleStar $bottom="22%" $right="6%"  $size="0.7rem"  $color="rgba(255,255,255,0.45)" $speed="3.5s" />

      {/* Row 1: logo + badge */}
      <MobileBannerTopRow>
        <img
          src={LOGO_URL}
          alt="KinderCare"
          style={{
            height: 34,
            width: 'auto',
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
            position: 'relative',
            zIndex: 2,
          }}
        />
        <BadgeCapsule style={{ zIndex: 2, margin: 0 }}>
          {t('brandSubtitle')}
        </BadgeCapsule>
      </MobileBannerTopRow>

      {/* Row 2: tagline */}
      <MobileHeroTitle
        dangerouslySetInnerHTML={{ __html: t.raw('leftHeaderHtml') }}
      />
    </MobileHeroBanner>
  );
}
