import React from "react";
import Editor from "@monaco-editor/react";
import MemoryVisualizer from "./MemoryVisualizer";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const defaultCode = `function main() {
  console.log("Start");

  setTimeout(() => {
    console.log("Inside setTimeout");
  }, 0);

  Promise.resolve().then(() => {
    console.log("Inside Promise");
  });

  console.log("End");
}

main();`;

const EditorPage = () => {
  const [code, setCode] = React.useState(defaultCode);
  const [consoleOutput, setConsoleOutput] = React.useState([]);
  const [callStack, setCallStack] = React.useState([]);
  const [microtasks, setMicrotasks] = React.useState([]);
  const [macrotasks, setMacrotasks] = React.useState([]);
  const [heap, setHeap] = React.useState([]);
  const [delayMs, setDelayMs] = React.useState(500);

  const clearAll = () => {
    setConsoleOutput([]);
    setCallStack([]);
    setMicrotasks([]);
    setMacrotasks([]);
    setHeap([]);
  };

  const runCodeWithSlowExecution = async () => {
  clearAll();
  setConsoleOutput(["console.log: Start"]);
  setCallStack(["main()"]);
  await delay(delayMs);

  setHeap((prev) => [...prev, "Object: Kiran"]);
  setConsoleOutput((prev) => [...prev, "console.log: Created object in heap: Kiran"]);
  await delay(delayMs);

  setConsoleOutput((prev) => [...prev, "console.log: End"]);
  setCallStack([]);
  await delay(delayMs);

  setMicrotasks(["Promise 1", "Promise 2"]);
  setMacrotasks(["setTimeout 1", "setTimeout 2"]);
  await delay(delayMs);

  setConsoleOutput((prev) => [...prev, "Call Stack empty"]);
  await delay(delayMs);

  // Microtasks
  setConsoleOutput((prev) => [...prev, "Executing Microtasks..."]);
  for (let i = 1; i <= 2; i++) {
    setCallStack([`Promise ${i}`]);
    setConsoleOutput((prev) => [...prev, `console.log: Promise ${i} resolved`]);
    await delay(delayMs);
  }
  setCallStack([]);
  setMicrotasks([]);
  setConsoleOutput((prev) => [...prev, "Microtasks done"]);
  await delay(delayMs);

  // Macrotasks
  setConsoleOutput((prev) => [...prev, "Executing Macrotasks..."]);
  for (let i = 1; i <= 2; i++) {
    setCallStack([`setTimeout ${i}`]);
    setConsoleOutput((prev) => [...prev, `console.log: setTimeout ${i}`]);
    await delay(delayMs);
  }
  setCallStack([]);
  setMacrotasks([]);
  setConsoleOutput((prev) => [...prev, "Execution Complete ✅"]);
};

  return (
  <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
  <h2 style={{ marginBottom: "20px" }}>🧠 JS Visualizer with Memory & Call Stack</h2>

  <div style={{ marginBottom: "20px" }}>
    <label style={{ fontWeight: "bold" }}>
      ⏱ Execution Delay (ms):
      <input
        type="number"
        value={delayMs}
        onChange={(e) => setDelayMs(Number(e.target.value))}
        style={{
          width: "100px",
          marginLeft: "10px",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
    </label>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "auto auto",
      gap: "20px",
    }}
  >
    {/* Code Editor Section */}
    <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "15px", backgroundColor: "#f8f8f8" }}>
      <h3>💻 Code Editor</h3>
      <Editor
        height="550px"
        width="100%"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
      />
      <button
        onClick={runCodeWithSlowExecution}
        style={{
          marginTop: "12px",
          padding: "8px 16px",
          fontWeight: "bold",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ▶️ Run Code
      </button>
    </div>

    {/* Memory & Task Visualizer */}
    <div style={{ border: "1px solid #ddd",height:"120px", borderRadius: "10px", padding: "15px", backgroundColor: "#f0f0f0" }}>
      <h3>🧠 Memory + Call Stack</h3>
      <div
        style={{
          padding: "15px",
          borderRadius: "8px",
          minHeight: "150px",
          // height:"150px",
          fontSize: "16px",
          border: "2px dashed #555",
          backgroundColor: "#fff",
        }}
      >
        <MemoryVisualizer
          callStack={callStack}
          microtasks={microtasks}
          macrotasks={macrotasks}
          heap={heap}
        />
      </div>
    </div>

    {/* Console Output */}
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "#0f0",
        padding: "15px",
        borderRadius: "10px",
        fontFamily: "monospace",
        minHeight: "180px",
        overflowY: "auto",
        border: "1px solid #444",
      }}
    >
      <h3 style={{ color: "#fff" }}>📋 Console Output</h3>
      {consoleOutput.length === 0 ? (
        <div style={{ color: "#777" }}>No output yet. Run the code!</div>
      ) : (
        consoleOutput.map((line, idx) => <div key={idx}>{line}</div>)
      )}
    </div>

    {/* Logs Only */}
    <div
      style={{
        backgroundColor: "#2a2a2a",
        color: "#00ff8c",
        padding: "15px",
        borderRadius: "10px",
        fontFamily: "monospace",
        border: "1px solid #555",
        minHeight: "180px",
        overflowY: "auto",
      }}
    >
      <h3 style={{ color: "#fff" }}>📝 Logs</h3>
      {consoleOutput.filter((line) => line.startsWith("console.log")).length === 0 ? (
        <div style={{ color: "#888" }}>No logs yet. Run the code!</div>
      ) : (
        consoleOutput
          .filter((line) => line.startsWith("console.log"))
          .map((line, idx) => (
            <div key={idx}>{line.replace("console.log: ", "")}</div>
          ))
      )}
    </div>
  </div>
</div>

  );
};

export default EditorPage;
