import React, { useState } from 'react';
import * as S from './styles';
import { AuthUser } from '@/contexts/AuthContext';
import { useRouter } from '@/i18n/routing';
import { ArrowLeft, Edit2, Briefcase, History, Settings } from 'lucide-react';
import { ContactInfo } from './components/ContactInfo';
import { WorkTab } from './components/WorkTab';
import { HistoryTab } from './components/HistoryTab';
import { SettingsTab } from './components/SettingsTab';
import { EditProfileModal } from './components/EditProfileModal';

interface TeacherProfileViewProps {
  user: AuthUser;
}

export const TeacherProfileView: React.FC<TeacherProfileViewProps> = ({ user }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'work' | 'history' | 'settings'>('work');
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Fallback to user data if available, or use defaults
  const teacherName = user?.fullName || 'Lê Huy';
  const role = user?.professionalRank || 'Giáo viên Hạng III';

  return (
    <S.ProfileContainer>
      <S.BackButton onClick={() => router.back()} style={{ width: 'fit-content' }}>
        <ArrowLeft size={16} />
        Quay lại
      </S.BackButton>

      <S.ProfileHeader>
        <S.CoverImage />
        <S.AvatarWrapper>
          {teacherName.charAt(0).toUpperCase()}
        </S.AvatarWrapper>
        <S.HeaderInfo>
          <div>
            <S.TeacherName>{teacherName}</S.TeacherName>
            <S.TeacherRole>🎓 {role}</S.TeacherRole>
          </div>
          <S.EditButton onClick={() => setIsEditOpen(true)}>
            <Edit2 size={16} />
            Chỉnh sửa
          </S.EditButton>
        </S.HeaderInfo>
      </S.ProfileHeader>

      <S.ProfileGrid>
        <S.Card>
          <S.CardTitle>Thông tin liên lạc</S.CardTitle>
          <ContactInfo user={user} />
        </S.Card>

        <S.Card>
          <S.TabsContainer>
            <S.TabButton $active={activeTab === 'work'} onClick={() => setActiveTab('work')}>
              <Briefcase size={16} /> Công việc
            </S.TabButton>
            <S.TabButton $active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
              <History size={16} /> Lịch sử công tác
            </S.TabButton>
            <S.TabButton $active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
              <Settings size={16} /> Cài đặt
            </S.TabButton>
          </S.TabsContainer>

          {activeTab === 'work' && <WorkTab />}
          {activeTab === 'history' && <HistoryTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </S.Card>
      </S.ProfileGrid>

      <EditProfileModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        user={user} 
        onSave={(data: any) => console.log('Saved data:', data)} 
      />
    </S.ProfileContainer>
  );
};
