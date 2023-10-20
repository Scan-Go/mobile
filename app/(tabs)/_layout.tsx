import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home Screen",
        }}
      />
      <Tabs.Screen
        name="selam"
        options={{
          title: "selam Screen",
        }}
      />
    </Tabs>
  );
}
