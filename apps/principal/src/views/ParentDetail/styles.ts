import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px 100px;
  width: 100%;
  box-sizing: border-box;
  background-color: #f8fafc;
  min-height: 100vh;
`;

export const TopActions = styled.div`
  margin-bottom: 16px;
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  color: #6b7280;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    color: #111827;
  }
`;

export const HeaderCard = styled.div`
  background: linear-gradient(135deg, #e6f6ec 0%, #f0fdf4 100%);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const BigAvatar = styled.div<{ $color?: string }>`
  width: 90px;
  height: 90px;
  border-radius: 20px;
  background-color: ${({ $color }) => $color || '#fb923c'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(251, 146, 60, 0.3);
`;

export const BigAvatarImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const ParentName = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
`;

export const ParentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.875rem;
`;

export const UsernameTag = styled.span`
  color: #6b7280;
  font-weight: 500;
`;

export const RoleTag = styled.span`
  color: #047857;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #047857;
  }
`;

export const EditButton = styled.button`
  background: white;
  border: 1px solid #e5e7eb;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  color: #374151;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
`;

export const SectionCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const SectionIconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ecfdf5;
  color: #047857;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CountBadge = styled.span`
  background-color: #ecfdf5;
  color: #047857;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px 16px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InfoLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const InfoValue = styled.span`
  font-size: 0.95rem;
  color: #111827;
  font-weight: 600;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #f3f4f6;
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: 16px;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
`;

export const Tr = styled.tr`
  &:last-child ${Td} {
    border-bottom: none;
  }
`;

export const StudentInfoCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SmallAvatar = styled.div<{ $bg?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ $bg }) => $bg || '#f472b6'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const SmallAvatarImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Badge = styled.span<{ $type?: 'class' | 'genderF' | 'genderM' | 'primary' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;

  ${({ $type }) => {
    switch ($type) {
      case 'class':
        return 'background: #dcfce7; color: #166534;';
      case 'genderF':
        return 'background: #fce7f3; color: #9d174d;';
      case 'genderM':
        return 'background: #dbeafe; color: #1e40af;';
      case 'primary':
        return 'background: #dcfce7; color: #166534;';
      default:
        return 'background: #f3f4f6; color: #374151;';
    }
  }}
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

export const ModalButton = styled.button.attrs({ type: 'button' })<{ $danger?: boolean, $primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ $danger, $primary }) => ($danger ? '#EF4444' : $primary ? '#4F46E5' : '#E5E7EB')};
  color: ${({ $danger, $primary }) => ($danger || $primary ? 'white' : '#374151')};
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
