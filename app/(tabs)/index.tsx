import { Button, Text, View } from 'tamagui'

export default function TabOneScreen() {
  return (
    <View flex={1} alignItems="center">
      <Text fontSize={20}>Tab One</Text>

      <Button onPress={() => alert("selam")} >selam</Button>
    </View>
  )
}
