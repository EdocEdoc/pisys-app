import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const AddStoragePrompt = ({
  showModal,
  setShowModal,
  setCurrStorage,
  onStorageAdd,
  currStorage,
}) => {
  return (
    <Modal
      visible={showModal === "ADD_STORAGE"}
      animationType="slide"
      transparent
    >
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
            <TouchableOpacity
              onPress={() => {
                setCurrStorage(null);
                setShowModal(null);
              }}
            >
              <Feather name="x" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Storage Name *"
            value={currStorage?.name || ""}
            onChangeText={(text) => {
              setCurrStorage({ ...currStorage, name: text });
            }}
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
            value={currStorage?.location || ""}
            onChangeText={(text) => {
              setCurrStorage({ ...currStorage, location: text });
            }}
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
            onPress={() => onStorageAdd()}
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
  );
};

export default AddStoragePrompt;

const styles = StyleSheet.create({});
