import React from 'react';
import {
  Divider,
  LinkButton,
  Reveal,
  SectionInner,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@/UIKit';
import { ENROLLMENT_ROWS, PRICING_PLANS } from '@/resources/landingContent';
import { SECTION_IDS } from '@/config/constants';
import { useTranslation } from '@kindercare/ui';
import {
  CtaNote,
  EnrollGrid,
  EnrollInner,
  EnrollSection,
  Features,
  PricingBadge,
  PricingCard,
  PricingCards,
  PricingCtaWrap,
  PricingDesc,
  PricingHeader,
  PricingName,
  PricingTag,
  Row,
  RowIcon,
  RowText,
  Rows,
} from './styles';

export function EnrollmentSection(): React.ReactElement {
  const { t } = useTranslation();

  const enrollmentRows = ENROLLMENT_ROWS.map((row, index) => ({
    ...row,
    title: t(`Landing.Enrollment.row${index + 1}.title`),
    description: t(`Landing.Enrollment.row${index + 1}.description`),
  }));

  const pricingPlans = PRICING_PLANS.map((plan, index) => {
    const pIndex = index + 1;
    const planFeatures = plan.features.map((_, fIndex) =>
      t(`Landing.Pricing.plan${pIndex}.feature${fIndex + 1}`)
    );
    return {
      ...plan,
      name: t(`Landing.Pricing.plan${pIndex}.name`),
      tag: t(`Landing.Pricing.plan${pIndex}.tag`),
      description: t(`Landing.Pricing.plan${pIndex}.description`),
      features: planFeatures,
      ctaLabel: t(`Landing.Pricing.plan${pIndex}.ctaLabel`),
      badge: plan.badge ? t(`Landing.Pricing.plan${pIndex}.badge`) : undefined,
    };
  });

  return (
    <EnrollSection id={SECTION_IDS.ENROLLMENT} aria-labelledby="enrollment-title">
      <EnrollInner>
        <SectionInner>
          <EnrollGrid>
            <Reveal>
              <div>
                <SectionLabel>{t('Landing.Enrollment.sectionLabel')}</SectionLabel>
                <Divider />
                <SectionTitle id="enrollment-title">
                  {t('Landing.Enrollment.title1')}
                  <br />
                  {t('Landing.Enrollment.title2')}
                </SectionTitle>
                <SectionSubtitle>
                  {t('Landing.Enrollment.subtitle')}
                </SectionSubtitle>

                <Rows>
                  {enrollmentRows.map((row) => (
                    <Row key={row.title}>
                      <RowIcon>{row.icon}</RowIcon>
                      <RowText>
                        <strong>{row.title}</strong>
                        <span>{row.description}</span>
                      </RowText>
                    </Row>
                  ))}
                </Rows>

                <CtaNote>
                  <span>💡</span>
                  <span>
                    {t('Landing.Enrollment.ctaNoteText1')}{' '}
                    <strong>{t('Landing.Enrollment.ctaNoteText2')}</strong>.
                  </span>
                </CtaNote>
              </div>
            </Reveal>

            <Reveal>
              <PricingCards>
                {pricingPlans.map((plan) => (
                  <PricingCard key={plan.name} $featured={plan.featured}>
                    {plan.badge && <PricingBadge>{plan.badge}</PricingBadge>}
                    <PricingHeader>
                      <PricingName>{plan.name}</PricingName>
                      <PricingTag $featured={plan.featured}>{plan.tag}</PricingTag>
                    </PricingHeader>
                    <PricingDesc>{plan.description}</PricingDesc>
                    <Features>
                      {plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </Features>
                    <PricingCtaWrap>
                      <LinkButton
                        href={plan.ctaHref}
                        $variant={plan.featured ? 'primary' : 'outline'}
                        $fullWidth
                      >
                        {plan.ctaLabel}
                      </LinkButton>
                    </PricingCtaWrap>
                  </PricingCard>
                ))}
              </PricingCards>
            </Reveal>
          </EnrollGrid>
        </SectionInner>
      </EnrollInner>
    </EnrollSection>
  );
}
