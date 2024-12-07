import React from "react";
import { Tabs } from "expo-router"; //not using Stack navigation atm
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#05A57E", // Active tab text/icon color
        tabBarInactiveTintColor: "gray",  // Inactive tab text/icon color
        tabBarStyle: { backgroundColor: "#121212" }, // Tab bar background
      }}
    >
      {/* Main Tab */}
      <Tabs.Screen
        name="index" // This corresponds to app/index.tsx
        options={{
          tabBarLabel: "Add new",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="mug-hot" size={size} color={color} />
          ),
        }}
      />

      {/* Library Tab */}
      <Tabs.Screen
        name="library" // This corresponds to app/library.tsx
        options={{
          tabBarLabel: "My Coffees",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
