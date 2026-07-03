'use client';

import React from 'react';
import { ToastContainer as BaseToastContainer, toast, cssTransition } from 'react-toastify';
import styled, { keyframes } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

// Custom keyframes for a premium, springy entry and smooth exit
const premiumEnter = keyframes`
  0% {
    transform: translateX(120%) scale(0.9);
    opacity: 0;
  }
  70% {
    transform: translateX(-8px) scale(1.02);
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
`;

const premiumExit = keyframes`
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(120%) scale(0.85);
    opacity: 0;
  }
`;

const PremiumTransition = cssTransition({
  enter: 'premium-enter',
  exit: 'premium-exit',
  collapse: true,
});

const StyledContainer = styled(BaseToastContainer)`
  /* Toast container layout */
  width: 400px;
  max-width: 90vw;
  padding: 12px;

  /* Custom Transitions */
  .premium-enter {
    animation: ${premiumEnter} 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .premium-exit {
    animation: ${premiumExit} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .Toastify__toast {
    font-family: var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    border-radius: 12px;
    padding: 14px 18px;
    margin-bottom: 12px;
    box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.02);
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), 
                box-shadow 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 30px -10px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.03);
    }
  }

  .Toastify__toast-body {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    width: 100%;
  }

  /* Custom designs matching the user's reference image */
  .Toastify__toast-theme--light {
    &.Toastify__toast--success {
      background: var(--brand-tint, #e6f3ed);
      border: 1.5px solid var(--brand, #005a36);
      color: var(--brand, #005a36);
      
      .Toastify__close-button {
        color: var(--brand, #005a36);
      }
    }
    
    &.Toastify__toast--error {
      background: var(--red-tint, #fee2e2);
      border: 1.5px solid var(--red, #dc2626);
      color: var(--red, #dc2626);
      
      .Toastify__close-button {
        color: var(--red, #dc2626);
      }
    }
    
    &.Toastify__toast--warning {
      background: var(--amber-tint, #fef3c7);
      border: 1.5px solid var(--amber, #d97706);
      color: var(--amber-text, #92400e);
      
      .Toastify__close-button {
        color: var(--amber, #d97706);
      }
    }
    
    &.Toastify__toast--info {
      background: var(--blue-tint, #e3edfd);
      border: 1.5px solid var(--blue, #2563eb);
      color: var(--blue, #2563eb);
      
      .Toastify__close-button {
        color: var(--blue, #2563eb);
      }
    }
  }

  /* Close button styling */
  .Toastify__close-button {
    opacity: 0.7;
    align-self: center;
    width: 20px;
    height: 20px;
    display: grid;
    place-items: center;
    transition: all 0.2s ease;
    
    &:hover {
      opacity: 1;
      transform: scale(1.15);
    }
  }

  /* Progress bar styling at the bottom */
  .Toastify__progress-bar {
    height: 4px;
    bottom: 0;
    left: 0;
  }

  .Toastify__progress-bar--success {
    background: var(--brand, #005a36);
  }

  .Toastify__progress-bar--error {
    background: var(--red, #dc2626);
  }

  .Toastify__progress-bar--warning {
    background: var(--amber, #d97706);
  }

  .Toastify__progress-bar--info {
    background: var(--blue, #2563eb);
  }
`;

/* Solid icons matching the reference image layout */
const SuccessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" fill="var(--brand, #005a36)" />
    <path d="M8.5 12.5l2 2 5-5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DangerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" fill="var(--red, #dc2626)" />
    <line x1="12" y1="8" x2="12" y2="13" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1" fill="#ffffff" />
  </svg>
);

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M12 2L2 20h20L12 2z" fill="var(--amber, #d97706)" />
    <line x1="12" y1="9" x2="12" y2="14" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="17.5" r="1" fill="#ffffff" />
  </svg>
);

const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" fill="var(--blue, #2563eb)" />
    <line x1="12" y1="16" x2="12" y2="12" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="9" r="1" fill="#ffffff" />
  </svg>
);

export interface KindercareToastProps {
  variant?: 'success' | 'danger' | 'warning' | 'info';
  title?: string;
  message: React.ReactNode;
  icon?: React.ReactNode;
}

const ToastCard = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  align-items: center;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
`;

const TitleText = styled.span`
  font-weight: 700;
  font-size: 13.5px;
  color: inherit;
`;

const MessageText = styled.span`
  font-size: 12.5px;
  color: inherit;
  opacity: 0.9;
  font-weight: 500;
`;

export const KindercareToast: React.FC<KindercareToastProps> = ({
  variant = 'success',
  title,
  message,
  icon,
}) => {
  const getIcon = () => {
    if (icon) {
      return icon;
    }

    switch (variant) {
      case 'success': return <SuccessIcon />;
      case 'danger': return <DangerIcon />;
      case 'warning': return <WarningIcon />;
      case 'info': return <InfoIcon />;
    }
  };

  return (
    <ToastCard>
      {getIcon()}
      <TextContent>
        {title && <TitleText>{title}</TitleText>}
        <MessageText>{message}</MessageText>
      </TextContent>
    </ToastCard>
  );
};

export const ToastContainer: React.FC<React.ComponentProps<typeof BaseToastContainer>> = (props) => {
  return (
    <StyledContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={PremiumTransition}
      {...props}
    />
  );
};

/* Programmatic Toast trigger wrappers */
export const kcToast = {
  success: (message: React.ReactNode, title?: string, options?: any) =>
    toast(<KindercareToast variant="success" title={title} message={message} />, { icon: false, type: 'success', ...options }),
  error: (message: React.ReactNode, title?: string, options?: any) =>
    toast(<KindercareToast variant="danger" title={title} message={message} />, { icon: false, type: 'error', ...options }),
  warning: (message: React.ReactNode, title?: string, options?: any) =>
    toast(<KindercareToast variant="warning" title={title} message={message} />, { icon: false, type: 'warning', ...options }),
  info: (message: React.ReactNode, title?: string, options?: any) =>
    toast(<KindercareToast variant="info" title={title} message={message} />, { icon: false, type: 'info', ...options }),
};

export { toast };
