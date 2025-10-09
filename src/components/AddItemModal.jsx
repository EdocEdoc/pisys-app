import { StyleSheet, Text, View, Modal, TextInput } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const AddItemModal = ({
  setShowModal,
  onAddItem,
  showModal,
  currItem,
  setCurrItem,
}) => {
  return (
    <Modal visible={showModal} animationType="slide" transparent>
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
            <TouchableOpacity
              onPress={() => {
                setCurrItem(null);
                setShowModal(false);
              }}
            >
              <Feather name="x" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Item Name *"
            value={currItem?.name || ""}
            onChangeText={(text) => {
              setCurrItem({ ...currItem, name: text });
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
            placeholder="Quantity"
            value={currItem?.quantity?.toString() || ""}
            onChangeText={(text) => {
              setCurrItem({ ...currItem, quantity: parseInt(text) });
            }}
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
            value={currItem?.description || ""}
            onChangeText={(text) => {
              setCurrItem({ ...currItem, description: text });
            }}
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
            onPress={onAddItem}
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
  );
};

export default AddItemModal;

const styles = StyleSheet.create({});
