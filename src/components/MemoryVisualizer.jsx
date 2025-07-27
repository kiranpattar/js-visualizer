import React from "react";
import "./MemoryVisualizer.css"; // Optional for styling

const MemoryVisualizer = ({ callStack, microtasks, macrotasks, heap }) => {
  return (
    <div style={{ marginTop: "2rem" }}>
      <div className="memory-grid">
        <div className="memory-box">
          <h3>📞 Call Stack</h3>
          <ul>
            {callStack.length === 0 ? (
              <li style={{ color: "#999" }}>(empty)</li>
            ) : (
              callStack.map((item, idx) => <li key={idx}>{item}</li>)
            )}
          </ul>
        </div>

        <div className="memory-box">
          <h3>🦠 Microtasks Queue</h3>
          <ul>
            {microtasks.length === 0 ? (
              <li style={{ color: "#999" }}>(empty)</li>
            ) : (
              microtasks.map((item, idx) => <li key={idx}>{item}</li>)
            )}
          </ul>
        </div>

        <div className="memory-box">
          <h3>🕒 Macrotasks Queue</h3>
          <ul>
            {macrotasks.length === 0 ? (
              <li style={{ color: "#999" }}>(empty)</li>
            ) : (
              macrotasks.map((item, idx) => <li key={idx}>{item}</li>)
            )}
          </ul>
        </div>

        <div className="memory-box memory-heap">
          <h3>🧠 Heap (Memory)</h3>
          <ul>
            {heap.length === 0 ? (
              <li style={{ color: "#999" }}>(empty)</li>
            ) : (
              heap.map((item, idx) => <li key={idx}>{item}</li>)
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemoryVisualizer;
