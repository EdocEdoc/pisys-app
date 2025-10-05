import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

// Mock AsyncStorage for this demo
const AsyncStorage = {
  data: {},
  async getItem(key) {
    return this.data[key] || null;
  },
  async setItem(key, value) {
    this.data[key] = value;
  },
  async removeItem(key) {
    delete this.data[key];
  },
};

// QR Code Generator Component (simplified for demo)
const QRCodeDisplay = ({ value, size = 200 }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        borderColor: "#e5e7eb",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          opacity: 0.8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Feather name="code" size={size * 0.6} color="#fff" />
      </View>
      <Text
        style={{
          fontSize: 10,
          marginTop: 8,
          color: "#6b7280",
          textAlign: "center",
        }}
      >
        {value}
      </Text>
    </View>
  );
};

// Main App Component
export default function DIYStorageApp() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [storages, setStorages] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [showAddStorage, setShowAddStorage] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [scanInput, setScanInput] = useState("");

  // Form states
  const [storageName, setStorageName] = useState("");
  const [storageLocation, setStorageLocation] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  // Load storages on mount
  useEffect(() => {
    loadStorages();
  }, []);

  const loadStorages = async () => {
    try {
      const data = await AsyncStorage.getItem("storages");
      if (data) {
        setStorages(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error loading storages:", error);
    }
  };

  const saveStorages = async (updatedStorages) => {
    try {
      await AsyncStorage.setItem("storages", JSON.stringify(updatedStorages));
      setStorages(updatedStorages);
    } catch (error) {
      console.error("Error saving storages:", error);
    }
  };

  const addStorage = () => {
    if (!storageName.trim()) {
      Alert.alert("Error", "Please enter storage name");
      return;
    }

    const newStorage = {
      id: Date.now().toString(),
      name: storageName,
      location: storageLocation,
      items: [],
      createdAt: new Date().toISOString(),
    };

    const updated = [...storages, newStorage];
    saveStorages(updated);
    setStorageName("");
    setStorageLocation("");
    setShowAddStorage(false);
    Alert.alert("Success", "Storage created! Generate QR code for labeling.");
  };

  const addItem = () => {
    if (!itemName.trim()) {
      Alert.alert("Error", "Please enter item name");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: itemName,
      quantity: itemQuantity || "1",
      description: itemDescription,
      addedAt: new Date().toISOString(),
    };

    const updated = storages.map((s) =>
      s.id === selectedStorage.id ? { ...s, items: [...s.items, newItem] } : s
    );

    saveStorages(updated);
    setSelectedStorage({
      ...selectedStorage,
      items: [...selectedStorage.items, newItem],
    });
    setItemName("");
    setItemQuantity("");
    setItemDescription("");
    setShowAddItem(false);
  };

  const deleteStorage = (id) => {
    Alert.alert(
      "Delete Storage",
      "Are you sure you want to delete this storage?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updated = storages.filter((s) => s.id !== id);
            saveStorages(updated);
            if (selectedStorage?.id === id) {
              setSelectedStorage(null);
              setCurrentScreen("home");
            }
          },
        },
      ]
    );
  };

  const deleteItem = (itemId) => {
    const updated = storages.map((s) =>
      s.id === selectedStorage.id
        ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
        : s
    );
    saveStorages(updated);
    setSelectedStorage({
      ...selectedStorage,
      items: selectedStorage.items.filter((i) => i.id !== itemId),
    });
  };

  const scanQR = () => {
    if (!scanInput.trim()) {
      Alert.alert("Error", "Please enter storage ID");
      return;
    }

    const storage = storages.find((s) => s.id === scanInput);
    if (storage) {
      setSelectedStorage(storage);
      setCurrentScreen("detail");
      setShowScanModal(false);
      setScanInput("");
    } else {
      Alert.alert("Not Found", "Storage not found with this ID");
    }
  };

  // Home Screen
  const HomeScreen = () => (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <View style={{ backgroundColor: "#3b82f6", padding: 20, paddingTop: 40 }}>
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
          onPress={() => setShowAddStorage(true)}
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
          onPress={() => setShowScanModal(true)}
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
                  setSelectedStorage(item);
                  setCurrentScreen("detail");
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
                  <Text
                    style={{ color: "#9ca3af", marginTop: 4, fontSize: 13 }}
                  >
                    {item.items.length} items
                  </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      setSelectedStorage(item);
                      setShowQRModal(true);
                    }}
                    style={{ padding: 8 }}
                  >
                    <Feather name="code" size={20} color="#3b82f6" />
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
          />
        )}
      </View>
    </View>
  );

  // Detail Screen
  const DetailScreen = () => (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <View style={{ backgroundColor: "#3b82f6", padding: 20, paddingTop: 40 }}>
        <TouchableOpacity
          onPress={() => setCurrentScreen("home")}
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
          {selectedStorage?.name}
        </Text>
        {selectedStorage?.location && (
          <Text style={{ color: "#dbeafe" }}>
            📍 {selectedStorage.location}
          </Text>
        )}
      </View>

      <View style={{ flexDirection: "row", padding: 16, gap: 12 }}>
        <TouchableOpacity
          onPress={() => setShowAddItem(true)}
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
          onPress={() => setShowQRModal(true)}
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
          <Feather name="code" size={18} color="#fff" />
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
          Items ({selectedStorage?.items.length || 0})
        </Text>

        {selectedStorage?.items.length === 0 ? (
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
            data={selectedStorage?.items}
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
                    onPress={() => deleteItem(item.id)}
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
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === "home" ? <HomeScreen /> : <DetailScreen />}

      {/* Add Storage Modal */}
      <Modal visible={showAddStorage} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 24,
              paddingBottom: 40,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#111827" }}
              >
                Add Storage
              </Text>
              <TouchableOpacity onPress={() => setShowAddStorage(false)}>
                <Feather name="x" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Storage Name *"
              value={storageName}
              onChangeText={setStorageName}
              style={{
                borderWidth: 1,
                borderColor: "#d1d5db",
                borderRadius: 8,
                padding: 12,
                marginBottom: 12,
                fontSize: 16,
              }}
            />

            <TextInput
              placeholder="Location (optional)"
              value={storageLocation}
              onChangeText={setStorageLocation}
              style={{
                borderWidth: 1,
                borderColor: "#d1d5db",
                borderRadius: 8,
                padding: 12,
                marginBottom: 20,
                fontSize: 16,
              }}
            />

            <TouchableOpacity
              onPress={addStorage}
              style={{
                backgroundColor: "#3b82f6",
                padding: 16,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
                Create Storage
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Item Modal */}
      <Modal visible={showAddItem} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 24,
              paddingBottom: 40,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#111827" }}
              >
                Add Item
              </Text>
              <TouchableOpacity onPress={() => setShowAddItem(false)}>
                <Feather name="x" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Item Name *"
              value={itemName}
              onChangeText={setItemName}
              style={{
                borderWidth: 1,
                borderColor: "#d1d5db",
                borderRadius: 8,
                padding: 12,
                marginBottom: 12,
                fontSize: 16,
              }}
            />

            <TextInput
              placeholder="Quantity"
              value={itemQuantity}
              onChangeText={setItemQuantity}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: "#d1d5db",
                borderRadius: 8,
                padding: 12,
                marginBottom: 12,
                fontSize: 16,
              }}
            />

            <TextInput
              placeholder="Description (optional)"
              value={itemDescription}
              onChangeText={setItemDescription}
              multiline
              numberOfLines={3}
              style={{
                borderWidth: 1,
                borderColor: "#d1d5db",
                borderRadius: 8,
                padding: 12,
                marginBottom: 20,
                fontSize: 16,
                textAlignVertical: "top",
              }}
            />

            <TouchableOpacity
              onPress={addItem}
              style={{
                backgroundColor: "#3b82f6",
                padding: 16,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
                Add Item
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* QR Code Modal */}
      <Modal visible={showQRModal} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.8)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 24,
              alignItems: "center",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#111827" }}
              >
                QR Code Label
              </Text>
              <TouchableOpacity onPress={() => setShowQRModal(false)}>
                <Feather name="x" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 20 }}>
              <QRCodeDisplay value={selectedStorage?.id || ""} size={200} />
            </View>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 8,
                color: "#111827",
                textAlign: "center",
              }}
            >
              {selectedStorage?.name}
            </Text>
            {selectedStorage?.location && (
              <Text
                style={{
                  color: "#6b7280",
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                📍 {selectedStorage.location}
              </Text>
            )}

            <Text
              style={{
                color: "#9ca3af",
                fontSize: 12,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Storage ID: {selectedStorage?.id}
            </Text>

            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Download",
                  "In a real app, this would download the QR code as an image"
                )
              }
              style={{
                backgroundColor: "#3b82f6",
                padding: 14,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Feather name="download" size={20} color="#fff" />
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                Download Label
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Scan QR Modal */}
      <Modal visible={showScanModal} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 24,
              paddingBottom: 40,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#111827" }}
              >
                Scan QR Code
              </Text>
              <TouchableOpacity onPress={() => setShowScanModal(false)}>
                <Feather name="x" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: "#f3f4f6",
                padding: 16,
                borderRadius: 12,
                marginBottom: 20,
                alignItems: "center",
              }}
            >
              <Feather name="camera" size={48} color="#6b7280" />
              <Text
                style={{ color: "#6b7280", marginTop: 12, textAlign: "center" }}
              >
                Camera scanning not available in demo
              </Text>
            </View>

            <Text style={{ color: "#6b7280", marginBottom: 12 }}>
              Enter Storage ID manually:
            </Text>

            <TextInput
              placeholder="Storage ID"
              value={scanInput}
              onChangeText={setScanInput}
              style={{
                borderWidth: 1,
                borderColor: "#d1d5db",
                borderRadius: 8,
                padding: 12,
                marginBottom: 20,
                fontSize: 16,
              }}
            />

            <TouchableOpacity
              onPress={scanQR}
              style={{
                backgroundColor: "#10b981",
                padding: 16,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
                Find Storage
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
