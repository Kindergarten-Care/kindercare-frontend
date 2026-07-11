import styled from 'styled-components';

export const SectionDivider = styled.div`
  margin: 12px 0;
  border-bottom: 1px dashed #e5e7eb;
`;

export const ClassRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

export const RemoveBtn = styled.button`
  background: #fee2e2;
  color: #ef4444;
  border: none;
  border-radius: 6px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: #fecaca;
    color: #b91c1c;
  }
`;

export const AddClassBtn = styled.button`
  align-self: flex-start;
  background: transparent;
  color: #005a36;
  border: 1px dashed #005a36;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 4px;
  transition: all 0.2s;

  &:hover {
    background: #e6f3ed;
  }
`;
