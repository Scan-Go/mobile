import config from '@lib/tamagui/config';
import { Theme } from '@react-navigation/native';

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: config.themes.dark.backgroundFocus.val,
    background: config.themes.dark.background.val,
    card: config.themes.dark.background05.val,
    text: config.themes.dark.color.val,
    border: config.themes.dark.borderColor.val,
    notification: 'rgb(255, 69, 58)'
  }
};

export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: config.themes.light.backgroundFocus.val,
    background: config.themes.light.background.val,
    card: config.themes.light.background05.val,
    text: config.themes.light.color.val,
    border: config.themes.light.borderColor.val,
    notification: 'rgb(255, 69, 58)'
  }
};
