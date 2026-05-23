import React from 'react';
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
import { EnvIllustration } from '@/svgs';
import { ENV_CARDS, ENV_CHECKLIST } from '@/resources/landingContent';
import { SECTION_IDS } from '@/config/constants';
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
  EnvImagePlaceholder,
  EnvImageWrap,
  EnvIntro,
  EnvText,
} from './styles';

export function EnvironmentSection(): React.ReactElement {
  return (
    <Section id={SECTION_IDS.ENVIRONMENT} aria-labelledby="environment-title">
      <SectionInner>
        <EnvIntro>
          <Reveal>
            <EnvText>
              <SectionLabel>Môi trường học tập</SectionLabel>
              <Divider />
              <SectionTitle id="environment-title">
                Không gian được thiết kế
                <br />
                cho từng giai đoạn phát triển
              </SectionTitle>
              <SectionSubtitle>
                Mỗi góc nhỏ tại KinderCare đều được cân nhắc kỹ lưỡng — từ ánh sáng, màu sắc đến từng vật liệu
                tiếp xúc với trẻ.
              </SectionSubtitle>
              <Checklist>
                {ENV_CHECKLIST.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </Checklist>
              <CtaWrap>
                <LinkButton href={`#${SECTION_IDS.ENROLLMENT}`} $variant="primary">
                  Đăng ký tham quan trường
                </LinkButton>
              </CtaWrap>
            </EnvText>
          </Reveal>

          <Reveal>
            <EnvImageWrap>
              <EnvImagePlaceholder>
                <EnvIllustration />
                <p>Ảnh khuôn viên trường sẽ được cập nhật</p>
              </EnvImagePlaceholder>
              <AwardBadge>
                <BadgeIcon>🏆</BadgeIcon>
                <div>
                  <BadgeTitle>Top trường mầm non 2024</BadgeTitle>
                  <BadgeSub>Hiệp hội Giáo dục Mầm non VN</BadgeSub>
                </div>
              </AwardBadge>
            </EnvImageWrap>
          </Reveal>
        </EnvIntro>

        <EnvCards>
          {ENV_CARDS.map((card) => (
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
