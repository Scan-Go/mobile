import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import "react-native-gesture-handler";
import Navigator from "src/navigator";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <GluestackUIProvider config={config}>
        <Navigator />
      </GluestackUIProvider>
    </ApolloProvider>
  );
}
