import React from 'react';
import { Reveal, SectionLabel } from '@/UIKit';
import { TECH_CARDS } from '@/resources/landingContent';
import { SECTION_IDS, TECH_CARD_STEP_PX } from '@/config/constants';
import { useTechCarousel } from '@/hooks';
import { useTranslation } from '@kindercare/ui';
import { TechMock } from './mocks';
import {
  CarouselTrack,
  CarouselWrap,
  CenteredDivider,
  ControlButton,
  Controls,
  TechCard,
  TechCardInfo,
  TechCardScreen,
  TechHeader,
  TechInner,
  TechSectionRoot,
  TechSubtitle,
  TechTitle,
} from './styles';

export function TechnologySection(): React.ReactElement {
  const { t } = useTranslation();

  const { trackRef, wrapperRef, offset, move, isAtStart, isAtEnd } = useTechCarousel({
    cardCount: TECH_CARDS.length,
    stepPx: TECH_CARD_STEP_PX,
  });

  const techCards = TECH_CARDS.map((card, index) => ({
    ...card,
    title: t(`Landing.Technology.card${index + 1}.title`),
    description: t(`Landing.Technology.card${index + 1}.description`),
  }));

  return (
    <TechSectionRoot id={SECTION_IDS.TECHNOLOGY} aria-labelledby="technology-title">
      <TechInner>
        <Reveal>
          <TechHeader>
            <SectionLabel className="section-label">
              {t('Landing.Technology.sectionLabel')}
            </SectionLabel>
            <CenteredDivider />
            <TechTitle id="technology-title">
              {t('Landing.Technology.title1')}
              <br />
              {t('Landing.Technology.title2')}
            </TechTitle>
            <TechSubtitle>
              {t('Landing.Technology.subtitle')}
            </TechSubtitle>
          </TechHeader>
        </Reveal>

        <CarouselWrap ref={wrapperRef}>
          <CarouselTrack ref={trackRef} $offset={offset}>
            {techCards.map((card) => (
              <TechCard key={card.id}>
                <TechCardScreen>
                  <TechMock kind={card.mockKind} />
                </TechCardScreen>
                <TechCardInfo>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </TechCardInfo>
              </TechCard>
            ))}
          </CarouselTrack>
        </CarouselWrap>

        <Controls>
          <ControlButton
            type="button"
            aria-label="Previous card"
            onClick={() => move(-1)}
            disabled={isAtStart}
          >
            &#8592;
          </ControlButton>
          <ControlButton
            type="button"
            aria-label="Next card"
            onClick={() => move(1)}
            disabled={isAtEnd}
          >
            &#8594;
          </ControlButton>
        </Controls>
      </TechInner>
    </TechSectionRoot>
  );
}
