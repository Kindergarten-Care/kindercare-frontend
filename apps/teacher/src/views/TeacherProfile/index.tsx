import React, { useState, useRef } from 'react';
import * as S from './styles';
import { AuthUser } from '@/contexts/AuthContext';
import { useRouter } from '@/i18n/routing';
import { ArrowLeft, Edit2, Briefcase, History, Settings, Camera, Loader2 } from 'lucide-react';
import { ContactInfo } from './components/ContactInfo';
import { WorkTab } from './components/WorkTab';
import { HistoryTab } from './components/HistoryTab';
import { SettingsTab } from './components/SettingsTab';
import { EditProfileModal } from './components/EditProfileModal';
import { useUploadAvatar, useUpdateAvatar } from '@/hooks/useTeacherQueries';

interface TeacherProfileViewProps {
  user: AuthUser;
}

export const TeacherProfileView: React.FC<TeacherProfileViewProps> = ({ user }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'work' | 'history' | 'settings'>('work');
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Local state to immediately show updated avatar before a full refresh
  const [localAvatar, setLocalAvatar] = useState(user?.avatarUrl || '');

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const uploadAvatarMutation = useUploadAvatar();
  const updateAvatarMutation = useUpdateAvatar();

  const isUploading = uploadAvatarMutation.isPending || updateAvatarMutation.isPending;

  const handleAvatarClick = () => {
    if (!isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (e.g. 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước ảnh không được vượt quá 5MB');
      return;
    }

    uploadAvatarMutation.mutate(file, {
      onSuccess: (url) => {
        // Sau khi upload thành công, cập nhật URL vào Profile
        updateAvatarMutation.mutate(url, {
          onSuccess: () => {
            setLocalAvatar(url);
          },
          onError: () => {
            alert('Có lỗi xảy ra khi lưu Avatar mới.');
          }
        });
      },
      onError: () => {
        alert('Tải ảnh lên thất bại. Vui lòng thử lại sau.');
      }
    });

    // Reset input
    e.target.value = '';
  };

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
        <S.AvatarWrapper onClick={handleAvatarClick} title="Thay đổi ảnh đại diện">
          {localAvatar ? (
            <img src={localAvatar} alt={teacherName} />
          ) : (
            teacherName.charAt(0).toUpperCase()
          )}
          
          {/* Overlay elements */}
          {isUploading ? (
            <div style={{ position: 'absolute', zIndex: 20 }}>
              <Loader2 className="animate-spin" size={32} color="#fff" />
            </div>
          ) : (
            <Camera className="camera-icon" size={32} />
          )}
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            hidden 
          />
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
