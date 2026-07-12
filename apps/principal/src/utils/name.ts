export const getFirstName = (fullName: string): string => {
  if (!fullName) return '';
  const parts = fullName.trim().split(' ');
  return parts[parts.length - 1];
};

export const getLastName = (fullName: string): string => {
  if (!fullName) return '';
  const parts = fullName.trim().split(' ');
  parts.pop();
  return parts.join(' ');
};
