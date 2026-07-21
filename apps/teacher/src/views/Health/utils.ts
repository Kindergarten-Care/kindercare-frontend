import { getStudentInitials } from '@/utils/string';

const AVATAR_GRADIENTS = [
  '#F87171', '#FB923C', '#FBBF24', '#34D399', '#38BDF8', '#818CF8', '#E879F9', '#F472B6',
];

export const getAvatarGrad = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

export const getInitials = (name: string) => getStudentInitials(name);

export const isValidHeightWeight = (height: number, weight: number) =>
  !!height && !!weight && height >= 50 && height <= 200 && weight >= 5 && weight <= 150;
