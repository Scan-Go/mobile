import { Text, View } from 'tamagui';

export default function TabOneScreen() {
  return (
    <View
      flex={1}
      alignItems="center"
    >
      <Text fontSize={20}>Tab eOne</Text>

      <View theme="subtle">
        <View bg="$backgroundStrong">
          <Text>wqe</Text>
        </View>
      </View>
    </View>
  );
}
