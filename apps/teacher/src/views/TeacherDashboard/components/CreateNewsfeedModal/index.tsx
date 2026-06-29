import React, { useState } from 'react';
import * as S from './styles';
import { useCreateNewsfeed } from '@/hooks/useTeacherQueries';

interface CreateNewsfeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId: number | string | null;
  onSuccess: () => void;
}

export const CreateNewsfeedModal: React.FC<CreateNewsfeedModalProps> = ({
  isOpen,
  onClose,
  classId,
  onSuccess
}) => {
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  
  const createNewsfeedMutation = useCreateNewsfeed();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!content.trim() || !classId) return;

    try {
      await createNewsfeedMutation.mutateAsync({
        classId,
        content,
        mediaUrl: mediaUrl || undefined
      });
      setContent('');
      setMediaUrl('');
      onSuccess();
    } catch (e) {
      console.error('Failed to create newsfeed:', e);
      alert('Tạo nhật ký thất bại. Vui lòng thử lại.');
    }
  };

  const handleSimulateUpload = () => {
    // Giả lập upload ảnh lên S3 hoặc Local và nhận về URL
    // Ở đây dùng ảnh random từ unsplash cho demo
    setMediaUrl(`https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=60&v=${Date.now()}`);
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={e => e.stopPropagation()}>
        <S.Header>
          <S.Title>📝 Tạo nhật ký lớp</S.Title>
          <S.CloseBtn onClick={onClose}>✕</S.CloseBtn>
        </S.Header>

        <S.TextArea 
          placeholder="Hôm nay các bé đã làm gì? (VD: Các bé đã học hát bài 'Cháu lên ba', chơi trò chơi vận động ngoài trời rất vui...)" 
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        {mediaUrl ? (
          <div style={{ position: 'relative' }}>
            <S.ImagePreview src={mediaUrl} alt="Đính kèm" />
            <button 
              onClick={() => setMediaUrl('')}
              style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' }}
            >✕</button>
          </div>
        ) : (
          <S.ImageUploadWrapper onClick={handleSimulateUpload}>
            <S.UploadIcon>📸</S.UploadIcon>
            <S.UploadText>Bấm vào đây để tải ảnh đính kèm (Giả lập)</S.UploadText>
          </S.ImageUploadWrapper>
        )}

        <S.ActionRow>
          <S.Button onClick={onClose}>Hủy bỏ</S.Button>
          <S.Button 
            $primary 
            onClick={handleSubmit} 
            disabled={!content.trim() || createNewsfeedMutation.isPending}
          >
            {createNewsfeedMutation.isPending ? 'Đang tạo...' : 'Đăng nhật ký'}
          </S.Button>
        </S.ActionRow>
      </S.ModalContainer>
    </S.Overlay>
  );
};
