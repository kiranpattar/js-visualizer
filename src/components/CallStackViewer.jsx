import React from "react";
import "./CallStackViewer.css"; // Optional: style it as needed

function CallStackViewer({ callStack = [] }) {
  return (
    <div className="call-stack-viewer">
      <h3>📦 Call Stack</h3>
      <ul>
        {callStack.length === 0 ? (
          <li>(empty)</li>
        ) : (
          callStack.map((item, index) => <li key={index}>{item}</li>)
        )}
      </ul>
    </div>
  );
}

export default CallStackViewer;
