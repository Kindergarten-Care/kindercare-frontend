import React, { useState } from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  FormGroup,
  Label,
  RequiredStar,
  Input,
  ErrorText,
  ButtonGroup,
  CancelBtn,
  SubmitBtn,
  ClassRow,
  RemoveBtn,
  AddClassBtn,
  SectionDivider
} from './CreateGradeClassModal.styles';
import { kcToast, Dropdown } from '@kindercare/ui';
import { gradeService } from '@/services/grade/GradeService';
import { GradeDomainModel } from '@/config/types/grade';

interface CreateGradeClassModalProps {
  existingGrades: GradeDomainModel[];
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateGradeClassModal: React.FC<CreateGradeClassModalProps> = ({ existingGrades, onClose, onSuccess }) => {
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [customGradeName, setCustomGradeName] = useState('');
  const [classes, setClasses] = useState<string[]>(['']);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddClass = () => {
    setClasses([...classes, '']);
  };

  const handleRemoveClass = (index: number) => {
    const newClasses = classes.filter((_, i) => i !== index);
    setClasses(newClasses);
  };

  const handleClassChange = (index: number, value: string) => {
    const newClasses = [...classes];
    newClasses[index] = value;
    setClasses(newClasses);
    
    // Clear error for this specific class if any
    if (errors[`class_${index}`]) {
      setErrors(prev => ({ ...prev, [`class_${index}`]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedGrade) {
      newErrors.gradeName = 'Vui lòng chọn hoặc nhập tên Khối học';
    } else if (selectedGrade === 'NEW' && !customGradeName.trim()) {
      newErrors.customGradeName = 'Tên Khối học mới là bắt buộc';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Filter out empty class names and trim them
    const validClasses = classes
      .map(c => c.trim())
      .filter(c => c !== '');

    setIsSubmitting(true);
    try {
      const finalGradeName = selectedGrade === 'NEW' ? customGradeName.trim() : selectedGrade;
      await gradeService.createGradeAndClasses({
        gradeName: finalGradeName,
        classes: validClasses.length > 0 ? validClasses : undefined
      });
      kcToast.success('Tạo Khối/Lớp thành công!');
      onSuccess();
    } catch (error: any) {
      kcToast.error(error.message || 'Có lỗi xảy ra khi tạo Khối/Lớp');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Thêm Khối / Lớp học</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          
          <FormGroup>
            <Label>Tên Khối học <RequiredStar>*</RequiredStar></Label>
            <Dropdown
              value={selectedGrade}
              onChange={(val) => {
                setSelectedGrade(val);
                if (errors.gradeName) setErrors(prev => ({ ...prev, gradeName: '' }));
              }}
              options={[
                { value: 'NEW', label: '+ Tạo Khối mới' },
                ...existingGrades.map(g => ({ value: g.gradeName, label: g.gradeName }))
              ]}
              placeholder="Chọn Khối học..."
            />
            {errors.gradeName && <ErrorText>{errors.gradeName}</ErrorText>}
            
            {selectedGrade === 'NEW' && (
              <div style={{ marginTop: '12px' }}>
                <Input 
                  value={customGradeName}
                  onChange={(e) => {
                    setCustomGradeName(e.target.value);
                    if (errors.customGradeName) setErrors(prev => ({ ...prev, customGradeName: '' }));
                  }}
                  $hasError={!!errors.customGradeName}
                  placeholder="Nhập tên Khối mới (VD: Khối Mầm)"
                />
                {errors.customGradeName && <ErrorText>{errors.customGradeName}</ErrorText>}
              </div>
            )}
            
            <span style={{ fontSize: '0.8rem', color: '#666', marginTop: '6px' }}>
              Chọn Khối cũ để gộp lớp, hoặc chọn "Tạo Khối mới".
            </span>
          </FormGroup>

          <SectionDivider />
          
          <FormGroup>
            <Label>Các Lớp học (Tùy chọn)</Label>
            {classes.map((cls, index) => (
              <ClassRow key={index}>
                <Input 
                  style={{ flex: 1 }}
                  value={cls}
                  onChange={(e) => handleClassChange(index, e.target.value)}
                  placeholder={`Tên lớp ${index + 1} (VD: Mầm 1)`}
                />
                <RemoveBtn type="button" onClick={() => handleRemoveClass(index)} title="Xóa ô này">
                  &times;
                </RemoveBtn>
              </ClassRow>
            ))}
            <AddClassBtn type="button" onClick={handleAddClass}>
              + Thêm lớp học
            </AddClassBtn>
          </FormGroup>

          <ButtonGroup>
            <CancelBtn type="button" onClick={onClose} disabled={isSubmitting}>Hủy</CancelBtn>
            <SubmitBtn type="submit" $isLoading={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? 'Đang xử lý...' : 'Lưu thông tin'}
            </SubmitBtn>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};
