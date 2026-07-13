import React from 'react';
import styled from 'styled-components';
import { Phone, Mail, Calendar, CreditCard, MapPin } from 'lucide-react';

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled.div<{ $color: string; $bg: string }>`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  background: ${props => props.$bg};
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: 12.5px;
  color: #6B7280;
  font-weight: 600;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #111827;
  font-weight: 600;
  margin-top: 2px;
`;

export const ContactInfo: React.FC<any> = ({ user }) => {
  const contacts = [
    { icon: <Phone size={18} />, label: 'Điện thoại', value: user?.phoneNumber || '0905 123 456', color: '#005A36', bg: '#E6F3ED' },
    { icon: <Mail size={18} />, label: 'Email', value: user?.email || 'huy.le@kindercare.edu.vn', color: '#2563EB', bg: '#E3EDFD' },
    { icon: <Calendar size={18} />, label: 'Ngày sinh', value: user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('vi-VN') : '12/08/1992', color: '#D97706', bg: '#FEF3C7' },
    { icon: <CreditCard size={18} />, label: 'CCCD', value: user?.idCard || '079 092 001 234', color: '#8B5CF6', bg: '#F1ECFE' },
    { icon: <MapPin size={18} />, label: 'Địa chỉ', value: user?.address || '45 Nguyễn Huệ, Q1, TP.HCM', color: '#DC2626', bg: '#FEE2E2' },
  ];

  return (
    <InfoList>
      {contacts.map((c, i) => (
        <InfoRow key={i}>
          <IconWrapper $color={c.color} $bg={c.bg}>{c.icon}</IconWrapper>
          <InfoContent>
            <InfoLabel>{c.label}</InfoLabel>
            <InfoValue>{c.value}</InfoValue>
          </InfoContent>
        </InfoRow>
      ))}
    </InfoList>
  );
};
