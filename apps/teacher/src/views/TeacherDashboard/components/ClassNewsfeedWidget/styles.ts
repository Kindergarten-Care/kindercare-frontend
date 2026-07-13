import styled from 'styled-components';

export const WidgetContainer = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 24px;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
`;

export const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const WidgetTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FeedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  flex: 1;
  padding-right: 8px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #E5E7EB;
    border-radius: 10px;
  }
`;

export const FeedItem = styled.div`
  padding: 16px;
  background: #F9FAFB;
  border-radius: 16px;
  border: 1px solid #F3F4F6;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FeedHeader = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const TeacherAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: #E5E7EB;
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TeacherName = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #111827;
`;

export const PostTime = styled.span`
  font-size: 12px;
  color: #6B7280;
`;

export const FeedContent = styled.p`
  font-size: 14px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`;

export const FeedImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(0.98);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
  color: #6B7280;
  text-align: center;
  font-size: 14px;

  svg {
    margin-bottom: 12px;
    color: #9CA3AF;
  }
`;

/* Lightbox Modal */
export const LightboxOverlay = styled.div<{ $active: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$active ? 1 : 0};
  visibility: ${props => props.$active ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

export const LightboxContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
`;

export const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
`;

export const LightboxCloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  
  &:hover {
    background: rgba(0,0,0,0.8);
    transform: scale(1.1);
  }
`;

export const DeleteBtn = styled.button`
  background: transparent;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-left: auto;

  &:hover {
    color: #EF4444;
    background: #FEE2E2;
  }
`;
