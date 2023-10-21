import { useAssets } from "expo-asset";
import { Image, styled, Text, View } from "tamagui";

import { Button } from "@/components/Button";

const Logo = styled(Image, {
  marginTop: "$-5",
  alignSelf: "center",
  backgroundColor: "white",
  borderRadius: "$10",
  p: "$7",
  source: {}
});

const LogoBackground = styled(View, {
  bg: "$primary",
  height: "$20",
  borderBottomLeftRadius: 100,
  borderBottomRightRadius: 100
});

export default function Home() {
  const [assets] = useAssets([require("@/assets/logo-icon.png")]);

  return (
    <View flex={1}>
      <LogoBackground />

      {assets ? <Logo source={assets[0]} /> : null}

      <View
        flex={1}
        justifyContent="space-around"
      >
        <View
          alignContent="center"
          alignItems="center"
        >
          <Text fontSize="$10">Scan & Go</Text>
          <Text>A platform build for a new way of communicating</Text>
        </View>
        <Button
          bg="$secondary"
          m="$10"
        >
          Fortsätt
        </Button>
      </View>
    </View>
  );
}
