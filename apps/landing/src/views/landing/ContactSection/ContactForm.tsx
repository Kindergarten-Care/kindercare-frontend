'use client';

import React, { useState } from 'react';
import { Button } from '@/UIKit';
import { Dropdown } from '@kindercare/ui';
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
          <h4>Đăng ký thành công!</h4>
          <p>
            Cảm ơn bạn đã quan tâm đến KinderCare.
            <br />
            Đội ngũ tư vấn sẽ liên hệ lại trong vòng <strong>24 giờ làm việc</strong>.
          </p>
        </FormSuccess>
      </FormWrap>
    );
  }

  return (
    <FormWrap>
      <h3>Đăng ký tư vấn miễn phí</h3>
      <p>Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong vòng 24 giờ làm việc.</p>

      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <label htmlFor="parentName">Họ và tên phụ huynh *</label>
            <input id="parentName" type="text" placeholder="Nguyễn Văn A" required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="phone">Số điện thoại *</label>
            <input id="phone" type="tel" placeholder="090x xxx xxx" required />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="email@example.com" />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <label htmlFor="childAge">Tuổi của bé *</label>
            <Dropdown<ChildAgeValue>
              id="childAge"
              value={childAge}
              onChange={setChildAge}
              options={CHILD_AGE_OPTIONS}
              placeholder="Chọn độ tuổi"
              ariaLabel="Child age"
              fullWidth
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="plan">Gói quan tâm</label>
            <Dropdown<PricingPlanValue>
              id="plan"
              value={plan}
              onChange={setPlan}
              options={PRICING_PLAN_OPTIONS}
              placeholder="Chưa quyết định"
              ariaLabel="Interested pricing package"
              fullWidth
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <label htmlFor="visitDate">Thời gian có thể tham quan</label>
          <input id="visitDate" type="date" />
        </FormGroup>

        <FormGroup>
          <label htmlFor="notes">Câu hỏi hoặc lưu ý thêm</label>
          <textarea
            id="notes"
            placeholder="Bé có dị ứng thực phẩm, nhu cầu đặc biệt hoặc câu hỏi cụ thể nào không?"
          />
        </FormGroup>

        <Button type="submit" $variant="primary" $size="lg" $fullWidth>
          Gửi đăng ký tư vấn
        </Button>
        <FormConsent>
          Thông tin của bạn được bảo mật tuyệt đối và chỉ dùng cho mục đích liên hệ tư vấn.
        </FormConsent>
      </form>
    </FormWrap>
  );
}
