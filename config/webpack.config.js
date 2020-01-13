
const ENV_DEVELOPMENT = 'development';
const ENV_PRODUCTION = 'production';

// type WebpackEnv = "development" | "production"
module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === ENV_DEVELOPMENT;
  const isEnvProduction = webpackEnv === ENV_PRODUCTION;

  const productionConfig = {
    mode: ENV_PRODUCTION,
    // Stop compilation early in production
    bail: true,
    devtool: 'source-map',
    entry: [
      // Include an alternative client for WebpackDevServer. A client's job is to
      // connect to WebpackDevServer by a socket and get notified about changes.
      // When you save a file, the client will either apply hot updates (in case
      // of CSS changes), or refresh the page (in case of JS changes). When you
      // make a syntax error, this client will display a syntax error overlay.
      // Note: instead of the default WebpackDevServer client, we use a custom one
      // to bring better experience for Create React App users. You can replace
      // the line below with these two lines if you prefer the stock client:
      // require.resolve('webpack-dev-server/client') + '?/',
      // require.resolve('webpack/hot/dev-server'),
      isEnvDevelopment
        && require.resolve('react-dev-utils/webpackHotDevClient'),
      // Finally, this is your app's code:
      paths.appIndexJs,
      // We include the app code last so that if there is a runtime error during
      // initialization, it doesn't blow up the WebpackDevServer client, and
      // changing JS code would still trigger a refresh.
    ].filter(Boolean),
  };

  const developmentConfig = {
    mode: ENV_DEVELOPMENT,
    bail: false,
    devtool: 'cheap-module-source-map',
  };
};
