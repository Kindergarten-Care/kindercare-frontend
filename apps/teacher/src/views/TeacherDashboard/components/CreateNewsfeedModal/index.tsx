import React, { useState, useRef } from 'react';
import * as S from './styles';
import { useCreateNewsfeed } from '@/hooks/useTeacherQueries';
import { NewsfeedService } from '@/services/newsfeed';

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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Task 5.6: Ràng buộc File (Validation)
    // 1. Chỉ cho phép ảnh và video
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      alert('Chỉ hỗ trợ tải lên tệp định dạng Ảnh hoặc Video.');
      return;
    }

    // 2. Giới hạn dung lượng 20MB
    const MAX_SIZE_MB = 20;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`Dung lượng file quá lớn. Vui lòng chọn file dưới ${MAX_SIZE_MB}MB.`);
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      const url = await NewsfeedService.uploadImage(file, (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      if (url) {
        setMediaUrl(url);
      }
    } catch (error) {
      console.error('Lỗi khi tải ảnh:', error);
      alert('Tải ảnh lên thất bại. Hãy kiểm tra kết nối mạng hoặc thử lại sau.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
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
          <S.ImageUploadWrapper onClick={handleTriggerUpload}>
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/jpg, image/webp"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {isUploading ? (
              <div style={{ width: '100%', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <S.UploadText>⏳ Đang tải ảnh lên... {uploadProgress}%</S.UploadText>
                <div style={{ width: '100%', height: '8px', background: '#E5E7EB', borderRadius: '4px', marginTop: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${uploadProgress}%`, background: '#005A36', transition: 'width 0.2s' }} />
                </div>
              </div>
            ) : (
              <>
                <S.UploadIcon>📸</S.UploadIcon>
                <S.UploadText>Bấm vào đây để tải ảnh đính kèm (Tối đa 20MB)</S.UploadText>
              </>
            )}
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
