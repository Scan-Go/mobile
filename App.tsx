import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GluestackUIProvider, config } from "@gluestack-ui/themed";
import Navigator from "@navigator";
import "react-native-gesture-handler";

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
