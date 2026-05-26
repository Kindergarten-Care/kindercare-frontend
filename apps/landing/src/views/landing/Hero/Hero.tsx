'use client';

import React from 'react';
import { LinkButton, Responsive } from '@/UIKit';
import { HeroLeaf } from '@/svgs';
import { HERO_SLIDES } from '@/resources/landingContent';
import { HERO_AUTOPLAY_MS, SECTION_IDS } from '@/config/constants';
import { useHeroSlider } from '@/hooks';
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
  SlidesWrap,
  Title,
} from './styles';

export function Hero(): React.ReactElement {
  const { current, goTo, next, prev, progressKey } = useHeroSlider({
    total: HERO_SLIDES.length,
    autoplayMs: HERO_AUTOPLAY_MS,
  });

  return (
    <HeroSection id={SECTION_IDS.HERO} aria-label="KinderCare kindergarten introduction">
      <SlidesWrap>
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === current;
          return (
            <Slide
              key={`${slide.variant}-${index}`}
              $variant={slide.variant}
              $active={isActive}
              aria-hidden={!isActive}
            >
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
        {HERO_SLIDES.map((_, index) => (
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
