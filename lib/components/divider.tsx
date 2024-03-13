import { PropsWithChildren } from "react";
import { SizableText, View, XStack } from "tamagui";

function DividerWithText({ children }: PropsWithChildren) {
  return (
    <XStack alignItems="center">
      <View flex={1} height={0.5} bg="$gray3Light" />
      <SizableText px="$4" textAlign="center" textAlignVertical="center">
        {children}
      </SizableText>
      <View flex={1} height={0.5} bg="$gray3Light" />
    </XStack>
  );
}

export default DividerWithText;
