import styled, { keyframes } from 'styled-components';

// Animations from HTML
const bob = keyframes`
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
`;
const float2 = keyframes`
  0%, 100% { transform: translateY(0) rotate(4deg); }
  50% { transform: translateY(-9px) rotate(-3deg); }
`;
const pop = keyframes`
  from { opacity: 0; transform: scale(.94) translateY(10px); }
  to { opacity: 1; transform: none; }
`;
const blob = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(24px, -20px) scale(1.12); }
  66% { transform: translate(-18px, 14px) scale(.94); }
`;
const chipin = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
`;
const twinkle = keyframes`
  0%, 100% { opacity: .35; transform: scale(.85); }
  50% { opacity: 1; transform: scale(1.15); }
`;
export const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
  background: radial-gradient(900px 500px at 15% 10%, #EAF6EF 0%, #E9F1EC 55%);
  font-family: 'Inter', system-ui, sans-serif;
  color: #1F2937;
`;

export const Card = styled.div`
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  width: 100%;
  max-width: 1040px;
  min-height: 600px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 30px 80px -30px rgba(0, 90, 54, .4);
  background: #fff;
  animation: ${pop} .4s cubic-bezier(.2, .8, .3, 1);

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    max-width: 450px;
    border-radius: 0;
  }
`;

// --- LEFT PANEL ---

export const BrandPane = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(155deg, #00432A 0%, #005A36 48%, #0A8A57 100%);
  padding: 44px 46px;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    display: none !important;
  }
`;

export const Blob1 = styled.span`
  position: absolute;
  top: -90px;
  right: -70px;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(52, 211, 153, .55), rgba(52, 211, 153, 0) 70%);
  filter: blur(6px);
  animation: ${blob} 14s ease-in-out infinite;
`;

export const Blob2 = styled.span`
  position: absolute;
  bottom: -70px;
  left: -50px;
  width: 230px;
  height: 230px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, rgba(251, 191, 36, .4), rgba(251, 191, 36, 0) 70%);
  filter: blur(6px);
  animation: ${blob} 18s ease-in-out infinite reverse;
`;

export const Twinkle = styled.span<{ top: string, right?: string, left?: string, size: string, color: string, delay: string, duration: string }>`
  position: absolute;
  top: ${p => p.top};
  ${p => p.right ? `right: ${p.right};` : ''}
  ${p => p.left ? `left: ${p.left};` : ''}
  font-size: ${p => p.size};
  color: ${p => p.color};
  animation: ${twinkle} ${p => p.duration} ease-in-out infinite ${p => p.delay};
`;

export const LogoBox = styled.div`
  flex: none;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 22px -8px rgba(0,0,0,.4);
`;

export const DisplayText = styled.div`
  font-family: 'Inter', sans-serif;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 26px;
`;

export const AvatarBg = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 38px;
  background: rgba(255,255,255,.14);
  border: 1px solid rgba(255,255,255,.25);
  backdrop-filter: blur(6px);
`;

export const AvatarEmoji = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 78px;
  line-height: 1;
  filter: drop-shadow(0 14px 20px rgba(0,0,0,.3));
  animation: ${bob} 4s ease-in-out infinite;
`;

export const FloatingEmoji1 = styled.span`
  position: absolute;
  top: -14px;
  right: -16px;
  font-size: 40px;
  filter: drop-shadow(0 8px 12px rgba(0,0,0,.25));
  animation: ${float2} 4.4s ease-in-out infinite .4s;
`;

export const FloatingEmoji2 = styled.span`
  position: absolute;
  bottom: -10px;
  left: -16px;
  font-size: 30px;
  filter: drop-shadow(0 8px 12px rgba(0,0,0,.25));
  animation: ${float2} 5s ease-in-out infinite .8s;
`;

export const FeatureBox = styled.div<{ delay: string }>`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px 14px;
  border-radius: 14px;
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.18);
  backdrop-filter: blur(6px);
  animation: ${chipin} .5s ease both ${p => p.delay};
`;

export const FeatureIcon = styled.span<{ color: string }>`
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 11px;
  background: rgba(255,255,255,.9);
  color: ${p => p.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

// --- RIGHT PANEL ---

export const FormPane = styled.div`
  padding: 48px 46px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FormTitle = styled(DisplayText)`
  font-size: 25px;
  font-weight: 800;
  letter-spacing: -.02em;
`;

export const FormSubtitle = styled.div`
  font-size: 13.5px;
  color: #9CA3AF;
  font-weight: 500;
  margin-top: 5px;
`;

export const LabelGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Label = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
  color: #9CA3AF;
`;

export const InputWrap = styled.div<{ $error?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  height: 50px;
  padding: 0 15px;
  border-radius: 13px;
  background: #F8FBF9;
  border: 1px solid ${p => p.$error ? '#FCA5A5' : '#E6EEE9'};
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: #1F2937;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  user-select: none;
  margin-top: 2px;
`;

export const CustomCheck = styled.div<{ checked: boolean }>`
  flex: none;
  width: 22px;
  height: 22px;
  border-radius: 7px;
  border: 1.5px solid ${p => p.checked ? '#005A36' : '#CBD5D1'};
  background: ${p => p.checked ? '#005A36' : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .15s;
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
  background: linear-gradient(135deg, #00794A, #005A36);
  color: #fff;
  font-family: inherit;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 12px 26px -10px rgba(0, 90, 54, .5);
  transition: transform .15s;

  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(.98);
  }
`;

export const Spinner = styled.span`
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255,255,255,.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} .7s linear infinite;
`;
