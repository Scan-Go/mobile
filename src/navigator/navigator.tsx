import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./tab/tab";

function Navigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default Navigator;
