import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px 100px;
  box-sizing: border-box;
  width: 100%;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 60px;
  color: #64748b;
  font-size: 15px;
`;

export const ErrorText = styled.div`
  text-align: center;
  padding: 60px;
  color: #ef4444;
  font-size: 15px;
`;

/* ─── Header Card ─── */
export const HeaderCard = styled.div`
  background: linear-gradient(135deg, #047857 0%, #065f46 100%);
  border-radius: 16px;
  padding: 28px 32px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    right: -40px;
    top: -40px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const AvatarWrapper = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 3px solid rgba(255, 255, 255, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InitialsText = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
`;

export const HeaderInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StudentName = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px 0;
  letter-spacing: 0.2px;
`;

export const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Badge = styled.span<{ $variant?: 'code' | 'class' | 'status' | 'default' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;

  ${props => {
    switch (props.$variant) {
      case 'code':
        return `
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.3);
        `;
      case 'class':
        return `
          background: rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.25);
        `;
      case 'status':
        return `
          background: #fff;
          color: #047857;
          font-weight: 600;
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.85);
        `;
    }
  }}

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  flex-shrink: 0;
`;

export const ChangeClassButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 8px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.28);
    border-color: rgba(255, 255, 255, 0.5);
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
    color: #fff;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const TopBackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin-bottom: 20px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #475569;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f8fafc;
    color: #0f172a;
    border-color: #cbd5e1;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

/* ─── Content Cards ─── */
export const SectionCard = styled.div`
  background: white;
  border-radius: 14px;
  border: 1px solid #e9ecef;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1.5px solid #f1f3f5;
`;

export const SectionIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #ecfdf5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #047857;
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 32px;
  align-items: start;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div``;

export const InfoLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 4px;
`;

export const InfoValue = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
  line-height: 1.4;
`;

export const AllergyNote = styled.div<{ $hasContent: boolean }>`
  grid-column: 1 / -1;
  background: ${props => props.$hasContent ? '#fef3c7' : '#f8fafc'};
  border: 1px solid ${props => props.$hasContent ? '#fde68a' : '#f1f3f5'};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 13px;
  color: ${props => props.$hasContent ? '#92400e' : '#94a3b8'};
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 4px;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

export const EmptyText = styled.div`
  text-align: center;
  padding: 32px;
  color: #94a3b8;
  font-size: 14px;
`;

/* ─── Parent Card ─── */
export const ParentCard = styled.div`
  background: #f8fafc;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 12px;
  border: 1px solid #f1f3f5;
  transition: border-color 0.2s;

  &:hover {
    border-color: #cbd5e1;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ParentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ParentName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ParentRelationship = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 6px;
`;

export const PrimaryBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #4338ca;
  background: #eef2ff;
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid #c7d2fe;
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #a7f3d0;
  background: #ecfdf5;
  color: #047857;
  margin-left: auto;

  &:hover {
    background: #d1fae5;
    border-color: #6ee7b7;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;
