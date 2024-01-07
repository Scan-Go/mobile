import { createSoftenMask, createThemeBuilder } from '@tamagui/theme-builder';

const strengthenBackground = (template: any) => ({
  background: template.background
});

const colorPalette_Light = [
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
];

const colorPalette_Dark = [
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
];

const themesBuilder = createThemeBuilder()
  .addPalettes({
    dark: colorPalette_Dark,
    light: colorPalette_Light
  })
  .addTemplates({
    base: {
      background: 0,
      backgroundHover: 3,
      backgroundPress: 4,
      backgroundFocus: 5,
      backgroundStrong: 1,
      backgroundTransparent: 0,
      color: -0,
      colorHover: -2,
      colorPress: -1,
      colorFocus: -2,
      colorTransparent: -0,
      borderColor: 5,
      borderColorHover: 6,
      borderColorFocus: 4,
      borderColorPress: 5,
      placeholderColor: -4
    }
  })
  .addMasks({
    soften: createSoftenMask()
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
    active: {
      mask: 'soften',
      override: {
        color: 0,
        background: -1
      }
    },
    subtle: {
      mask: 'soften'
    }
  });

export default themesBuilder.build();
