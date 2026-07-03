import * as S from './styles';

interface NotificationIconProps {
  type: string;
}

export function NotificationIcon({ type }: NotificationIconProps) {
  switch (type) {
    case 'ATTENDANCE':
    case 'CHECKIN':
    case 'CHECKOUT':
      return (
        <S.IconWrapper $type="ATTENDANCE">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <path d="m9 14 2 2 4-4" />
          </svg>
        </S.IconWrapper>
      );
    case 'LEAVE_REQUEST':
      return (
        <S.IconWrapper $type="LEAVE_REQUEST">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
          </svg>
        </S.IconWrapper>
      );
    case 'MEDICATION':
    case 'MEDICATION_REQUEST':
    case 'MEDICAL_REQUEST':
    case 'MEDICINE':
    case 'MEDICINE_REQUEST':
      return (
        <S.IconWrapper $type="MEDICATION_REQUEST">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </S.IconWrapper>
      );
    case 'HEALTH_ALERT':
      return (
        <S.IconWrapper $type="HEALTH_ALERT">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 8v8" /><path d="M8 12h8" />
          </svg>
        </S.IconWrapper>
      );
    default:
      return (
        <S.IconWrapper $type="DEFAULT">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </S.IconWrapper>
      );
  }
}
