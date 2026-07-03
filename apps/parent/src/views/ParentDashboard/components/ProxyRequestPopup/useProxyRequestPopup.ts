import { useState, useRef } from 'react';
import { toast } from '@kindercare/ui';
import { useStudent } from '@/contexts/StudentContext';
import { proxyRequestService } from '@/services/ProxyRequest/ProxyRequestService';

interface UseProxyRequestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export const useProxyRequestPopup = ({ isOpen, onClose, onSubmitSuccess }: UseProxyRequestPopupProps) => {
  const { activeStudent } = useStudent();
  const [authorizationDate, setAuthorizationDate] = useState<string>('');
  const [type, setType] = useState<'checkin' | 'checkout' | 'both'>('checkout');
  const [proxyName, setProxyName] = useState<string>('');
  const [proxyPhone, setProxyPhone] = useState<string>('');
  const [proxyIDCard, setProxyIDCard] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Kích thước ảnh không vượt quá 5MB');
        return;
      }
      setAttachedFile(file);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!activeStudent?.studentId) return;

    if (!authorizationDate) {
      toast.error('Vui lòng chọn ngày ủy quyền');
      return;
    }
    if (!proxyName.trim()) {
      toast.error('Vui lòng nhập họ tên người được ủy quyền');
      return;
    }

    setIsSubmitting(true);
    try {
      const authDateSeconds = Math.floor(new Date(authorizationDate).getTime() / 1000);
      
      await proxyRequestService.createProxyRequest(
        {
          studentId: activeStudent.studentId,
          authorizationDate: authDateSeconds,
          type,
          proxyName: proxyName.trim(),
          proxyPhone: proxyPhone.trim() || null,
          proxyIDCard: proxyIDCard.trim() || null,
          notes: notes.trim() || null,
        },
        attachedFile
      );

      toast.success('Đăng ký ủy quyền đưa đón thành công!');
      
      // Reset state
      setAuthorizationDate('');
      setType('checkout');
      setProxyName('');
      setProxyPhone('');
      setProxyIDCard('');
      setNotes('');
      setAttachedFile(null);
      
      if (onSubmitSuccess) onSubmitSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Có lỗi xảy ra khi tạo đơn ủy quyền');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    authorizationDate,
    setAuthorizationDate,
    type,
    setType,
    proxyName,
    setProxyName,
    proxyPhone,
    setProxyPhone,
    proxyIDCard,
    setProxyIDCard,
    notes,
    setNotes,
    attachedFile,
    isSubmitting,
    fileInputRef,
    todayStr,
    handleFileChange,
    handleTriggerUpload,
    handleRemoveFile,
    handleSubmit,
  };
};
