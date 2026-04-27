import React from 'react';
import styled from 'styled-components';
import { Section, Container } from '../styles';
import { useLandingPage } from '../hooks';
import Dropdown from '@/UIKit/Dropdown';

const FormCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  background-color: ${props => props.theme.colors.bgWhite};
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0px 30px 60px -15px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 1040px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoSide = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accentDarkGreen} 100%);
  color: ${props => props.theme.colors.bgWhite};
  padding: 64px 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 48px 32px;
    gap: 48px;
  }
`;

const InfoTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 24px;
  z-index: 2;
  letter-spacing: -0.02em;
`;

const InfoDesc = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 48px;
  z-index: 2;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 2;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
`;

const ContactIcon = styled.span`
  font-size: 20px;
`;

const FormSide = styled.form`
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 32px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.textDark};
  letter-spacing: 0.02em;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  font-size: 15px;
  font-family: inherit;
  color: ${props => props.theme.colors.textDark};
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0px 0px 0px 4px rgba(43, 105, 77, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  font-size: 15px;
  color: ${props => props.theme.colors.textDark};
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234B5563' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-size: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0px 0px 0px 4px rgba(43, 105, 77, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  font-size: 15px;
  font-family: inherit;
  color: ${props => props.theme.colors.textDark};
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0px 0px 0px 4px rgba(43, 105, 77, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const SubmitButton = styled.button`
  padding: 18px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accentDarkGreen} 100%);
  color: ${props => props.theme.colors.bgWhite};
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0px 10px 20px -5px rgba(43, 105, 77, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 15px 25px -5px rgba(43, 105, 77, 0.5);
    filter: brightness(1.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const PrivacyText = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.textGray};
  text-align: center;
`;

const DecoShape = styled.div`
  position: absolute;
  width: 256px;
  height: 256px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.accentLightBlue};
  opacity: 0.5;
  bottom: -100px;
  right: -100px;
  filter: blur(40px);
  z-index: 1;
`;

export const ContactForm: React.FC = () => {
  const { formData, handleInputChange, handleSubmit } = useLandingPage();

  return (
    <Section id="contact" $bg="#FFFDE7">
      <Container>
        <FormCard>
          <InfoSide>
            <DecoShape />
            <div>
              <InfoTitle>Đồng hành cùng con<br />trên chặng đường đầu<br />đời</InfoTitle>
              <InfoDesc>
                Để lại thông tin, đội ngũ tuyển sinh của
                KinderCare sẽ liên hệ để tư vấn chi tiết và
                đặt lịch tham quan trường cho gia đình.
              </InfoDesc>
            </div>

            <ContactList>
              <ContactItem>
                <ContactIcon>📞</ContactIcon>
                <span>0123 456 789</span>
              </ContactItem>
              <ContactItem>
                <ContactIcon>✉</ContactIcon>
                <span>tuyensinh@kindercare.edu.vn</span>
              </ContactItem>
            </ContactList>
          </InfoSide>

          <FormSide onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Họ và tên Phụ huynh *</Label>
              <Input
                type="text"
                name="parentName"
                placeholder="Nhập họ và tên"
                value={formData.parentName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label>Số điện thoại *</Label>
                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder="09xx xxx xxx"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Năm sinh của bé *</Label>
                <Dropdown
                  options={[
                    { value: '2021', label: '2021' },
                    { value: '2022', label: '2022' },
                    { value: '2023', label: '2023' },
                    { value: '2024', label: '2024' },
                  ]}
                  value={formData.childBirthYear}
                  onChange={(val) => handleInputChange({ target: { name: 'childBirthYear', value: val } } as any)}
                  placeholder="Chọn năm sinh"
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>Ghi chú thêm (Tùy chọn)</Label>
              <Textarea
                name="notes"
                placeholder="Câu hỏi hoặc mong muốn của gia đình..."
                value={formData.notes}
                onChange={handleInputChange}
              />
            </FormGroup>

            <SubmitButton type="submit">Nhận tư vấn miễn phí</SubmitButton>
            <PrivacyText>Thông tin của bạn được bảo mật tuyệt đối.</PrivacyText>
          </FormSide>
        </FormCard>
      </Container>
    </Section>
  );
};
