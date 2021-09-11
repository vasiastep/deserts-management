import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

import { breakpoints } from './system/breakpoints';
import { colors } from './system/colors';
import { fontStyle } from './system/fonts';
import { spacing } from './system/spacing';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: -apple-system,Roboto,Helvetica Neue,Arial,sans-serif;
  }

  a {
    text-decoration: none;

    &:focus,
    &:hover {
      text-decoration: none;
    }
  }
`;

export const theme: DefaultTheme = {
  // patterns
  breakpoints,
  colors,
  fontStyle,
  spacing,
  // components
};
