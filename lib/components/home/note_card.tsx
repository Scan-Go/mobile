import { INoteWithTagName } from '@lib/models/note.model';
import { formatDistanceToNow } from 'date-fns';
import { sv } from 'date-fns/locale';
import { useMemo } from 'react';
import { H4, Paragraph, Text, Theme, View, XStack, YStack } from 'tamagui';

type IProps = {
  onPress: () => void;
} & Pick<INoteWithTagName, 'tag' | 'content' | 'expire_at'>;

export default function NoteCard({ content, tag, expire_at, onPress }: IProps) {
  const formattedDate = useMemo(() => {
    return formatDistanceToNow(expire_at, {
      addSuffix: true,
      locale: sv
    });
  }, [expire_at]);

  return (
    <Theme name="surface">
      <View
        onPress={onPress}
        borderRadius="$5"
        p="$5"
        bg="$background"
        cursor="pointer"
        animation="bouncy"
        hoverStyle={{ scale: 0.98, bg: '$backgroundHover' }}
      >
        <YStack
          gap="$3"
          flex={1}
          flexWrap="wrap"
        >
          <View>
            <H4>{tag.name}</H4>
            <Paragraph>{content}</Paragraph>
          </View>

          <XStack
            gap="$5"
            alignItems="center"
          >
            <Text
              fontSize="$2"
              theme="surface"
              bg="$backgroundFocus"
              p="$1.5"
              borderRadius="$3"
            >
              Ogiltigt {formattedDate}
            </Text>
          </XStack>
        </YStack>
      </View>
    </Theme>
  );
}
