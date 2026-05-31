import React, { useState } from 'react';
import { Button } from '@/UIKit';
import { Dropdown, useTranslation } from '@kindercare/ui';
import type { ChildAgeValue, PricingPlanValue } from '@/config/types';
import { CHILD_AGE_OPTIONS, PRICING_PLAN_OPTIONS } from '@/resources/landingContent';
import {
  FormConsent,
  FormGroup,
  FormRow,
  FormSuccess,
  FormWrap,
} from './styles';

export function ContactForm(): React.ReactElement {
  const [submitted, setSubmitted] = useState(false);
  const [childAge, setChildAge] = useState<ChildAgeValue | null>(null);
  const [plan, setPlan] = useState<PricingPlanValue | null>(null);
  const { t } = useTranslation();

  const translatedAgeOptions = CHILD_AGE_OPTIONS.map((opt) => {
    const key = opt.value === '18-24m' ? '18_24m' : `${opt.value}y`;
    return {
      ...opt,
      label: t(`Landing.Dropdown.age.${key}`),
    };
  });

  const translatedPlanOptions = PRICING_PLAN_OPTIONS.map((opt) => ({
    ...opt,
    label: t(`Landing.Dropdown.plan.${opt.value}`),
  }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!childAge) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <FormWrap>
        <FormSuccess>
          <div className="success-icon">🌱</div>
          <h4>{t('Landing.Contact.Form.successTitle')}</h4>
          <p>
            {t('Landing.Contact.Form.successLine1')}
            <br />
            {t('Landing.Contact.Form.successLine2')}
          </p>
        </FormSuccess>
      </FormWrap>
    );
  }

  return (
    <FormWrap>
      <h3>{t('Landing.Contact.Form.title')}</h3>
      <p>{t('Landing.Contact.Form.subtitle')}</p>

      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <label htmlFor="parentName">{t('Landing.Contact.Form.parentNameLabel')}</label>
            <input
              id="parentName"
              type="text"
              placeholder={t('Landing.Contact.Form.parentNamePlaceholder')}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="phone">{t('Landing.Contact.Form.phoneLabel')}</label>
            <input id="phone" type="tel" placeholder={t('Landing.Contact.Form.phonePlaceholder')} required />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <label htmlFor="email">{t('Landing.Contact.Form.emailLabel')}</label>
          <input id="email" type="email" placeholder={t('Landing.Contact.Form.emailPlaceholder')} />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <label htmlFor="childAge">{t('Landing.Contact.Form.childAgeLabel')}</label>
            <Dropdown<ChildAgeValue>
              id="childAge"
              value={childAge}
              onChange={setChildAge}
              options={translatedAgeOptions}
              placeholder={t('Landing.Contact.Form.childAgePlaceholder')}
              ariaLabel="Child age"
              fullWidth
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="plan">{t('Landing.Contact.Form.planLabel')}</label>
            <Dropdown<PricingPlanValue>
              id="plan"
              value={plan}
              onChange={setPlan}
              options={translatedPlanOptions}
              placeholder={t('Landing.Contact.Form.planPlaceholder')}
              ariaLabel="Interested pricing package"
              fullWidth
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <label htmlFor="visitDate">{t('Landing.Contact.Form.visitDateLabel')}</label>
          <input id="visitDate" type="date" />
        </FormGroup>

        <FormGroup>
          <label htmlFor="notes">{t('Landing.Contact.Form.notesLabel')}</label>
          <textarea
            id="notes"
            placeholder={t('Landing.Contact.Form.notesPlaceholder')}
          />
        </FormGroup>

        <Button type="submit" $variant="primary" $size="lg" $fullWidth>
          {t('Landing.Contact.Form.submitButton')}
        </Button>
        <FormConsent>
          {t('Landing.Contact.Form.consentText')}
        </FormConsent>
      </form>
    </FormWrap>
  );
}
