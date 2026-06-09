import 'styled-components';
import { AppTheme } from '@kindercare/ui';

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {
    colors: AppTheme['colors'] & {
      primary: string;
      secondary?: string;
      accent?: string;
      background: string;
      text: string;
      textSecondary?: string;
      neutralLight?: string;
      neutralLighter?: string;
      borderMuted?: string;
      successLight?: string;
      success?: string;
    };
  }
}
