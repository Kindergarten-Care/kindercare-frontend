import styled from 'styled-components';

export const Badge = styled.span<{ $published: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ $published }) => ($published ? '#DEF7EC' : '#f3f4f6')};
  color: ${({ $published }) => ($published ? '#03543F' : '#92400e')};
`;
