import { Drama } from '@tamagui/lucide-icons';
import { ReactNode } from 'react';
import { H3, Paragraph, View, YStack } from 'tamagui';

interface IProps {
  message?: string;
  extra?: ReactNode;
}

export default function EmptyFlatlist({ message, extra }: IProps) {
  return (
    <YStack gap="$5">
      <View
        justifyContent="center"
        alignItems="center"
      >
        <Drama size="$4" />
        <H3>Inget data!</H3>
        <Paragraph>{message ?? 'Finns inget data tillgängligt.'}</Paragraph>
      </View>
      {extra ?? undefined}
    </YStack>
  );
}
