import React, { useState } from 'react';
import * as S from './styles';
import { PersonalInfoTab } from '../PersonalInfoTab';
import { SecurityTab } from '../SecurityTab';
import { AuthUser } from '@/contexts/AuthContext';

interface TabbedDetailsProps {
  user: AuthUser;
}

export const TabbedDetails: React.FC<TabbedDetailsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'qualifications' | 'security'>('personal');

  return (
    <S.TabbedContainer>
      <S.TabsHeader>
        <S.TabButton 
          $active={activeTab === 'personal'} 
          onClick={() => setActiveTab('personal')}
        >
          Thông tin cá nhân
        </S.TabButton>
        <S.TabButton 
          $active={activeTab === 'qualifications'} 
          onClick={() => setActiveTab('qualifications')}
        >
          Chuyên môn & Bằng cấp
        </S.TabButton>
        <S.TabButton 
          $active={activeTab === 'security'} 
          onClick={() => setActiveTab('security')}
        >
          Bảo mật tài khoản
        </S.TabButton>
      </S.TabsHeader>

      <S.TabContentArea>
        {activeTab === 'personal' && <PersonalInfoTab user={user} />}
        {activeTab === 'qualifications' && (
          <div style={{ color: '#6B7280', textAlign: 'center', padding: '40px' }}>
            Nội dung bằng cấp đang được cập nhật...
          </div>
        )}
        {activeTab === 'security' && <SecurityTab user={user} />}
      </S.TabContentArea>
    </S.TabbedContainer>
  );
};
