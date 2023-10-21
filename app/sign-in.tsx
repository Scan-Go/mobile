import { Button, Input, Text, View, YStack } from "tamagui";

export default function SignIn() {
  return (
    <View p="$3">
      <YStack gap="$4">
        <Text fontSize={35} fontWeight="bold" color="grey">
          Log in
        </Text>
        <View>
          <Text color="grey">E-mail</Text>
          <Input size="$4" />
        </View>
        <View>
          <Text color="grey">Lösenord</Text>
          <Input size="$4" />
        </View>

        <Button bg="primary">Logga in</Button>
      </YStack>
    </View>
  );
}
