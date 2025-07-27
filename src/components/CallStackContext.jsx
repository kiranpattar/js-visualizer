import React, { createContext, useContext, useState } from "react";

const CallStackContext = createContext();

export const CallStackProvider = ({ children }) => {
  const [callStack, setCallStack] = useState([]);

  return (
    <CallStackContext.Provider value={{ callStack, setCallStack }}>
      {children}
    </CallStackContext.Provider>
  );
};

export const useCallStack = () => useContext(CallStackContext);
