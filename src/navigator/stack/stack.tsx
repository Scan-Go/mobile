import { TabProps } from "@navigator/tab/tab.typedefs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { StackParamList } from "./stack.typedefs";

const Stack = createNativeStackNavigator<StackParamList>();

const navigationProps = {
  headerTitleStyle: { fontSize: 18 },
};

export function HomeStackNavigator({ navigation }: TabProps) {
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={() => (
          <View>
            <Text>selam</Text>
          </View>
        )}
        name="HomeStack"
        options={{
          title: "Home",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        component={() => (
          <View>
            <Text>details</Text>
          </View>
        )}
        name="DetailsStack"
        options={{
          title: "Details",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
