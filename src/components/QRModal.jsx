import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useRef } from "react";
import { Feather } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";

const QRModal = ({ storage, showQRModal, setShowQRModal, setCurrStorage }) => {
  const currentStorage = storage?.id ? storage : null;

  const viewShotRef = useRef(null);

  const saveQRToGallery = async () => {
    try {
      // Ask permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      console.log("🚀 ~ saveQRToGallery ~ status:", status);
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please allow access to save the image."
        );
        return;
      }

      // Capture the QR view
      const uri = await viewShotRef.current.capture();
      const fileName = `${FileSystem.documentDirectory}qr-code.jpg`;
      console.log("🚀 ~ saveQRToGallery ~ fileName:", fileName);

      // Move file from cache to a permanent location
      await FileSystem.moveAsync({
        from: uri,
        to: fileName,
      });

      // Save to gallery
      await MediaLibrary.saveToLibraryAsync(fileName);
      Alert.alert("✅ Saved", "QR Code has been saved to your gallery!");

      setCurrStorage(null);
      setShowQRModal(false);
    } catch (err) {
      console.error(err);
      Alert.alert("❌ Error", "Something went wrong saving the QR.");
    }
  };

  return (
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
            ></Text>
            <TouchableOpacity
              onPress={() => {
                setCurrStorage(null);
                setShowQRModal(false);
              }}
            >
              <Feather name="x" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <View style={{ padding: -20, alignItems: "center" }}>
            <ViewShot
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 20,
              }}
              ref={viewShotRef}
              options={{ format: "jpg", quality: 0.9 }}
            >
              {currentStorage?.id && (
                <View style={{ marginBottom: 20 }}>
                  <QRCode value={currentStorage?.id} size={250} />
                </View>
              )}

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginBottom: 8,
                  color: "#111827",
                  textAlign: "center",
                }}
              >
                {currentStorage?.name}
              </Text>
              {currentStorage?.location && (
                <Text
                  style={{
                    color: "#6b7280",
                    marginBottom: 16,
                    textAlign: "center",
                  }}
                >
                  📍 {currentStorage.location}
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
                Storage ID: {currentStorage?.id}
              </Text>
            </ViewShot>
          </View>

          <TouchableOpacity
            onPress={saveQRToGallery}
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
  );
};

export default QRModal;

const styles = StyleSheet.create({});
