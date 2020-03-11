import { exec, exit } from "shelljs";

process.env.NODE_ENV = "test";

// start test server
const child = exec("yarn start:test", { async: true });

child.on("exit", code => exit(code || 0));

child.stdout?.on("data", (data: string) => {
  // start test after server is started
  if (!data.includes("server started")) return;
  const testResult = exec("yarn jest -c ../../config/jest.config.js");

  // kill the test server, free up the port
  child.kill();

  // exit with test result
  exit(testResult.code);
});
