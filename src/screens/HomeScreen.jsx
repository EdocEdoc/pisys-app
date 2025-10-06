import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [storages, setStorages] = useState([]);

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <View
        style={{
          backgroundColor: "#3b82f6",
          padding: 20,
          paddingTop: insets?.top + 20 || 60,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#fff",
            marginBottom: 8,
          }}
        >
          DIY Storage Manager
        </Text>
        <Text style={{ fontSize: 14, color: "#dbeafe" }}>
          Organize your items with QR codes
        </Text>
      </View>

      <View style={{ flexDirection: "row", padding: 16, gap: 12 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("StorageScreen")}
          style={{
            flex: 1,
            backgroundColor: "#3b82f6",
            padding: 16,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Feather name="plus" size={20} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "600" }}>Add Storage</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {}}
          style={{
            flex: 1,
            backgroundColor: "#10b981",
            padding: 16,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Feather name="camera" size={20} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "600" }}>Scan QR</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 16, paddingTop: 8 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 12,
            color: "#111827",
          }}
        >
          My Storages ({storages.length})
        </Text>
      </View>

      {storages.length === 0 ? (
        <View style={{ padding: 40, alignItems: "center" }}>
          <Feather name="package" size={64} color="#d1d5db" />
          <Text style={{ marginTop: 16, color: "#9ca3af", fontSize: 16 }}>
            No storages yet
          </Text>
          <Text style={{ color: "#9ca3af", fontSize: 14, marginTop: 4 }}>
            Create one to get started
          </Text>
        </View>
      ) : (
        <View style={{ padding: 16 }}>
          <Text>You Have Storage</Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
