import 'styled-components';
import { ThemeType } from '@kindercare/ui';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
