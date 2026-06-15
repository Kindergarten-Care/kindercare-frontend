'use client';

import React, { useState, useRef } from 'react';
import * as S from './styles';
import { IconClose, IconCheck, IconMedicine, IconPlus } from '@/assets/icons/dashboard';

interface MedicineItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  selectedTimes: string[];
  photo: File | null;
  photoUrl: string | null;
}

interface MedicationRequestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  className: string;
}

const TIMING_OPTIONS = [
  'Sau ăn sáng',
  'Sau ăn trưa',
  'Trước khi ngủ',
  'Khi cần'
];

const createEmptyMedicine = (index: number): MedicineItem => ({
  id: `med-${Date.now()}-${index}`,
  name: '',
  dosage: '',
  frequency: '',
  selectedTimes: ['Sau ăn trưa'],
  photo: null,
  photoUrl: null
});

const MedicationRequestPopup: React.FC<MedicationRequestPopupProps> = ({
  isOpen,
  onClose,
  studentName,
  className
}) => {
  const [medicines, setMedicines] = useState<MedicineItem[]>([createEmptyMedicine(1)]);
  const [generalNote, setGeneralNote] = useState<string>('');
  const activeUrlsRef = useRef<Set<string>>(new Set());

  // Cleanup all active Object URLs on unmount to prevent memory leaks
  React.useEffect(() => {
    return () => {
      activeUrlsRef.current.forEach(url => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  if (!isOpen) return null;

  const handleAddMedicine = () => {
    setMedicines(prev => [...prev, createEmptyMedicine(prev.length + 1)]);
  };

  const cleanupUrls = () => {
    activeUrlsRef.current.forEach(url => {
      URL.revokeObjectURL(url);
    });
    activeUrlsRef.current.clear();
  };

  const handleClose = () => {
    cleanupUrls();
    onClose();
  };

  const handleRemoveMedicine = (id: string) => {
    if (medicines.length <= 1) return;
    setMedicines(prev => {
      const target = prev.find(m => m.id === id);
      if (target?.photoUrl) {
        URL.revokeObjectURL(target.photoUrl);
        activeUrlsRef.current.delete(target.photoUrl);
      }
      return prev.filter(m => m.id !== id);
    });
  };

  const handleFieldChange = (id: string, field: keyof MedicineItem, value: any) => {
    setMedicines(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, [field]: value };
      }
      return m;
    }));
  };

  const handleTimeToggle = (id: string, time: string) => {
    setMedicines(prev => prev.map(m => {
      if (m.id === id) {
        const isSelected = m.selectedTimes.includes(time);
        const nextTimes = isSelected
          ? m.selectedTimes.filter(t => t !== time)
          : [...m.selectedTimes, time];
        return { ...m, selectedTimes: nextTimes };
      }
      return m;
    }));
  };

  const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newUrl = URL.createObjectURL(file);
      activeUrlsRef.current.add(newUrl);

      setMedicines(prev => prev.map(m => {
        if (m.id === id) {
          if (m.photoUrl) {
            URL.revokeObjectURL(m.photoUrl);
            activeUrlsRef.current.delete(m.photoUrl);
          }
          return { ...m, photo: file, photoUrl: newUrl };
        }
        return m;
      }));
    }
  };

  const handleRemovePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setMedicines(prev => prev.map(m => {
      if (m.id === id) {
        if (m.photoUrl) {
          URL.revokeObjectURL(m.photoUrl);
          activeUrlsRef.current.delete(m.photoUrl);
        }
        return { ...m, photo: null, photoUrl: null };
      }
      return m;
    }));

    const inputEl = document.getElementById(`file-input-${id}`) as HTMLInputElement;
    if (inputEl) {
      inputEl.value = '';
    }
  };

  const handleSubmit = () => {
    // Basic validation
    const invalidMed = medicines.find(m => !m.name.trim());
    if (invalidMed) {
      alert('Vui lòng điền đầy đủ tên thuốc!');
      return;
    }

    const submittedData = {
      studentName,
      className,
      medicines: medicines.map((m, idx) => ({
        index: idx + 1,
        name: m.name.trim(),
        dosage: m.dosage.trim() || 'Không ghi rõ',
        frequency: m.frequency.trim() || 'Không ghi rõ',
        timing: m.selectedTimes.join(', ') || 'Không chọn',
        photoName: m.photo ? m.photo.name : 'Không đính kèm'
      })),
      generalNote: generalNote.trim() || 'Không có ghi chú thêm'
    };

    console.log('--- Gửi dặn dò thuốc ---', submittedData);

    const medString = submittedData.medicines
      .map(
        m =>
          `• Thuốc ${m.index}: ${m.name}\n` +
          `  - Liều lượng: ${m.dosage}\n` +
          `  - Tần suất: ${m.frequency}\n` +
          `  - Thời điểm: ${m.timing}\n` +
          `  - Minh chứng: ${m.photoName}`
      )
      .join('\n\n');

    alert(
      `Gửi dặn dò thuốc thành công!\n\n` +
      `• Học sinh: ${submittedData.studentName}\n` +
      `• Lớp: ${submittedData.className}\n\n` +
      `Chi tiết dặn dò:\n${medString}\n\n` +
      `• Lưu ý chung: ${submittedData.generalNote}`
    );

    // Reset state and close
    cleanupUrls();
    setMedicines([createEmptyMedicine(1)]);
    setGeneralNote('');
    onClose();
  };

  return (
    <S.Overlay onClick={handleClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.HeadRow>
          <S.IconBox>
            <IconMedicine size={22} color="#dc2626" />
          </S.IconBox>
          <S.TitleWrap>
            <S.Title>Dặn dò thuốc</S.Title>
            <S.Subtitle>Gửi giáo viên cho bé {studentName} · Lớp {className}</S.Subtitle>
          </S.TitleWrap>
          <S.CloseBtn onClick={handleClose} aria-label="Đóng popup">
            <IconClose size={16} />
          </S.CloseBtn>
        </S.HeadRow>

        <S.ContentForm>
          {medicines.map((med, index) => {
            const photoUrl = med.photoUrl;
            return (
              <S.MedicineCard key={med.id}>
                <S.CardHeader>
                  <S.CardBadge>
                    <IconMedicine size={12} color="var(--brand)" />
                    Thuốc {index + 1}
                  </S.CardBadge>
                  {medicines.length > 1 && (
                    <S.RemoveCardBtn type="button" onClick={() => handleRemoveMedicine(med.id)}>
                      <IconClose size={12} color="#dc2626" />
                      Xóa thuốc
                    </S.RemoveCardBtn>
                  )}
                </S.CardHeader>

                <S.CardBodyGrid>
                  {/* Image Attachment widget */}
                  <S.ImageUploadSlot onClick={() => document.getElementById(`file-input-${med.id}`)?.click()}>
                    {photoUrl ? (
                      <>
                        <S.AttachedImagePreview src={photoUrl} alt={`Ảnh thuốc ${index + 1}`} />
                        <S.ImageOverlayActions>
                          <S.RemovePhotoBtn type="button" onClick={(e) => handleRemovePhoto(med.id, e)}>
                            Xóa ảnh
                          </S.RemovePhotoBtn>
                        </S.ImageOverlayActions>
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: '18px' }}>📷</span>
                        <S.UploadSlotLabel>Đính kèm ảnh</S.UploadSlotLabel>
                      </>
                    )}
                    <input
                      type="file"
                      id={`file-input-${med.id}`}
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={(e) => handleFileChange(med.id, e)}
                    />
                  </S.ImageUploadSlot>

                  {/* Input Fields */}
                  <S.CardFieldsWrap>
                    {/* Tên thuốc */}
                    <S.InputGroup>
                      <S.InputLabel>Tên thuốc</S.InputLabel>
                      <S.StyledInput
                        type="text"
                        placeholder="Ví dụ: Siro ho Prospan"
                        value={med.name}
                        onChange={(e) => handleFieldChange(med.id, 'name', e.target.value)}
                      />
                    </S.InputGroup>

                    {/* Dosage and Frequency side-by-side */}
                    <S.RowGrid2>
                      <S.InputGroup>
                        <S.InputLabel>Liều lượng</S.InputLabel>
                        <S.StyledInput
                          type="text"
                          placeholder="5ml / 1 viên"
                          value={med.dosage}
                          onChange={(e) => handleFieldChange(med.id, 'dosage', e.target.value)}
                        />
                      </S.InputGroup>

                      <S.InputGroup>
                        <S.InputLabel>Số lần / ngày</S.InputLabel>
                        <S.StyledInput
                          type="text"
                          placeholder="2 lần"
                          value={med.frequency}
                          onChange={(e) => handleFieldChange(med.id, 'frequency', e.target.value)}
                        />
                      </S.InputGroup>
                    </S.RowGrid2>

                    {/* Timing selection */}
                    <div>
                      <S.TimingLabel>Thời điểm uống</S.TimingLabel>
                      <S.PillsRow>
                        {TIMING_OPTIONS.map(time => (
                          <S.PillBtn
                            key={time}
                            type="button"
                            $active={med.selectedTimes.includes(time)}
                            onClick={() => handleTimeToggle(med.id, time)}
                          >
                            {time}
                          </S.PillBtn>
                        ))}
                      </S.PillsRow>
                    </div>
                  </S.CardFieldsWrap>
                </S.CardBodyGrid>
              </S.MedicineCard>
            );
          })}

          {/* Add more button */}
          <S.AddMoreBtn type="button" onClick={handleAddMedicine}>
            <IconPlus size={14} color="var(--brand)" />
            Thêm loại thuốc khác
          </S.AddMoreBtn>

          {/* General Notes for teacher */}
          <S.FormGroup>
            <S.SectionLabel>Lưu ý chung cho giáo viên (tùy chọn)</S.SectionLabel>
            <S.StyledTextarea
              placeholder="Ví dụ: Tất cả thuốc để trong ba lô, ngăn trước..."
              value={generalNote}
              onChange={(e) => setGeneralNote(e.target.value)}
            />
          </S.FormGroup>
        </S.ContentForm>

        <S.Footer>
          <S.CancelBtn type="button" onClick={handleClose}>
            Hủy
          </S.CancelBtn>
          <S.SubmitBtn type="button" onClick={handleSubmit}>
            <IconCheck size={16} color="#ffffff" />
            Gửi dặn dò
          </S.SubmitBtn>
        </S.Footer>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default MedicationRequestPopup;
