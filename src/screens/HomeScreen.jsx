import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text>HomeScreen</Text>
        <Button
          title="Go to Storage"
          onPress={() => navigation.navigate("StorageScreen")}
        />
        <Button
          title="Go to Ask AI"
          onPress={() => navigation.navigate("AskAIScreen")}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
