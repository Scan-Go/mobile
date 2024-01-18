import fonts from '@lib/tamagui/fonts';
import themes from '@lib/tamagui/themes';
import tokens from '@lib/tamagui/tokens';
import { createAnimations } from '@tamagui/animations-moti';
import { config } from '@tamagui/config/v2-native';
import { createTamagui } from 'tamagui';

const tamaguiConfig = createTamagui({
  ...config,
  fonts: {
    heading: fonts.headingFont,
    body: fonts.bodyFont
  },
  themes,
  tokens,
  animations: createAnimations({
    fast: {
      type: 'spring',
      damping: 20,
      mass: 1.2,
      stiffness: 250
    },
    medium: {
      type: 'spring',
      damping: 10,
      mass: 0.9,
      stiffness: 100
    },
    slow: {
      type: 'spring',
      damping: 20,
      stiffness: 60
    }
  })
});

export type Conf = typeof tamaguiConfig;


declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
