import React from "react";
import { CallStackProvider } from "./components/CallStackContext";
import Main from "./components/Main";

function App() {
  return (
    <CallStackProvider>
      <Main />
    </CallStackProvider>
  );
}

export default App;
