import { Conf } from '@lib/tamagui/config';

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

declare module '@tamagui/toast' {
  interface CustomData {
    toastType?: 'error' | 'success' | 'warning';
  }
}
