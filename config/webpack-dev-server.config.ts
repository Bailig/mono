import errorOverlayMiddleware from "react-dev-utils/errorOverlayMiddleware";
import evalSourceMapMiddleware from "react-dev-utils/evalSourceMapMiddleware";
import ignoredFiles from "react-dev-utils/ignoredFiles";
import noopServiceWorkerMiddleware from "react-dev-utils/noopServiceWorkerMiddleware";
import WebpackDevServer from "webpack-dev-server";
import { paths } from "./paths";

// eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
const { getEnvConfig } = require(paths.package.env);

const { protocol, host } = getEnvConfig();

export const getDevServerConfig: GetDevServerConfig = allowedHost => {
  return {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: "none",
    contentBase: paths.package.public,
    watchContentBase: true,
    hot: true,
    transportMode: "ws",
    injectClient: false,
    publicPath: "/",
    quiet: true,
    watchOptions: {
      ignored: ignoredFiles(paths.package.src),
    },
    https: protocol === "https",
    host,
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
    },
    public: allowedHost,
    before(app, server) {
      app.use(evalSourceMapMiddleware(server));
      app.use(errorOverlayMiddleware());
      app.use(noopServiceWorkerMiddleware());
    },
  };
};

type GetDevServerConfig = (
  allowedHost?: string,
) => WebpackDevServer.Configuration;
