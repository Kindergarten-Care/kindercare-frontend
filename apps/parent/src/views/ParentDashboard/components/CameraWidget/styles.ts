import styled from 'styled-components';

export const Card = styled.div`
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #dde8d9);
  border-radius: var(--r-lg, 16px);
  padding: 16px 18px;
`;

export const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--fg, #181d18);
  display: flex;
  align-items: center;
  gap: 7px;
  
  span {
    font-size: 15px;
  }
`;

export const CamView = styled.div`
  position: relative;
  background: #111;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop') center/cover;
    opacity: 0.6;
    transition: transform 0.3s, opacity 0.3s;
  }

  &:hover::before {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

export const CamLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #ef4444;
    border-radius: 50%;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  }
`;

export const CamPlay = styled.div`
  position: absolute;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  padding-left: 2px;
  transition: background 0.2s, transform 0.2s;

  ${CamView}:hover & {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;
