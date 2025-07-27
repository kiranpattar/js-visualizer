import React from "react";

function VisualizerPage({ logs }) {
  return (
    <div className="visualizer">
      <h2>Output Logs:</h2>
      <pre>
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </pre>
    </div>
  );
}

export default VisualizerPage;
