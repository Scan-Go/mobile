import { GluestackUIProvider, config } from "@gluestack-ui/themed";
import Navigator from "@navigator";
import "react-native-gesture-handler";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Navigator />
    </GluestackUIProvider>
  );
}
