function Visualizer({ logs = [], callStack = [] }) {
  return (
    <div>
      <h3>Console Output</h3>
      <pre>{logs.join("\n")}</pre>

      <h3 style={{ marginTop: "1rem" }}>Call Stack</h3>
      <ul>
        {callStack.map((fn, index) => (
          <li key={index}>🔁 {fn}</li>
        ))}
      </ul>
    </div>
  );
}
