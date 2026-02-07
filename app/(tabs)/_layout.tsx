import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Basic",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "camera-sharp" : "camera-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="contrast"
        options={{
          title: "Handle Contrast",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "contrast-sharp" : "contrast-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="focus"
        options={{
          title: "Handle Focus",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "eye-sharp" : "eye-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="exposure"
        options={{
          title: "Handle Exposure",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "sunny-sharp" : "sunny-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="frame"
        options={{
          title: "Handle Frame",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "albums-sharp" : "albums-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
