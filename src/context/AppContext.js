import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [storages, setStorages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const storageContext = {
    storages,
    setStorages,
    isLoading,
    setIsLoading,
  };

  const appContext = {
    storageContext,
  };

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
