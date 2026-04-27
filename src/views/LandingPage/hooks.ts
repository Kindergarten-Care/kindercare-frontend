import { KindercareToast } from '@/utils/KindercareToast';
import { useState } from 'react';

export const useLandingPage = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    phoneNumber: '',
    childBirthYear: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    KindercareToast.success('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm nhất.');
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
  };
};
