'use client';

import styled, { keyframes } from 'styled-components';

/* ─── Animations ─── */
const kcPop = keyframes`
  from { opacity: 0; transform: scale(0.94) translateY(10px); }
  to   { opacity: 1; transform: none; }
`;

const kcBob = keyframes`
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50%      { transform: translateY(-12px) rotate(3deg); }
`;

const kcFloat2 = keyframes`
  0%, 100% { transform: translateY(0) rotate(4deg); }
  50%      { transform: translateY(-9px) rotate(-3deg); }
`;

const kcChipIn = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
`;

const kcTwinkle = keyframes`
  0%, 100% { opacity: 0.35; transform: scale(0.85); }
  50%      { opacity: 1;    transform: scale(1.15); }
`;

const kcShake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
`;

const kcSpin = keyframes`to { transform: rotate(360deg); }`;

const kcBlob = keyframes`
  0%, 100% { transform: translate(0, 0)   scale(1); }
  33%      { transform: translate(24px, -20px) scale(1.12); }
  66%      { transform: translate(-18px, 14px) scale(0.94); }
`;

const kcToastPop = kcPop;

/* ─── Page wrapper ─── */
export const PageWrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
  background: radial-gradient(900px 500px at 15% 10%, #EAF6EF 0%, #E9F1EC 55%);
  font-family: 'Inter', system-ui, sans-serif;
`;

export const Card = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  width: 100%;
  max-width: 1040px;
  min-height: 600px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 30px 80px -30px rgba(0, 90, 54, 0.4);
  background: #FFFFFF;
  animation: ${kcPop} 0.4s cubic-bezier(0.2, 0.8, 0.3, 1);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/* ─── Brand Pane (left) ─── */
export const BrandPane = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(155deg, #00432A 0%, #005A36 48%, #0A8A57 100%);
  padding: 44px 46px;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const BlobGreen = styled.span`
  position: absolute;
  top: -90px;
  right: -70px;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(52, 211, 153, 0.55), rgba(52, 211, 153, 0) 70%);
  filter: blur(6px);
  animation: ${kcBlob} 14s ease-in-out infinite;
  pointer-events: none;
`;

export const BlobAmber = styled.span`
  position: absolute;
  bottom: -70px;
  left: -50px;
  width: 230px;
  height: 230px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, rgba(251, 191, 36, 0.4), rgba(251, 191, 36, 0) 70%);
  filter: blur(6px);
  animation: ${kcBlob} 18s ease-in-out infinite reverse;
  pointer-events: none;
`;

const TwinkleBase = styled.span`
  position: absolute;
  font-size: 16px;
  pointer-events: none;
  animation: ${kcTwinkle} 3s ease-in-out infinite;
`;

export const Twinkle1 = styled(TwinkleBase)`
  top: 24%;
  left: 16%;
  font-size: 16px;
  color: #FBBF24;
`;

export const Twinkle2 = styled(TwinkleBase)`
  top: 64%;
  right: 20%;
  font-size: 12px;
  color: #A7F3D0;
  animation-duration: 3.6s;
  animation-delay: 0.6s;
`;

export const Twinkle3 = styled(TwinkleBase)`
  top: 14%;
  right: 30%;
  font-size: 10px;
  color: #FFFFFF;
  animation-duration: 2.8s;
  animation-delay: 0.3s;
`;

export const BrandLogoBanner = styled.img`
  display: block;
  width: 300px;
  height: auto;
  max-width: 100%;
  filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.35));
`;

export const HeroBlock = styled.div`
  position: relative;
  margin-top: auto;
`;

export const EmojiStage = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 26px;
`;

export const EmojiCard = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 38px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
`;

export const EmojiMain = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 78px;
  line-height: 1;
  filter: drop-shadow(0 14px 20px rgba(0, 0, 0, 0.3));
  animation: ${kcBob} 4s ease-in-out infinite;
`;

export const EmojiApple = styled.span`
  position: absolute;
  top: -14px;
  right: -16px;
  font-size: 40px;
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.25));
  animation: ${kcFloat2} 4.4s ease-in-out infinite 0.4s;
`;

export const EmojiStar = styled.span`
  position: absolute;
  bottom: -10px;
  left: -16px;
  font-size: 30px;
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.25));
  animation: ${kcFloat2} 5s ease-in-out infinite 0.8s;
`;

export const HeroTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 31px;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.18;
  letter-spacing: -0.02em;
`;

export const HeroDesc = styled.p`
  font-size: 14px;
  color: #CDEBDC;
  line-height: 1.6;
  margin: 12px 0 0;
  max-width: 340px;
`;

export const FeatureChips = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 26px;
  max-width: 320px;
`;

export const FeatureChip = styled.div<{ $delay?: number }>`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(6px);
  animation: ${kcChipIn} 0.5s ease both ${(p) => p.$delay ?? 0}s;
`;

export const ChipIconBox = styled.span<{ $color?: string }>`
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.9);
  color: ${(p) => p.$color || '#005A36'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChipLabel = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: #FFFFFF;
`;

/* ─── Form Pane (right) ─── */
export const FormPane = styled.div`
  padding: 48px 46px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 600px) {
    padding: 32px 24px;
  }
`;

export const FormTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 25px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1F2937;
`;

export const FormSubtitle = styled.div`
  font-size: 13.5px;
  color: #9CA3AF;
  font-weight: 500;
  margin-top: 5px;
`;

export const LoginForm = styled.form<{ $shake?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 26px;
  ${(p) =>
    p.$shake &&
    `animation: ${kcShake} 0.4s ease;`}
`;

export const FieldLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #9CA3AF;
  margin-bottom: 8px;
`;

export const FieldLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const ForgotLink = styled.a`
  font-size: 12px;
  font-weight: 700;
  color: #005A36;
  text-decoration: none;

  &:hover { text-decoration: underline; }
`;

export const InputWrap = styled.div<{ $hasError?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  height: 50px;
  padding: 0 15px;
  border-radius: 13px;
  background: #F8FBF9;
  border: 1px solid ${(p) => (p.$hasError ? '#FCA5A5' : '#E6EEE9')};
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus-within {
    border-color: #005A36;
    box-shadow: 0 0 0 3px rgba(0, 90, 54, 0.12);
  }
`;

export const InputIcon = styled.span`
  flex: none;
  display: flex;
  width: 18px;
  height: 18px;
  color: #9CA3AF;
`;

export const FieldInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: #1F2937;

  &::placeholder { color: #B3BEC9; }
`;

export const TogglePassBtn = styled.button`
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #9CA3AF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s ease;

  &:hover { color: #005A36; }
`;

export const ErrorBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 600;
  color: #DC2626;
  background: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 11px;
  padding: 10px 13px;
`;

export const RememberRow = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  user-select: none;
  margin-top: 2px;
`;

export const CheckBox = styled.button<{ $checked: boolean }>`
  flex: none;
  width: 22px;
  height: 22px;
  border-radius: 7px;
  border: 1.5px solid ${(p) => (p.$checked ? '#005A36' : '#CBD5D1')};
  background: ${(p) => (p.$checked ? '#005A36' : '#FFFFFF')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: padding: 0;
  padding: 0;
  transition: all 0.15s ease;
`;

export const CheckTick = styled.span`
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 800;
`;

export const RememberLabel = styled.span`
  font-size: 13px;
  color: #6B7280;
  font-weight: 500;
`;

export const SubmitBtn = styled.button`
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  height: 52px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #00794A 0%, #005A36 100%);
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 12px 26px -10px rgba(0, 90, 54, 0.5);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover:not(:disabled) {
    transform: scale(1.02);
  }
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.85;
  }
`;

export const Spinner = styled.span`
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255, 255, 255, 0.4);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: ${kcSpin} 0.7s linear infinite;
`;

export const FooterNote = styled.div`
  text-align: center;
  font-size: 12.5px;
  color: #9CA3AF;
  font-weight: 500;
  margin-top: 26px;

  a {
    color: #005A36;
    font-weight: 700;
    text-decoration: none;
  }
  a:hover { text-decoration: underline; }
`;

/* ─── Toast ─── */
export const ToastStack = styled.div`
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  z-index: 9500;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  pointer-events: none;
`;

export const Toast = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 20px;
  border-radius: 13px;
  background: #005A36;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.4);
  animation: ${kcToastPop} 0.28s cubic-bezier(0.2, 0.8, 0.3, 1);
  max-width: 380px;
`;
