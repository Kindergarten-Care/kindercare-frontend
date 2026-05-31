'use client';

import React from 'react';
import Image from 'next/image';
import { LinkButton, Responsive } from '@/UIKit';
import { HeroLeaf } from '@/svgs';
import { HERO_SLIDES } from '@/resources/landingContent';
import { HERO_AUTOPLAY_MS, SECTION_IDS } from '@/config/constants';
import { useHeroSlider } from '@/hooks';
import { useTranslation } from '@kindercare/ui';
import {
  Actions,
  ArrowNext,
  ArrowPrev,
  Description,
  Dot,
  Dots,
  Eyebrow,
  HeroSection,
  LeafWrap,
  ProgressBar,
  Slide,
  SlideContent,
  SlideOverlay,
  SlidesWrap,
  Title,
  variantImages,
} from './styles';

export function Hero(): React.ReactElement {
  const { t } = useTranslation();
  const heroSlides = HERO_SLIDES.map((slide, index) => ({
    ...slide,
    eyebrow: t(`Landing.Hero.slide${index + 1}.eyebrow`),
    titleLineOne: t(`Landing.Hero.slide${index + 1}.title1`),
    titleLineTwo: t(`Landing.Hero.slide${index + 1}.title2`),
    description: t(`Landing.Hero.slide${index + 1}.description`),
    primaryCta: {
      ...slide.primaryCta,
      label: t(`Landing.Hero.slide${index + 1}.primaryCta`),
    },
    secondaryCta: {
      ...slide.secondaryCta,
      label: t(`Landing.Hero.slide${index + 1}.secondaryCta`),
    },
  }));

  const { current, goTo, next, prev, progressKey } = useHeroSlider({
    total: heroSlides.length,
    autoplayMs: HERO_AUTOPLAY_MS,
  });

  return (
    <HeroSection id={SECTION_IDS.HERO} aria-label="KinderCare kindergarten introduction">
      <SlidesWrap>
        {heroSlides.map((slide, index) => {
          const isActive = index === current;
          return (
            <Slide
              key={`${slide.variant}-${index}`}
              $variant={slide.variant}
              $active={isActive}
              aria-hidden={!isActive}
            >
              <Image
                src={variantImages[slide.variant]}
                alt=""
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <SlideOverlay />
              <SlideContent>
                <Eyebrow>{slide.eyebrow}</Eyebrow>
                <Title>
                  {slide.titleLineOne}
                  <br />
                  {slide.titleLineTwo}
                </Title>
                <Description>{slide.description}</Description>
                <Actions>
                  <LinkButton
                    href={slide.primaryCta.href}
                    $variant={slide.primaryCta.tone === 'amber' ? 'amber' : 'primary'}
                    $size="lg"
                  >
                    {slide.primaryCta.label}
                  </LinkButton>
                  <LinkButton href={slide.secondaryCta.href} $variant="ghost" $size="lg">
                    {slide.secondaryCta.label}
                  </LinkButton>
                </Actions>
              </SlideContent>
              {slide.variant === 'forest' && (
                <LeafWrap>
                  <HeroLeaf size={260} />
                </LeafWrap>
              )}
            </Slide>
          );
        })}
      </SlidesWrap>

      <Responsive from="md" display="contents">
        <ArrowPrev type="button" onClick={prev} aria-label="Previous slide">
          &#8592;
        </ArrowPrev>
        <ArrowNext type="button" onClick={next} aria-label="Next slide">
          &#8594;
        </ArrowNext>
      </Responsive>

      <Dots>
        {heroSlides.map((_, index) => (
          <Dot
            key={index}
            type="button"
            $active={index === current}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </Dots>

      <ProgressBar key={progressKey} $duration={HERO_AUTOPLAY_MS} />
    </HeroSection>
  );
}
