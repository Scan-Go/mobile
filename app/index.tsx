import { useAuthStore } from "@lib/store/auth.store";
import { Redirect } from "expo-router";

function RootScreen() {
  const { isSignedIn } = useAuthStore();

  return isSignedIn ? (
    <Redirect href="/(tabs)/" />
  ) : (
    <Redirect href="/(auth)/signIn" />
  );
}

export default RootScreen;
