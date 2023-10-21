import { useAssets } from "expo-asset";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Button, Image, Input, Text, View, YStack, styled } from "tamagui";

import { Divider } from "@/components/Divider";
import { AppleIcon } from "@/components/icons/AppleIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

const CustomInput = styled(Input, {
  borderRadius: "$10"
});

const CustomKeyboardAvoidingView = styled(KeyboardAvoidingView, {
  behavior: Platform.OS === "ios" ? "padding" : "position",
  gap: 10,
  display: "flex",
  keyboardVerticalOffset: 100
});

export default function SignInView() {
  const [assets, error] = useAssets([require("@/assets/logo.png")]);

  return (
    <View
      p={20}
      flex={1}
    >
      <YStack gap="$5">
        <CustomKeyboardAvoidingView>
          <View
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            m="$10"
          >
            {assets ? <Image source={assets[0]} /> : null}
            <Text
              fontWeight="bold"
              fontSize="$5"
            >
              Scan & Go
            </Text>
          </View>
          <YStack gap="$3">
            <View gap="$3">
              <Text fontWeight="bold">Email</Text>
              <CustomInput
                keyboardType="email-address"
                placeholder="hello@gmail.com"
              />
            </View>
            <View gap="$3">
              <Text fontWeight="bold">Lösenord</Text>
              <CustomInput
                secureTextEntry
                placeholder="min. 8 characters"
              />
            </View>
            <Button bg="$orange8Light">
              <Text color="white">Logga in</Text>
            </Button>
          </YStack>
        </CustomKeyboardAvoidingView>

        <Divider>or</Divider>

        <Button
          icon={<GoogleIcon />}
          borderWidth={1}
          borderColor="$gray7Light"
          borderRadius="$10"
        >
          Logga in med Google
        </Button>
        <Button
          icon={<AppleIcon />}
          borderWidth={1}
          borderColor="$gray7Light"
          borderRadius="$10"
        >
          Logga in med Google
        </Button>
      </YStack>
    </View>
  );
}
