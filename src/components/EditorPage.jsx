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

  fetch("url").then(() => {
    console.log("First fetch done");
    return fetch("next");
  }).then(() => {
    console.log("Second fetch done");
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

    const macroQueue = [];
    const microQueue = [];
    const logs = [];

    const fakeConsole = {
      log: (...args) => {
  const formatted = args
    .map((arg) =>
      typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
    )
    .join(" ");
  logs.push("console.log: " + formatted);
  setConsoleOutput((prev) => [...prev, "console.log: " + formatted]);
}

    };

    const fakeSetTimeout = (cb, time) => {
      macroQueue.push({ label: "setTimeout", task: cb });
      setMacrotasks((prev) => [...prev, `setTimeout`]);
    };

    const fakeQueueMicrotask = (cb) => {
      microQueue.push({ label: "queueMicrotask", task: cb });
      setMicrotasks((prev) => [...prev, `queueMicrotask`]);
    };

    const fakeRequestAnimationFrame = (cb) => {
      macroQueue.push({ label: "requestAnimationFrame", task: cb });
      setMacrotasks((prev) => [...prev, `requestAnimationFrame`]);
    };

    const createFakePromise = () => {
      const thenChain = [];
      const fake = {
        then(cb) {
          thenChain.push(cb);
          return fake;
        },
        _resolve(value) {
          let current = value;
          for (const cb of thenChain) {
            microQueue.push({
              label: "Promise.then",
              task: () => {
                current = cb(current);
              },
            });
            setMicrotasks((prev) => [...prev, "Promise.then"]);
          }
        },
      };
      return fake;
    };

    const fakeFetch = (url) => {
      const promise = createFakePromise();
      macroQueue.push({
        label: `fetch(${url})`,
        task: () => {
          promise._resolve({ data: `Response from ${url}` });
        },
      });
      setMacrotasks((prev) => [...prev, `fetch(${url})`]);
      return promise;
    };

    const FakePromise = {
      resolve: (val) => {
        const promise = createFakePromise();
        macroQueue.push({
          label: "Promise.resolve",
          task: () => promise._resolve(val),
        });
        setMacrotasks((prev) => [...prev, "Promise.resolve"]);
        return promise;
      },
    };

    try {
      const sandboxed = new Function(
        "console",
        "setTimeout",
        "setInterval",
        "queueMicrotask",
        "requestAnimationFrame",
        "Promise",
        "fetch",
        code
      );
      sandboxed(
        fakeConsole,
        fakeSetTimeout,
        fakeSetTimeout,
        fakeQueueMicrotask,
        fakeRequestAnimationFrame,
        FakePromise,
        fakeFetch
      );
    } catch (err) {
      setConsoleOutput((prev) => [...prev, "❌ Error: " + err.message]);
      return;
    }

    await delay(delayMs);
    setConsoleOutput((prev) => [...prev, "▶️ Executing Microtasks"]);
    for (const task of microQueue) {
      setCallStack([task.label]);
      await delay(delayMs);
      task.task();
    }
    setCallStack([]);
    setMicrotasks([]);
    await delay(delayMs);

    setConsoleOutput((prev) => [...prev, "▶️ Executing Macrotasks"]);
    for (const task of macroQueue) {
      setCallStack([task.label]);
      await delay(delayMs);
      task.task();
    }
    setCallStack([]);
    setMacrotasks([]);

    setConsoleOutput((prev) => [...prev, "✅ Execution Complete"]);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
      <h2 style={{ margin: "10px 0 10px 20px" }}>🧐 JS Visualizer with Memory & Call Stack</h2>

      <div style={{ padding: "0 20px 10px 20px" }}>
        <label style={{ fontWeight: "bold" }}>
          ⏱ Execution Delay (ms):
          <input
            type="number"
            value={delayMs}
            onChange={(e) => setDelayMs(Number(e.target.value))}
            style={{ width: "100px", marginLeft: "10px", padding: "5px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </label>
      </div>

      <div style={{ flexGrow: 1, display: "grid", gridTemplateColumns: "50% 50%", gridTemplateRows: "50% 50%", gap: "10px", padding: "0 20px 20px 20px", height: "100%" }}>
        <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "15px", backgroundColor: "#f8f8f8" }}>
          <h3>💻 Code Editor</h3>
          <Editor
            height="calc(100% - 50px)"
            width="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => setCode(value)}
            theme="vs-dark"
          />
          <button
            onClick={runCodeWithSlowExecution}
            style={{ marginTop: "10px", padding: "8px 16px", fontWeight: "bold", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            ▶️ Run Code
          </button>
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "15px", backgroundColor: "#f0f0f0" }}>
          <h3>🧠 Memory + Call Stack</h3>
          <div style={{ padding: "5px", borderRadius: "8px", height: "calc(100% - 80px)", fontSize: "10px", border: "2px dashed #555", backgroundColor: "#fff", overflowY: "auto" }}>
            <MemoryVisualizer callStack={callStack} microtasks={microtasks} macrotasks={macrotasks} heap={heap} />
          </div>
        </div>

        <div style={{ backgroundColor: "#1e1e1e", color: "#0f0", height: "150px", padding: "15px", borderRadius: "10px", fontFamily: "monospace", border: "1px solid #444", overflowY: "auto", marginTop: "60px" }}>
          <h3 style={{ color: "#fff" }}>📋 Console Output</h3>
          {consoleOutput.length === 0 ? <div style={{ color: "#777" }}>No output yet. Run the code!</div> : consoleOutput.map((line, idx) => <div key={idx}>{line}</div>)}
        </div>

        <div style={{ backgroundColor: "#2a2a2a", height: "150px", marginTop: "60px", color: "#00ff8c", padding: "15px", borderRadius: "10px", fontFamily: "monospace", border: "1px solid #555", overflowY: "auto" }}>
          <h3 style={{ color: "#fff" }}>📝 Logs</h3>
          {consoleOutput.filter((line) => line.startsWith("console.log")).length === 0 ? (
            <div style={{ color: "#888" }}>No logs yet. Run the code!</div>
          ) : (
            consoleOutput.filter((line) => line.startsWith("console.log")).map((line, idx) => <div key={idx}>{line.replace("console.log: ", "")}</div>)
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
