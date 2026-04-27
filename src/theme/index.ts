export const theme = {
  colors: {
    primary: '#2B694D',
    textDark: '#191C1D',
    textGray: '#404943',
    bgLight: '#F8F9FA',
    bgWhite: '#FFFFFF',
    accentYellow: '#E5E7A0',
    accentBlue: '#A1D1FE',
    accentLightBlue: '#CDE5FF',
    accentGreen: '#95D5B2',
    accentMint: '#B0F1CC',
    accentDarkGreen: '#1E5E42',
    accentDarkBlue: '#265A81',
    borderLight: 'rgba(191, 201, 193, 0.3)',
    borderDark: '#BFC9C1',
  },
  fonts: {
    main: 'Lexend, sans-serif',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    black: 900,
  },
};

export type Theme = typeof theme;
