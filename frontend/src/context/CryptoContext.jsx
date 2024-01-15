// Create a new file, e.g., CryptoContext.js
import React, { createContext, useContext, useState } from 'react';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);

  const updateCryptoData = (newData) => {
    setCryptoData(newData);
  };

  return (
    <CryptoContext.Provider value={{ cryptoData, updateCryptoData }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCryptoContext = () => {
  return useContext(CryptoContext);
};
