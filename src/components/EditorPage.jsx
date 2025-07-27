import React, { useState } from "react";
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
  const [code, setCode] = useState(defaultCode);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [callStack, setCallStack] = useState([]);
  const [microtasks, setMicrotasks] = useState([]);
  const [macrotasks, setMacrotasks] = useState([]);
  const [heap, setHeap] = useState([]);
  const [delayMs, setDelayMs] = useState(500);

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
    <div style={{ padding: "20px" }}>
      <h2>🧠 JS Visualizer with Memory & Call Stack</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>
          ⏱ Execution Delay (ms):
          <input
            type="number"
            value={delayMs}
            onChange={(e) => setDelayMs(Number(e.target.value))}
            style={{ width: "80px", marginLeft: "5px" }}
          />
        </label>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          gridTemplateRows: "auto auto",
          gap: "20px",
        }}
      >
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}>
          <Editor
            height="400px"
            width="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => setCode(value)}
            theme="vs-dark"
          />
          <button onClick={runCodeWithSlowExecution} style={{ marginTop: "10px" }}>
            ▶️ Run Code
          </button>
        </div>

        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}>
          <h3 style={{ fontSize: "20px", marginBottom: "15px" }}>🧠 Call Stack + Task Queues</h3>
          <div
            style={{
              padding: "15px",
              borderRadius: "10px",
              minHeight: "400px",
              fontSize: "16px",
              border: "2px solid #444",
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

        <div
          style={{
            backgroundColor: "#000",
            color: "#0f0",
            padding: "15px",
            borderRadius: "8px",
            fontFamily: "monospace",
            minHeight: "200px",
            overflowY: "auto",
            border: "1px solid #333",
          }}
        >
          <h3 style={{ color: "#fff" }}>📋 Console Output</h3>
          {consoleOutput.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "#1e1e1e",
            color: "#0f0",
            padding: "10px",
            borderRadius: "5px",
            fontFamily: "monospace",
            border: "1px solid #444",
            minHeight: "200px",
            overflowY: "auto",
          }}
        >
          <h3 style={{ color: "#fff" }}>📋 Logs</h3>
          {consoleOutput.filter((line) => line.startsWith("console.log")).length === 0 ? (
            <div style={{ color: "#777" }}>No logs yet. Run the code!</div>
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
