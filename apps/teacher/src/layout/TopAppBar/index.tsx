import React, { useState } from 'react';
import * as S from './styles';
import { NotificationDropdown } from './components/NotificationDropdown';
import { useRouter } from '@/i18n/routing';

interface TopAppBarProps {
  fullName: string;
  roleTitle: string;
}

const SearchIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const NotificationBellIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const ChatBubbleIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

interface TopAppBarProps {
  fullName: string;
  roleTitle: string;
  onMenuClick?: () => void;
}

const MenuIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="12" x2="20" y2="12"></line>
    <line x1="4" y1="6" x2="20" y2="6"></line>
    <line x1="4" y1="18" x2="20" y2="18"></line>
  </svg>
);

export const TopAppBar: React.FC<TopAppBarProps> = ({ fullName, roleTitle, onMenuClick }) => {
  const router = useRouter();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <S.HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
        {onMenuClick && (
          <S.MenuButton onClick={onMenuClick} aria-label="Open sidebar">
            <MenuIcon size={22} />
          </S.MenuButton>
        )}
        
        <S.SearchWrapper>
          <SearchIcon size={18} />
          <S.SearchInput type="text" placeholder="Tìm kiếm hồ sơ..." />
        </S.SearchWrapper>
      </div>

      
      <S.ActionsSection>
        <S.NotificationWrapper>
          <S.ActionButton aria-label="Notifications" onClick={() => setIsNotifOpen(!isNotifOpen)}>
            <NotificationBellIcon size={20} />
            <S.NotificationBadge />
          </S.ActionButton>
          {isNotifOpen && <NotificationDropdown onClose={() => setIsNotifOpen(false)} />}
        </S.NotificationWrapper>

        <S.ActionButton aria-label="Messages">
          <ChatBubbleIcon size={20} />
        </S.ActionButton>

        <S.VerticalDivider />

        <S.ProfileSection onClick={() => router.push('/profile')}>
          <S.ProfileInfo>
            <S.ProfileName>{fullName}</S.ProfileName>
            <S.ProfileRole>{roleTitle}</S.ProfileRole>
          </S.ProfileInfo>
          <S.Avatar>
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=60" 
              alt={fullName} 
            />
          </S.Avatar>
        </S.ProfileSection>
      </S.ActionsSection>
    </S.HeaderContainer>
  );
};
