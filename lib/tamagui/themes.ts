import { createSoftenMask, createThemeBuilder } from "@tamagui/theme-builder";
import { colorPalette_Dark, colorPalette_Light } from "./palette";

const themesBuilder = createThemeBuilder()
  .addPalettes({
    dark: colorPalette_Dark,
    light: colorPalette_Light,
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
      placeholderColor: -4,
    },
  })

  .addMasks({
    soften: createSoftenMask(),
  })

  .addThemes({
    light: {
      template: "base",
      palette: "light",
    },

    dark: {
      template: "base",
      palette: "dark",
    },
  })

  .addChildThemes({
    active: {
      mask: "soften",
      override: {
        color: 0,
        background: -1,
      },
    },
    subtle: {
      mask: "soften",
    },
  });

export default themesBuilder.build();
