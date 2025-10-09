import { View, Text } from "react-native";
import React from "react";
import MainNavigationStack from "./MainNavigationStack";
import { NavigationContainer } from "@react-navigation/native";
import { AppProvider } from "../context/AppContext";

const NavigationProvider = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <MainNavigationStack />
      </NavigationContainer>
    </AppProvider>
  );
};

export default NavigationProvider;
