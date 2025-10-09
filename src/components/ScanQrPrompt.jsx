import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const ScanQrPrompt = ({ showModal, setShowModal }) => {
  return (
    <Modal visible={showModal === "SCAN_QR"} animationType="slide" transparent>
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
            <TouchableOpacity onPress={() => setShowModal(null)}>
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
            value={""}
            onChangeText={() => {}}
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
            onPress={() => {}}
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
  );
};

export default ScanQrPrompt;

const styles = StyleSheet.create({});
