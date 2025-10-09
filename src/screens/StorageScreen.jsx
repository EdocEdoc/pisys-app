import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAppContext } from "../context/AppContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AddItemModal from "../components/AddItemModal";

const StorageScreen = ({ route }) => {
  const navigation = useNavigation();
  const { storage: storageRef } = route.params;
  const [currItem, setCurrItem] = useState(null);

  const insets = useSafeAreaInsets();
  const { storageContext } = useAppContext();
  const { isLoading, getStorage, updateStorage } = storageContext;

  const [storage, setStorage] = useState(storageRef);
  const [showModal, setShowModal] = useState(false);

  const onDeleteItem = (itemId) => {
    if (!storage?.id) return;
    const updatedItems = (storage.items || []).filter((it) => it.id !== itemId);
    const updatedStorage = {
      ...storage,
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    };
    updateStorage(storage.id, updatedStorage);
    setStorage(updatedStorage);
  };

  const onAddItem = () => {
    if (!currItem || !storage?.id) return;

    const itemToStore = {
      ...currItem,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      storageId: storage.id,
    };

    const updatedStorage = {
      ...storage,
      items: [...(storage.items || []), itemToStore],
      updatedAt: new Date().toISOString(),
    };

    updateStorage(storage.id, updatedStorage);
    setStorage(updatedStorage);
    setCurrItem(null);
    setShowModal(false);
  };

  const onGetStorageDetails = () => {
    if (!storageRef?.id) return;
    const fullDetails = getStorage(storage.id);
    setStorage(fullDetails);
    console.log("🚀 ~ onGetStorageDetails ~ fullDetails:", fullDetails);
  };

  useEffect(() => {
    onGetStorageDetails();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <View style={{ backgroundColor: "#3b82f6", padding: 20, paddingTop: 40 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginBottom: 12 }}
        >
          <Text style={{ color: "#dbeafe", fontSize: 16 }}>← Back</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
            marginBottom: 4,
          }}
        >
          {storage?.name}
        </Text>
        {storage?.location && (
          <Text style={{ color: "#dbeafe" }}>📍 {storage.location}</Text>
        )}
      </View>

      <View style={{ flexDirection: "row", padding: 16, gap: 12 }}>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            flex: 1,
            backgroundColor: "#3b82f6",
            padding: 14,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Feather name="plus-circle" size={18} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "600" }}>Add Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {}}
          style={{
            flex: 1,
            backgroundColor: "#8b5cf6",
            padding: 14,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Feather name="camera" size={18} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "600" }}>QR Code</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 16, paddingTop: 8, flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 12,
            color: "#111827",
          }}
        >
          Items ({storage?.items?.length || 0})
        </Text>

        {storage?.items?.length == 0 || !storage?.items?.length ? (
          <View style={{ padding: 40, alignItems: "center" }}>
            <Feather name="package" size={64} color="#d1d5db" />
            <Text style={{ marginTop: 16, color: "#9ca3af", fontSize: 16 }}>
              No items yet
            </Text>
            <Text style={{ color: "#9ca3af", fontSize: 14, marginTop: 4 }}>
              Add items to this storage
            </Text>
          </View>
        ) : (
          <FlatList
            data={storage?.items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text style={{ color: "#6b7280", marginTop: 4 }}>
                      Qty: {item.quantity}
                    </Text>
                    {item.description && (
                      <Text
                        style={{ color: "#9ca3af", marginTop: 4, fontSize: 13 }}
                      >
                        {item.description}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => onDeleteItem(item.id)}
                    style={{ padding: 8 }}
                  >
                    <Feather name="trash-2" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <AddItemModal
        showModal={showModal}
        setShowModal={setShowModal}
        currItem={currItem}
        setCurrItem={setCurrItem}
        onAddItem={onAddItem}
      />
    </View>
  );
};

export default StorageScreen;

const styles = StyleSheet.create({});
