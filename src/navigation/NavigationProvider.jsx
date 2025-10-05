import { View, Text } from "react-native";
import React from "react";
import MainNavigationStack from "./MainNavigationStack";
import { NavigationContainer } from "@react-navigation/native";

const NavigationProvider = () => {
  return (
    <NavigationContainer>
      <MainNavigationStack />
    </NavigationContainer>
  );
};

export default NavigationProvider;
