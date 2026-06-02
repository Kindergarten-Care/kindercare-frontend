import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      surface: string;
      [key: string]: any;
    };
    fonts: {
      display: string;
      body: string;
      [key: string]: any;
    };
    breakpoints?: {
      lg?: string;
      [key: string]: any;
    };
    [key: string]: any;
  }
}
