import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@app_storages";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [storages, setStorages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ---- Load storages from AsyncStorage on startup ----
  useEffect(() => {
    loadStorages();
  }, []);

  const loadStorages = async () => {
    try {
      setIsLoading(true);
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setStorages(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error("Failed to load storages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ---- Save current storages to AsyncStorage ----
  const saveStorages = async (newStorages) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newStorages));
    } catch (error) {
      console.error("Failed to save storages:", error);
    }
  };

  // ---- CRUD operations ----

  // Create
  const addStorage = async (item) => {
    const newStorages = [...storages, item];
    setStorages(newStorages);
    await saveStorages(newStorages);
  };

  // Read (you can use storages directly, but for specific one:)
  const getStorage = (id) => {
    return storages.find((s) => s.id === id);
  };

  // Update
  const updateStorage = async (id, updatedData) => {
    const newStorages = storages.map((s) =>
      s.id === id ? { ...s, ...updatedData } : s
    );
    setStorages(newStorages);
    await saveStorages(newStorages);
  };

  // Delete
  const deleteStorage = async (id) => {
    const newStorages = storages.filter((s) => s.id !== id);
    setStorages(newStorages);
    await saveStorages(newStorages);
  };

  // ---- Expose context ----
  const storageContext = {
    storages,
    isLoading,
    addStorage,
    getStorage,
    updateStorage,
    deleteStorage,
    reload: loadStorages,
  };

  const appContext = {
    storageContext,
  };

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
