import { useFonts } from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen
          name="sign-in"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </TamaguiProvider>
  );
}
