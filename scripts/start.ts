/* eslint-disable no-console */
// required to set NODE_ENV before importing config files
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

/* eslint-disable import/first */
import openBrowser from "react-dev-utils/openBrowser";
import {
  choosePort,
  createCompiler,
  prepareUrls,
} from "react-dev-utils/WebpackDevServerUtils";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { paths } from "../config/paths";
import { getDevServerConfig } from "../config/webpack-dev-server.config";
import { getWebpackConfig } from "../config/webpack.config";
/* eslint-enable import/first */

// eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
const { getEnvConfig } = require(paths.package.env);

(async () => {
  const envConfig = getEnvConfig();
  const { host, protocol } = envConfig;
  const port = await choosePort(host, envConfig.port);
  if (!port) {
    throw new Error(
      `Port ${envConfig.port} is in use, and failed to find the next port.`,
    );
  }
  const config = getWebpackConfig("development");
  const urls = prepareUrls(protocol, host, port);

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const appName = require(paths.package.packageJson).name;
  const compiler = createCompiler({
    appName,
    config,
    urls,
    useYarn: true,
    webpack,
  });
  const serverConfig = getDevServerConfig(urls.lanUrlForConfig);
  const devServer = new WebpackDevServer(compiler, serverConfig);

  devServer.listen(port, host, err => {
    if (err) throw err;

    console.log("Starting the development server...\n");
    if (process.env.NODE_ENV === "development") {
      openBrowser(urls.localUrlForBrowser);
    }
  });
})();
