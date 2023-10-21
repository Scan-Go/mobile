import { config } from "@tamagui/config/v2";
import { createTamagui, createTokens } from "tamagui";

function postfixObjKeys(obj: any, postfix: any) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [`${k}${postfix}`, v])
  ) as any;
}

const colorTokens = {
  light: {
    primary: "#8370f6",
    secondary: "#8370f6",
    blue: "#8caeff",
    gray: "#808080",
    green: "#008000",
    orange: "#fcc688",
    pink: "#c498f9",
    purple: "#c498f9",
    red: "#ff4d4d",
    yellow: "#c498f9",
  },
  dark: {
    primary: "#8370f6",
    secondary: "#8370f6",
    blue: "#8caeff",
    gray: "#808080",
    green: "#008000",
    orange: "#fcc688",
    pink: "#c498f9",
    purple: "#c498f9",
    red: "#ff4d4d",
    yellow: "#c498f9",
  },
};

const tokens = createTokens({
  color: {
    ...postfixObjKeys(colorTokens.light, "Light"),
    ...postfixObjKeys(colorTokens.dark, "Dark"),
  },

  radius: config.tokens.radius,
  size: config.tokens.size,
  space: config.tokens.space,
  zIndex: config.tokens.zIndex,
});
const tamaguiConfig = createTamagui({
  ...config,
  tokens,
});

type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
