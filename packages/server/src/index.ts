/* eslint-disable no-console */
import { getApp } from "./app";
import { getEnvConfig } from "./config/env";

const { port } = getEnvConfig();

(async () => {
  const app = await getApp();
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
