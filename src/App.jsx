import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Visualizer from "./Visualizer";

export default function App() {
  const [code, setCode] = useState(`const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const grouped = Object.groupBy(nums, (num) => {
  return num % 2 === 0 ? 'even' : 'odd';
});

console.log("Grouped output:", grouped);`);
  
  const [logs, setLogs] = useState([]);

  const runCode = () => {
    const capturedLogs = [];

    // Override console.log
    const originalLog = console.log;
    console.log = (...args) => {
      capturedLogs.push(args.map(arg => {
        try {
          return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg);
        } catch {
          return String(arg);
        }
      }).join(" "));
      originalLog(...args);
    };

    try {
      // Support modern features like Object.groupBy
      // eslint-disable-next-line no-new-func
      const fn = new Function(code);
      fn();
    } catch (err) {
      capturedLogs.push("Error: " + err.message);
    }

    console.log = originalLog;
    setLogs(capturedLogs);
  };

  return (
    <div className="app">
      <div className="editor">
        <Editor
          height="300px"
          language="javascript"
          value={code}
          onChange={(value) => setCode(value)}
        />
        <button onClick={runCode} className="run-btn">Run Code</button>
      </div>
      <Visualizer logs={logs} />
    </div>
  );
}
