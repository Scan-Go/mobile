import config from '@lib/tamagui/config';
import { Theme } from '@react-navigation/native';

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: config.themes.dark.navigationBg.val,
    background: config.themes.dark.navigationBg.val,
    card: config.themes.dark.navigationCardBg.val,
    text: config.themes.dark.color.val,
    border: config.themes.dark.borderColor.val,
    notification: 'rgb(255, 69, 58)'
  }
};

export const LightTheme: Theme = {
  dark: true,
  colors: {
    primary: config.themes.light.navigationBg.val,
    background: config.themes.light.navigationBg.val,
    card: config.themes.light.navigationCardBg.val,
    text: config.themes.light.color.val,
    border: config.themes.light.borderColor.val,
    notification: 'rgb(255, 69, 58)'
  }
};
