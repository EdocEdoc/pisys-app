import { View, Text } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import StorageScreen from "../screens/StorageScreen";
import AskAIScreen from "../screens/AskAIScreen";
import DIYStorageApp from "../screens/MainDefault";

const Stack = createStackNavigator();

const MainNavigationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="MAIN" component={DIYStorageApp} /> */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="StorageScreen" component={StorageScreen} />
      <Stack.Screen name="AskAIScreen" component={AskAIScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigationStack;
