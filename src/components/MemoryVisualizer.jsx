import React, { useEffect, useState } from "react";
import "./MemoryVisualizer.css";
import eventLoopLogo from "../images/loop.png"; // Add your logo to src folder

const MemoryVisualizer = ({ callStack, microtasks, macrotasks, heap }) => {
  const [isRotating, setIsRotating] = useState(false);
  console.log(microtasks,"microtasksmicrotasksmicrotasks")
  useEffect(() => {
    if (callStack.length > 0) {
      setIsRotating(true);
      const timer = setTimeout(() => setIsRotating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [callStack,microtasks,macrotasks]);

  return (
    <div className="memory-visualizer">
      {/* Call Stack */}
      <div className="section call-stack">
        <h4>📞 Call Stack</h4>
        <ul>
          {callStack.length === 0 ? (
            <li className="empty">Empty</li>
          ) : (
            callStack.map((item, index) => <li key={index}>{item}</li>)
          )}
        </ul>
         
      </div>
      <div className="event-loop-logo-container">
          <img
            src={eventLoopLogo}
            alt="Event Loop"
            // style={{marginTop:"0px"}}
            className={`event-loop-logo ${isRotating ? "rotating" : ""}`}
          />
        </div>

      {/* Microtasks and Macrotasks */}
      <div className="section queue">
        <div>
          <h4>📋 Microtasks Queue</h4>
          <ul style={{color:"orange"}}>
            {microtasks.length === 0 ? (
              <li className="empty">Empty</li>
            ) : (
              microtasks.map((item, index) => <li key={index}>{item}</li>)
            )}
          </ul>
        </div>
        <div>
          <h4>🕓 Macrotasks Queue</h4>
          <ul >
            {macrotasks.length === 0 ? (
              <li className="empty">Empty</li>
            ) : (
              macrotasks.map((item, index) => <li key={index}>{item}</li>)
            )}
          </ul>
        </div>
      </div>

      {/* Heap */}
      <div className="section heap">
        <h4>🧠 Heap</h4>
        <ul>
          {heap.length === 0 ? (
            <li className="empty">Empty</li>
          ) : (
            heap.map((item, index) => <li key={index}>{item}</li>)
          )}
        </ul>
      </div>
      
    </div>
  );
};

export default MemoryVisualizer;
