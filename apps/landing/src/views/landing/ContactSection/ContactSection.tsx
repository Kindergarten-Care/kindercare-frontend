import React from 'react';
import {
  Divider,
  Reveal,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@/UIKit';
import { CONTACT_ITEMS } from '@/resources/landingContent';
import { SECTION_IDS } from '@/config/constants';
import { ContactForm } from './ContactForm';
import {
  ContactSectionRoot,
  Grid,
  Inner,
  Item,
  ItemIcon,
  ItemText,
  Items,
  MapPlaceholder,
} from './styles';

export function ContactSection(): React.ReactElement {
  return (
    <ContactSectionRoot id={SECTION_IDS.CONTACT} aria-labelledby="contact-title">
      <Inner>
        <Grid>
          <Reveal>
            <div>
              <SectionLabel>Liên hệ & Tư vấn</SectionLabel>
              <Divider />
              <SectionTitle id="contact-title">
                Hãy để chúng tôi
                <br />
                cùng đồng hành với bé
              </SectionTitle>
              <SectionSubtitle>
                Đội ngũ tư vấn của KinderCare luôn sẵn sàng giải đáp mọi thắc mắc và sắp xếp buổi tham quan
                trường cho gia đình bạn.
              </SectionSubtitle>

              <Items style={{ marginTop: '2rem' }}>
                {CONTACT_ITEMS.map((item) => (
                  <Item key={item.label}>
                    <ItemIcon>{item.icon}</ItemIcon>
                    <ItemText>
                      <strong>{item.label}</strong>
                      <span>{item.value}</span>
                    </ItemText>
                  </Item>
                ))}
              </Items>

              <MapPlaceholder>
                <span>🗺️</span> Bản đồ đường đến trường
              </MapPlaceholder>
            </div>
          </Reveal>

          <Reveal>
            <ContactForm />
          </Reveal>
        </Grid>
      </Inner>
    </ContactSectionRoot>
  );
}
