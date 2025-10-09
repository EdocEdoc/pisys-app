import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import AddStoragePrompt from "../components/AddStoragePrompt";
import ScanQrPrompt from "../components/ScanQrPrompt";
import { useAppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import QRModal from "../components/QRModal";

const HomeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(null);
  const { storageContext } = useAppContext();
  const { storages, addStorage, deleteStorage, isLoading } = storageContext;
  const [currStorage, setCurrStorage] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);

  const onStorageAdd = () => {
    if (currStorage == null) return;

    const toStore = {
      ...currStorage,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log("🚀 ~ onStorageAdd ~ toStore:", toStore);

    addStorage(toStore);
    setCurrStorage(null);
    setShowModal(null);
  };

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
          onPress={() => setShowModal("ADD_STORAGE")}
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
          onPress={() => setShowModal("SCAN_QR")}
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
        <FlatList
          data={storages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("StorageScreen", { storage: item });
              }}
              style={{
                backgroundColor: "#fff",
                padding: 16,
                borderRadius: 12,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#111827",
                  }}
                >
                  {item.name}
                </Text>
                {item.location && (
                  <Text style={{ color: "#6b7280", marginTop: 4 }}>
                    📍 {item.location}
                  </Text>
                )}
                <Text style={{ color: "#9ca3af", marginTop: 4, fontSize: 13 }}>
                  {item?.items?.length || "0"} items
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    setCurrStorage(item);
                    setShowQRModal(true);
                  }}
                  style={{ padding: 8 }}
                >
                  <Feather name="camera" size={20} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    deleteStorage(item.id);
                  }}
                  style={{ padding: 8 }}
                >
                  <Feather name="trash-2" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        />
      )}

      <AddStoragePrompt
        showModal={showModal}
        setShowModal={setShowModal}
        setCurrStorage={setCurrStorage}
        onStorageAdd={onStorageAdd}
        currStorage={currStorage}
      />

      <ScanQrPrompt showModal={showModal} setShowModal={setShowModal} />

      <QRModal
        showQRModal={showQRModal}
        storage={currStorage}
        setShowQRModal={setShowQRModal}
        setCurrStorage={setCurrStorage}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
