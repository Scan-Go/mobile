import { styled, Button as TButton } from "tamagui";

const Button = styled(TButton, {
  variants: {
    outlined: {
      true: {
        borderColor: "$backgroundFocus",
      },
    },
  } as const,
});

export default Button;
