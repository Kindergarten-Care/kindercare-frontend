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
import { useTranslation } from '@kindercare/ui';
import { ContactForm } from './ContactForm';
import {
  ContactSectionRoot,
  Grid,
  Inner,
  Item,
  ItemIcon,
  ItemText,
  Items,
  MapContainer,
} from './styles';

export function ContactSection(): React.ReactElement {
  const { t } = useTranslation();

  const contactItems = CONTACT_ITEMS.map((item, index) => ({
    ...item,
    label: t(`Landing.Contact.item${index + 1}.label`),
    value: t(`Landing.Contact.item${index + 1}.value`),
  }));

  return (
    <ContactSectionRoot id={SECTION_IDS.CONTACT} aria-labelledby="contact-title">
      <Inner>
        <Grid>
          <Reveal>
            <div>
              <SectionLabel>{t('Landing.Contact.sectionLabel')}</SectionLabel>
              <Divider />
              <SectionTitle id="contact-title">
                {t('Landing.Contact.title1')}
                <br />
                {t('Landing.Contact.title2')}
              </SectionTitle>
              <SectionSubtitle>
                {t('Landing.Contact.subtitle')}
              </SectionSubtitle>

              <Items style={{ marginTop: '2rem' }}>
                {contactItems.map((item) => (
                  <Item key={item.label}>
                    <ItemIcon>{item.icon}</ItemIcon>
                    <ItemText>
                      <strong>{item.label}</strong>
                      <span>{item.value}</span>
                    </ItemText>
                  </Item>
                ))}
              </Items>

              <MapContainer>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1440.9884897614854!2d106.70062445993234!3d10.771956198986228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40c790d76b%3A0x574751e6dd6ff77a!2zNjUgSHXhu7NuaCBUaMO6YyBLaMOhbmcsIFPDoGkgR8OybiwgSOG7kyBDaMOtIE1pbmggNTAwMDAsIFZp4buHdCBOYW0!5e1!3m2!1svi!2s!4v1779718558035!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                />
              </MapContainer>
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
