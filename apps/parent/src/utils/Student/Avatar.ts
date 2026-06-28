/**
 * Extracts the initials from a full name (takes the last two words' first letters).
 * E.g., "Nguyễn Minh Khang" -> "MK"
 */
export const getInitials = (fullName: string): string => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    const first = parts[parts.length - 2][0];
    const last = parts[parts.length - 1][0];
    return `${first}${last}`.toUpperCase();
  }
  return fullName.substring(0, 2).toUpperCase();
};

/**
 * Returns a deterministic gradient based on the student's ID.
 */
export const getAvatarGradient = (id: number): string => {
  const gradients = [
    'linear-gradient(140deg,#0a7a4c,#005A36)', // Green
    'linear-gradient(140deg,#1e40af,#2563EB)', // Blue
    'linear-gradient(140deg,#7c2d12,#ea580c)', // Orange
    'linear-gradient(140deg,#581c87,#a855f7)', // Purple
    'linear-gradient(140deg,#831843,#db2777)', // Pink
  ];
  return gradients[id % gradients.length];
};
