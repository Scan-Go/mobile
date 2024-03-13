import { authService } from '@lib/services/auth.service';
import { Button, Card, H2, Paragraph, Text, View, XStack } from 'tamagui';

export default function TabOneScreen() {
  return (
    <View
      flex={1}
      alignItems="center"
    >
      <Text fontSize={20}>Tab eOne</Text>
      <View>
        <Card
          elevate
          size="$4"
          bordered
        >
          <Card.Header padded>
            <H2>Sony A7IV</H2>
            <Paragraph>Now available</Paragraph>
          </Card.Header>
          <Card.Footer padded>
            <XStack flex={1} />
            <Button
              borderRadius="$10"
              onPress={() => authService.logout()}
            >
              Purchase
            </Button>
          </Card.Footer>
        </Card>
      </View>
    </View>
  );
}
