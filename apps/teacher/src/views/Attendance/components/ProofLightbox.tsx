import React from 'react';
import * as S from '../styles';
import { LeaveRequest } from '../../../config/types/attendance';
import { PROOF_BGS } from '../constants';

interface ProofLightboxProps {
  proof: LeaveRequest;
  onClose: () => void;
}

export const ProofLightbox: React.FC<ProofLightboxProps> = ({ proof, onClose }) => {
  return (
    <S.LightboxOverlay onClick={onClose}>
      <S.LightboxContainer onClick={e => e.stopPropagation()}>
        <S.LightboxMediaBox $bg={PROOF_BGS[0]}>
          <S.LightboxStripeOverlay />
          {proof.attachmentUrl ? (
            <S.LightboxImage src={proof.attachmentUrl} />
          ) : (
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>Không tải được ảnh</div>
          )}
        </S.LightboxMediaBox>
        <S.LightboxFooter>
          <S.LightboxCaption>{proof.studentName} · Đơn nghỉ phép</S.LightboxCaption>
          <S.LightboxCloseBtn onClick={onClose}>Đóng</S.LightboxCloseBtn>
        </S.LightboxFooter>
      </S.LightboxContainer>
    </S.LightboxOverlay>
  );
};
