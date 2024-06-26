import { createSoftenMask, createThemeBuilder } from '@tamagui/theme-builder';
import { colorPalette_Dark, colorPalette_Light } from './palette';

const themesBuilder = createThemeBuilder()
  .addPalettes({
    dark: colorPalette_Dark,
    light: colorPalette_Light
  })
  .addTemplates({
    light: {
      navigationBg: -2,
      navigationCardBg: -2,
      primary: 7,
      background: 1,
      backgroundHover: 2,
      backgroundPress: 4,
      backgroundFocus: 2,
      backgroundStrong: -2,
      backgroundTransparent: -0,
      color: -3,
      colorHover: -4,
      colorPress: -2,
      colorFocus: -9,
      colorTransparent: -0,
      borderColor: 10,
      borderColorHover: 6,
      borderColorFocus: 4,
      borderColorPress: 5,
      placeholderColor: 4,
      shadowColor: -5,
      shadowColorFocus: -5,
      shadowColorHover: -6,
      shadowColorPress: -6
    },
    dark: {
      navigationBg: -2,
      navigationCardBg: -2,
      primary: 7,
      background: -3,
      backgroundHover: -5,
      backgroundPress: 4,
      backgroundFocus: 5,
      backgroundStrong: -2,
      backgroundTransparent: -0,
      color: -9,
      colorHover: 2,
      colorPress: 1,
      colorFocus: -9,
      colorTransparent: 0,
      borderColor: 10,
      borderColorHover: 8,
      borderColorFocus: 8,
      borderColorPress: 8,
      placeholderColor: 4,
      shadowColor: -5,
      shadowColorFocus: -5,
      shadowColorHover: -6,
      shadowColorPress: -6
    }
  })
  .addMasks({
    soften: createSoftenMask()
  })
  .addThemes({
    light: {
      template: 'light',
      palette: 'light'
    },
    dark: {
      template: 'dark',
      palette: 'dark'
    }
  })
  .addChildThemes({
    active: {
      mask: 'soften',
      override: {
        background: -5,
        color: -5
      }
    },
    surface: {
      mask: 'soften',
      override: {
        background: 0,
        backgroundFocus: 5
      }
    },

    subtle: {
      mask: 'soften'
    }
  });

export default themesBuilder.build();
