import React from "react";

const MemoryVisualizer = ({ callStack, microtasks, macrotasks, heap }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h4>📞 Call Stack</h4>
        <ul style={{ border: "1px solid #999", padding: "10px", minHeight: "60px" }}>
          {callStack.length === 0 ? (
            <li style={{ color: "#888" }}>Empty</li>
          ) : (
            callStack.map((item, index) => <li key={index}>{item}</li>)
          )}
        </ul>
      </div>

      <div>
        <h4>📋 Microtasks Queue</h4>
        <ul style={{ border: "1px solid #999", padding: "10px", minHeight: "60px" }}>
          {microtasks.length === 0 ? (
            <li style={{ color: "#888" }}>Empty</li>
          ) : (
            microtasks.map((item, index) => <li key={index}>{item}</li>)
          )}
        </ul>
      </div>

      <div>
        <h4>🕓 Macrotasks Queue</h4>
        <ul style={{ border: "1px solid #999", padding: "10px", minHeight: "60px" }}>
          {macrotasks.length === 0 ? (
            <li style={{ color: "#888" }}>Empty</li>
          ) : (
            macrotasks.map((item, index) => <li key={index}>{item}</li>)
          )}
        </ul>
      </div>

      <div>
        <h4>🧠 Heap</h4>
        <ul style={{ border: "1px solid #999", padding: "10px", minHeight: "60px" }}>
          {heap.length === 0 ? (
            <li style={{ color: "#888" }}>Empty</li>
          ) : (
            heap.map((item, index) => <li key={index}>{item}</li>)
          )}
        </ul>
      </div>
    </div>
  );
};

export default MemoryVisualizer;
