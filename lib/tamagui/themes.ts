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
      background: 0,
      backgroundHover: 1,
      backgroundPress: 4,
      backgroundFocus: 5,
      backgroundStrong: 1,
      backgroundTransparent: 0,
      color: -1,
      colorHover: -4,
      colorPress: -2,
      colorFocus: -4,
      colorTransparent: -0,
      borderColor: 8,
      borderColorHover: 6,
      borderColorFocus: 4,
      borderColorPress: 5,
      placeholderColor: -4,
      shadowColor: -5,
      shadowColorFocus: -5,
      shadowColorHover: -6,
      shadowColorPress: -6
    },
    dark: {
      navigationBg: -2,
      navigationCardBg: -2,
      primary: 7,
      background: 0,
      backgroundHover: 7,
      backgroundPress: 4,
      backgroundFocus: 5,
      backgroundStrong: 1,
      backgroundTransparent: 0,
      color: -7,
      colorHover: 2,
      colorPress: 1,
      colorFocus: 2,
      colorTransparent: 0,
      borderColor: 8,
      borderColorHover: 8,
      borderColorFocus: 8,
      borderColorPress: 8,
      placeholderColor: 4
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
        color: -1
      }
    },
    subtle: {
      mask: 'soften'
    }
  });

export default themesBuilder.build();
