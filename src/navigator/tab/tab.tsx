import { AntDesign } from "@expo/vector-icons";
import { HomeStackNavigator } from "@navigator/stack/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { TabBarStatus, TabParamList } from "./tab.typedefs";

const Tab = createBottomTabNavigator<TabParamList>();

const renderTabBarIcon =
  (tabName: keyof TabParamList) => (tabStatus: TabBarStatus) => {
    switch (tabName) {
      case "HomeTab":
        return <AntDesign name="home" size={24} color={tabStatus.color} />;
      case "ProfileTab":
        return <AntDesign name="profile" size={24} color={tabStatus.color} />;
      // add more...
    }
  };

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: renderTabBarIcon(route.name),
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: "Home" }}
      />
    </Tab.Navigator>
  );
}
