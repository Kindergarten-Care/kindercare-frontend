export const getStudentInitials = (fullName: string): string => {
  if (!fullName) return '?';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  // Chữ cái đầu của tên lót + chữ cái đầu của tên
  const middleNameInitial = parts[parts.length - 2].charAt(0).toUpperCase();
  const firstNameInitial = parts[parts.length - 1].charAt(0).toUpperCase();
  return middleNameInitial + firstNameInitial;
};
