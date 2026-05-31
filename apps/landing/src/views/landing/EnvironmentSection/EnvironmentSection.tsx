import React from 'react';
import Image from 'next/image';
import {
  Divider,
  LinkButton,
  Reveal,
  Section,
  SectionInner,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@/UIKit';
import { ENV_CARDS, ENV_CHECKLIST } from '@/resources/landingContent';
import { SECTION_IDS } from '@/config/constants';
import { useTranslation } from '@kindercare/ui';
import {
  AwardBadge,
  BadgeIcon,
  BadgeSub,
  BadgeTitle,
  Checklist,
  CtaWrap,
  EnvCard,
  EnvCardIcon,
  EnvCardText,
  EnvCardTitle,
  EnvCards,
  EnvImageWrap,
  EnvIntro,
  EnvText,
} from './styles';

export function EnvironmentSection(): React.ReactElement {
  const { t } = useTranslation();

  const checklist = ENV_CHECKLIST.map((_, index) => t(`Landing.Environment.checklist${index + 1}`));
  const envCards = ENV_CARDS.map((card, index) => ({
    ...card,
    title: t(`Landing.Environment.card${index + 1}.title`),
    description: t(`Landing.Environment.card${index + 1}.description`),
  }));

  return (
    <Section id={SECTION_IDS.ENVIRONMENT} aria-labelledby="environment-title">
      <SectionInner>
        <EnvIntro>
          <Reveal>
            <EnvText>
              <SectionLabel>{t('Landing.Environment.sectionLabel')}</SectionLabel>
              <Divider />
              <SectionTitle id="environment-title">
                {t('Landing.Environment.title1')}
                <br />
                {t('Landing.Environment.title2')}
              </SectionTitle>
              <SectionSubtitle>
                {t('Landing.Environment.subtitle')}
              </SectionSubtitle>
              <Checklist>
                {checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </Checklist>
              <CtaWrap>
                <LinkButton href={`#${SECTION_IDS.ENROLLMENT}`} $variant="primary">
                  {t('Landing.Environment.ctaVisit')}
                </LinkButton>
              </CtaWrap>
            </EnvText>
          </Reveal>

          <Reveal>
            <EnvImageWrap>
              <Image
                src="/campus.png"
                alt={t('Landing.Meta.campusAlt')}
                width={800}
                height={600}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '16px',
                }}
              />
              <AwardBadge>
                <BadgeIcon>🏆</BadgeIcon>
                <div>
                  <BadgeTitle>{t('Landing.Environment.badgeTitle')}</BadgeTitle>
                  <BadgeSub>
                    {t('Landing.Environment.badgeSub')}
                  </BadgeSub>
                </div>
              </AwardBadge>
            </EnvImageWrap>
          </Reveal>
        </EnvIntro>

        <EnvCards>
          {envCards.map((card) => (
            <Reveal key={card.title}>
              <EnvCard>
                <EnvCardIcon>{card.icon}</EnvCardIcon>
                <EnvCardTitle>{card.title}</EnvCardTitle>
                <EnvCardText>{card.description}</EnvCardText>
              </EnvCard>
            </Reveal>
          ))}
        </EnvCards>
      </SectionInner>
    </Section>
  );
}
