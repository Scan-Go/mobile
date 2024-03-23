import { SwitchFrame, SwitchThumb, createSwitch, styled } from 'tamagui';

const AppSwitchFrame = styled(SwitchFrame, {
  variants: {
    unstyled: {
      false: {
        borderRadius: 1000,
        backgroundColor: '$backgroundStrong',
        borderWidth: 2,
        borderColor: '$backgroundStrong'
      }
    },

    checked: {
      true: {}
    }
  } as const
});

const AppSwitchThumb = styled(SwitchThumb, {
  variants: {
    checked: {
      true: {
        backgroundColor: '$backgroundFocus'
      },
      false: {
        backgroundColor: '$background'
      }
    }
  } as const
});

export default createSwitch({
  Frame: AppSwitchFrame,
  Thumb: AppSwitchThumb
});
