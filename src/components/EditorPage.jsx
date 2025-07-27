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

    setConsoleOutput((prev) => [...prev, "Starting execution..."]);
    await delay(delayMs);

    setCallStack(["main()"]);
    setConsoleOutput((prev) => [...prev, "Call Stack: main()"]);
    await delay(delayMs);

    setConsoleOutput((prev) => [...prev, "console.log: Start"]);
    await delay(delayMs);

    setMacrotasks(["setTimeout callback"]);
    setConsoleOutput((prev) => [...prev, "setTimeout() moved to Macrotask queue"]);
    await delay(delayMs);

    setMicrotasks(["Promise.then"]);
    setConsoleOutput((prev) => [...prev, "Promise.then() moved to Microtask queue"]);
    await delay(delayMs);

    setConsoleOutput((prev) => [...prev, "console.log: End"]);
    await delay(delayMs);

    setCallStack([]);
    setConsoleOutput((prev) => [...prev, "Call Stack empty"]);
    await delay(delayMs);

    setConsoleOutput((prev) => [...prev, "Executing Microtasks..."]);
    setCallStack(["Promise.then"]);
    setConsoleOutput((prev) => [...prev, "console.log: Inside Promise"]);
    setMicrotasks([]);
    await delay(delayMs);

    setCallStack([]);
    setConsoleOutput((prev) => [...prev, "Microtasks done"]);
    await delay(delayMs);

    setConsoleOutput((prev) => [...prev, "Executing Macrotasks..."]);
    setCallStack(["setTimeout callback"]);
    setConsoleOutput((prev) => [...prev, "console.log: Inside setTimeout"]);
    setMacrotasks([]);
    await delay(delayMs);

    setCallStack([]);
    setConsoleOutput((prev) => [...prev, "Execution Complete ✅"]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧠 JS Visualizer with Memory & Call Stack</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>
          ⏱ Execution Delay (ms):{" "}
          <input
            type="number"
            value={delayMs}
            onChange={(e) => setDelayMs(Number(e.target.value))}
            style={{ width: "80px", marginLeft: "5px" }}
          />
        </label>
      </div>

      <Editor
        height="300px"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
      />

      <button onClick={runCodeWithSlowExecution} style={{ marginTop: "10px" }}>
        ▶️ Run Code
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>📋 Console Output</h3>
        <div
          style={{
            backgroundColor: "#000",
            color: "#0f0",
            padding: "10px",
            borderRadius: "5px",
            minHeight: "120px",
            fontFamily: "monospace",
          }}
        >
          {consoleOutput.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      </div>

      <MemoryVisualizer
        callStack={callStack}
        microtasks={microtasks}
        macrotasks={macrotasks}
        heap={heap}
      />
    </div>
  );
};

export default EditorPage;
