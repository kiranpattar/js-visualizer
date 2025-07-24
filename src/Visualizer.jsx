import React from "react";

export default function Visualizer({ logs }) {
  return (
    <div className="visualizer">
      <h3>Console Output:</h3>
      <div style={{ background: "#1e1e1e", color: "#fff", padding: "10px", fontFamily: "monospace" }}>
        {logs.map((log, idx) => (
          <pre key={idx} style={{ margin: 0 }}>{log}</pre>
        ))}
      </div>
    </div>
  );
}
