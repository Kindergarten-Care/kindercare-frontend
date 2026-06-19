'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import * as S from './styles';
import { IconClose } from '@/assets/icons/dashboard';

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ isOpen, onClose }) => {
  const locale = useLocale();
  const [shouldRender, setShouldRender] = React.useState(isOpen);
  const [isClosing, setIsClosing] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  const isEn = locale === 'en';

  const text = {
    title: isEn ? 'Notifications' : 'Thông báo',
    badge: isEn ? 'No New' : 'Mới',
    emptyTitle: isEn ? 'No new notifications' : 'Không có thông báo nào mới',
    emptyDesc: isEn
      ? 'We will notify you here when there are new announcements, activities, or learning updates for your child.'
      : 'Hệ thống sẽ cập nhật tại đây khi có thông báo mới từ nhà trường về hoạt động học tập và sinh hoạt của bé.',
    btnText: isEn ? 'Got it' : 'Đóng',
  };

  return (
    <S.Overlay onClick={onClose} $isClosing={isClosing}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()} $isClosing={isClosing}>
        <S.HeadRow>
          <S.TitleWrap>
            <S.Title>{text.title}</S.Title>
            <S.Badge>{text.badge}</S.Badge>
          </S.TitleWrap>
          <S.CloseBtn onClick={onClose} aria-label={isEn ? 'Close' : 'Đóng'}>
            <IconClose size={16} />
          </S.CloseBtn>
        </S.HeadRow>

        <S.ContentArea>
          <S.SvgWrapper>
            <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Concentric ambient background glows */}
              <circle cx="80" cy="80" r="64" fill="url(#paint0_radial)" opacity="0.4" />
              <circle cx="80" cy="80" r="48" fill="url(#paint1_radial)" opacity="0.6" />

              {/* Sparkles & Star details */}
              <path d="M42 48L44 43L49 41L44 39L42 34L40 39L35 41L40 43L42 48Z" fill="#F59E0B" opacity="0.85" />
              <path d="M118 112L119.5 108L123.5 106.5L119.5 105L118 101L116.5 105L112.5 106.5L116.5 108L118 112Z" fill="#F59E0B" opacity="0.85" />
              <path d="M122 42L123 39.5L125.5 38.5L123 37.5L122 35L121 37.5L118.5 38.5L121 39.5L122 42Z" fill="#005A36" opacity="0.7" />

              {/* Decorative outline circles */}
              <circle cx="36" cy="98" r="5" fill="#E6F3ED" stroke="#005A36" strokeWidth="1.5" />
              <circle cx="124" cy="76" r="3" fill="#E6F3ED" stroke="#005A36" strokeWidth="1" />

              {/* Bell ground shadow */}
              <ellipse cx="80" cy="122" rx="28" ry="6" fill="#D1E2D8" />

              {/* Styled bell group with shadow filter */}
              <g filter="url(#bell_shadow)">
                {/* Bell handle */}
                <path d="M80 32C76.6863 32 74 34.6863 74 38V42H86V38C86 34.6863 83.3137 32 80 32Z" fill="#005A36" />
                
                {/* Bell main core */}
                <path d="M80 42C64.536 42 60 54 60 72C60 90 56 98 52 102H108C104 98 100 90 100 72C100 54 95.464 42 80 42Z" fill="url(#bell_gradient)" />
                
                {/* Bell rim */}
                <path d="M50 102C50 100.895 50.8954 100 52 100H108C109.105 100 110 100.895 110 102C110 103.105 109.105 104 108 104H52C50.8954 104 50 103.105 50 102Z" fill="#004428" />
                
                {/* Bell clapper */}
                <path d="M74 104C74 104 74 114 80 114C86 114 86 104 86 104H74Z" fill="#F59E0B" />
              </g>

              <defs>
                {/* Color gradients definition */}
                <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(80 80) rotate(90) scale(64)">
                  <stop stopColor="#E6F3ED" />
                  <stop offset="1" stopColor="#E6F3ED" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(80 80) rotate(90) scale(48)">
                  <stop stopColor="#D1E2D8" />
                  <stop offset="1" stopColor="#D1E2D8" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="bell_gradient" x1="60" y1="42" x2="100" y2="102" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#006C41" />
                  <stop offset="0.6" stopColor="#005A36" />
                  <stop offset="1" stopColor="#004428" />
                </linearGradient>
                
                {/* Shadow for bell */}
                <filter id="bell_shadow" x="46" y="30" width="68" height="92" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#002D1B" floodOpacity="0.15" />
                </filter>
              </defs>
            </svg>
          </S.SvgWrapper>

          <S.EmptyTitle>{text.emptyTitle}</S.EmptyTitle>
          <S.EmptyDesc>{text.emptyDesc}</S.EmptyDesc>

          <S.ConfirmBtn onClick={onClose}>
            {text.btnText}
          </S.ConfirmBtn>
        </S.ContentArea>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default NotificationPopup;
