'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { LOGO_URL } from '../Icons';
import {
  HeroSide,
  FloatingOrangeCircle,
  FloatingCyanRing,
  BrandHeader,
  HeroContent,
  BadgeCapsule,
  HeroTitle,
  HeroSubtitle,
  HeroPatternOverlay,
  CloudDecor,
  KidLetter,
  SparkDot,
  TwinkleStar,
} from './styles';

export default function HeroPanel(): React.ReactElement {
  const t = useTranslations('Login');

  return (
    <HeroSide>
      {/* Subtle polka-dot overlay */}
      <HeroPatternOverlay />

      {/* Existing floating shapes */}
      <FloatingOrangeCircle />
      <FloatingCyanRing />

      {/* ── Clouds ── */}
      <CloudDecor $size="14px" $top="5%"  $right="8%"  $opacity="0.15" $speed="9s" />
      <CloudDecor $size="10px" $top="22%" $left="3%"   $opacity="0.10" $speed="12s" $reverse />
      <CloudDecor $size="8px"  $bottom="20%" $right="5%" $opacity="0.09" $speed="7s" />
      <CloudDecor $size="11px" $bottom="38%" $left="2%"  $opacity="0.08" $speed="10s" $reverse />

      {/* ── ABC / 123 letters ── */}
      <KidLetter $top="6%"    $left="5%"   $size="3.8rem" $color="rgba(255,255,255,0.09)"  $speed="11s">A</KidLetter>
      <KidLetter $top="16%"   $right="5%"  $size="2.4rem" $color="rgba(250,204,21,0.18)"   $speed="8s"  $reverse>B</KidLetter>
      <KidLetter $bottom="30%" $right="8%" $size="3rem"   $color="rgba(255,255,255,0.08)"  $speed="13s">C</KidLetter>
      <KidLetter $bottom="14%" $left="6%"  $size="2.2rem" $color="rgba(250,204,21,0.14)"   $speed="10s" $reverse>1</KidLetter>
      <KidLetter $top="52%"   $left="2%"   $size="1.9rem" $color="rgba(255,255,255,0.07)"  $speed="9s">2</KidLetter>
      <KidLetter $bottom="42%" $right="3%" $size="1.7rem" $color="rgba(250,204,21,0.12)"   $speed="7s" $reverse>3</KidLetter>

      {/* ── Twinkling stars ── */}
      <TwinkleStar $top="28%"   $left="22%"  $size="1rem"   $color="rgba(250,204,21,0.6)"   $speed="2.5s" />
      <TwinkleStar $top="43%"   $right="18%" $size="0.75rem" $color="rgba(255,255,255,0.5)" $speed="3.5s" />
      <TwinkleStar $bottom="22%" $left="30%" $size="0.9rem"  $color="rgba(250,204,21,0.5)"  $speed="2s" />
      <TwinkleStar $bottom="45%" $right="12%" $size="1.1rem" $color="rgba(255,255,255,0.4)" $speed="4s" />
      <TwinkleStar $top="68%"   $left="12%"  $size="0.85rem" $color="rgba(250,204,21,0.45)" $speed="3s" />

      {/* ── Sparkle dots ── */}
      <SparkDot $top="20%"    $left="28%"  $size="6px"  $color="rgba(250,204,21,0.55)"   $speed="4s" />
      <SparkDot $top="62%"    $left="18%"  $size="9px"  $color="rgba(255,255,255,0.22)"  $speed="6s" $reverse />
      <SparkDot $top="33%"    $right="22%" $size="5px"  $color="rgba(250,204,21,0.45)"   $speed="5s" />
      <SparkDot $bottom="16%" $right="28%" $size="8px"  $color="rgba(255,255,255,0.18)"  $speed="7s" $reverse />
      <SparkDot $top="76%"    $left="42%"  $size="4px"  $color="rgba(250,204,21,0.35)"   $speed="6s" />
      <SparkDot $top="10%"    $left="45%"  $size="5px"  $color="rgba(255,255,255,0.25)"  $speed="8s" $reverse />
      <SparkDot $bottom="55%" $right="30%" $size="6px"  $color="rgba(250,204,21,0.3)"    $speed="5s" />

      {/* Top brand header */}
      <BrandHeader>
        <img
          src={LOGO_URL}
          alt="KinderCare"
          style={{ height: 54, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
        />
      </BrandHeader>

      {/* Marketing copy */}
      <HeroContent>
        <BadgeCapsule>{t('brandSubtitle')}</BadgeCapsule>
        <HeroTitle dangerouslySetInnerHTML={{ __html: t.raw('leftHeaderHtml') }} />
        <HeroSubtitle>{t('leftDescription')}</HeroSubtitle>
      </HeroContent>
    </HeroSide>
  );
}
