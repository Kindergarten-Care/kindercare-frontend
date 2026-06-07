import styled from 'styled-components';

export const FeeCard = styled.div`
  background: var(--surface, #ffffff);
  border: 1.5px solid #fde68a;
  border-radius: var(--r-lg, 16px);
  padding: 16px 18px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--warn, #c77b0a);
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Ico = styled.div`
  width: 32px;
  height: 32px;
  background: var(--warn-light, #fef3c7);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const TextWrap = styled.div`
  strong {
    display: block;
    font-size: 13px;
    font-weight: 700;
  }
  span {
    font-size: 11px;
    color: var(--muted, #627062);
  }
`;

export const Amount = styled.div`
  text-align: right;

  strong {
    display: block;
    font-size: 18px;
    font-weight: 900;
    color: var(--warn, #c77b0a);
    letter-spacing: -0.02em;
  }
  span {
    font-size: 11px;
    color: var(--warn, #c77b0a);
    font-weight: 700;
  }
`;

export const PayBtn = styled.button`
  width: 100%;
  background: var(--warn, #c77b0a);
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 0.15s;

  &:hover {
    background: #a16207;
  }
`;
