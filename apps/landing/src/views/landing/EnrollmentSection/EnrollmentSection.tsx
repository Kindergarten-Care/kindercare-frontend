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
  return (
    <EnrollSection id={SECTION_IDS.ENROLLMENT} aria-labelledby="enrollment-title">
      <EnrollInner>
        <SectionInner>
          <EnrollGrid>
            <Reveal>
              <div>
                <SectionLabel>Tuyển sinh 2025–2026</SectionLabel>
                <Divider />
                <SectionTitle id="enrollment-title">
                  Đăng ký ngay để
                  <br />
                  giữ suất cho bé
                </SectionTitle>
                <SectionSubtitle>
                  Số lượng chỗ mỗi lớp có giới hạn — đăng ký sớm để đảm bảo bé được vào lớp phù hợp nhất.
                </SectionSubtitle>

                <Rows>
                  {ENROLLMENT_ROWS.map((row) => (
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
                    Liên hệ để được tư vấn gói học phù hợp và{' '}
                    <strong>ưu đãi sớm dành cho hồ sơ tháng 6</strong>.
                  </span>
                </CtaNote>
              </div>
            </Reveal>

            <Reveal>
              <PricingCards>
                {PRICING_PLANS.map((plan) => (
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
