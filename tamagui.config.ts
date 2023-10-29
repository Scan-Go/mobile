import { createAnimations } from '@tamagui/animations-react-native';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import {
  createStrengthenMask,
  createThemeBuilder
} from '@tamagui/theme-builder';
import { tokens } from '@tamagui/themes';
import { createFont, createTamagui, createTokens } from 'tamagui';

const themesBuilder = createThemeBuilder()
  .addPalettes({
    dark: [
      '#000000',
      '#190c07',
      '#33180f',
      '#4c2416',
      '#66301d',
      '#7f3d25',
      '#98492c',
      '#b25533',
      '#cb613a',
      '#e56d42',
      '#fe7949',
      '#fff'
    ],
    light: [
      '#fff',
      '#fff2ed',
      '#ffe4db',
      '#ffd7c8',
      '#ffc9b6',
      '#ffbca4',
      '#feaf92',
      '#fea180',
      '#fe946d',
      '#fe865b',
      '#fe7949',
      '#000'
    ]
  })
  .addTemplates({
    base: {
      background: 0,
      backgroundHover: 5,
      backgroundPress: 6,
      backgroundFocus: 3,
      backgroundStrong: 4,
      backgroundTransparent: -0,
      color: -0,
      colorHover: -2,
      colorPress: -1,
      colorFocus: -2,
      colorTransparent: -0,
      borderColor: -1,
      borderColorHover: 6,
      borderColorFocus: 4,
      borderColorPress: 5,
      placeholderColor: -1
    }
  })
  .addMasks({
    soften: createStrengthenMask()
  })
  .addThemes({
    light: {
      template: 'base',
      palette: 'light'
    },
    dark: {
      template: 'base',
      palette: 'dark'
    }
  })
  .addChildThemes({
    subtle: {
      mask: 'soften'
    }
  });

export const themes = themesBuilder.build();

const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250
  }
});

const customTokens = createTokens({
  ...tokens,
  color: {
    ...tokens.color,
    primary: '#FE7949',
    secondary: '#8370f6',
    blue: '#8caeff',
    gray: '#808080',
    green: '#1ED760',
    orange: '#fcc688',
    pink: '#c498f9',
    purple: '#c498f9',
    red: '#ff4d4d',
    yellow: '#c498f9'
  }
});

const defaultSizes = {
  1: 11,
  2: 12,
  3: 13,
  4: 14,
  true: 14,
  5: 16,
  6: 18,
  7: 20,
  8: 23,
  9: 30,
  10: 46,
  11: 55,
  12: 62,
  13: 72,
  14: 92,
  15: 114,
  16: 134
};
const s = (size) => size * 1;

const size = Object.fromEntries(
  Object.entries({
    ...defaultSizes
  }).map(([k, v]) => [k, s(v)])
);

const font = createFont({
  family: 'SourceSans',
  size,
  face: {
    400: { normal: 'SourceSans' },
    500: { normal: 'SourceSans' },
    600: { normal: 'SourceSans-Semibold' },
    700: { normal: 'SourceSans-Bold' }
  }
});

const config = createTamagui({
  animations,
  defaultTheme: 'dark',
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  fonts: {
    heading: font,
    body: font
  },
  themes,
  tokens: customTokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' }
  })
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}

declare module '@tamagui/toast' {
  interface CustomData {
    toastType?: 'error' | 'success' | 'warning';
  }
}

export default config;
