import BackgroundSVG from '@assets/images/card_bg.svg';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { Paragraph, Text, View, XStack, YStack, styled } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';

interface IProps {
  isActive: boolean;
  name: string;
  note: string;
  created_at: string;
}

const Indicator = styled(View, {
  borderRadius: '$12',
  w: '$0.75',
  h: '$0.75'
});

export default function TagCard({ created_at, isActive, name, note }: IProps) {
  return (
    <View
      animation="bouncy"
      hoverStyle={{ scale: 0.98 }}
      pressStyle={{ scale: 0.98 }}
      w="100%"
      flex={1}
    >
      <LinearGradient
        colors={['#642401', '#064a7d']}
        start={[0, 1]}
        end={[0, 0]}
        borderRadius="$6"
      >
        <BackgroundSVG style={{ zIndex: 2 }} />
        <View
          position="absolute"
          paddingTop="$3"
          paddingLeft="$3"
        >
          <XStack
            alignItems="center"
            gap="$3"
          >
            <Indicator bg={isActive ? '$green10Light' : '$red10Light'} />
            <Text
              fontSize="$4"
              color="white"
            >
              {isActive ? 'Aktiv' : 'Deaktiv'}
            </Text>
          </XStack>

          <YStack mt="$8">
            <YStack>
              <Text
                fontSize="$8"
                color="white"
              >
                {name}
              </Text>
              <Paragraph color="white">{note}</Paragraph>
            </YStack>

            <Text
              color="white"
              mt="$6"
            >
              {format(created_at, 'd MMMM y', {
                locale: sv
              })}
            </Text>
          </YStack>
        </View>
      </LinearGradient>
    </View>
  );
}
