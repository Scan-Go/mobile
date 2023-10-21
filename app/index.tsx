import { Link } from "expo-router";
import { Text, View } from "tamagui";

export default function SignIn() {
  return (
    <View>
      <Text>index</Text>
      <Link href="/sign-in">
        <Text> Navigate to signin</Text>
      </Link>
      <Link href="/home" replace>
        <Text> Navigate to home</Text>
      </Link>
    </View>
  );
}
