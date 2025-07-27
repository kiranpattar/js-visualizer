export function run(code, customConsole) {
  const originalConsoleLog = console.log;

  try {
    // Redirect console.log
    console.log = customConsole.log;

    // eslint-disable-next-line no-new-func
    const func = new Function(code);
    func(); // Run user code
  } catch (err) {
    customConsole.log("Runtime Error: " + err.message);
  } finally {
    // Restore original console.log
    console.log = originalConsoleLog;
  }
}
