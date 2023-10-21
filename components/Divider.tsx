import { Text, View } from "tamagui";

interface IProps {
  children: string;
}

export function Divider(props: IProps) {
  return (
    <View
      flexDirection="row"
      alignItems="center"
    >
      <View
        flex={1}
        height={0.5}
        backgroundColor="$gray8Light"
      />
      <View>
        <Text
          w={50}
          textAlign="center"
          width={50}
          textAlignVertical="center"
          color="$gray10Light"
        >
          {props.children}
        </Text>
      </View>
      <View
        flex={1}
        height={0.5}
        backgroundColor="$gray8Light"
      />
    </View>
  );
}
