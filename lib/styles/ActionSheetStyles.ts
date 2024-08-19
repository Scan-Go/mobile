import { UseThemeResult } from '@tamagui/core';

export function ActionSheetStyles(theme: UseThemeResult): object {
  return {
    containerStyle: {
      backgroundColor: theme.backgroundFocus.val,
      borderColor: theme.borderColor.val
    },
    textStyle: {
      color: theme.color.val
    },
    titleTextStyle: {
      color: theme.color.val
    },
    separatorStyle: {
      borderColor: theme.borderColor.val
    }
  };
}
