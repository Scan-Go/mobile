import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Toast, ToastProvider, ToastViewport } from "@tamagui/toast";
import React, { PropsWithChildren } from "react";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";
import AlertDialog, { alertDialogRef } from "./components/alert_dialog";
import config from "./tamagui/config";

export default function Providers({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <ToastProvider duration={3000}>
            {children}
            <Toast />
            <ToastViewport
              top={insets.top + 30}
              left={insets.left}
              right={insets.right}
            />
          </ToastProvider>

          <AlertDialog ref={alertDialogRef} />
        </ThemeProvider>
      </TamaguiProvider>
    </>
  );
}
