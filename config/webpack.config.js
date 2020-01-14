/* eslint-disable import/no-dynamic-require */

const path = require('path');
const paths = require('./paths');

const packagePackageJson = require(paths.package.packageJson);

const ENV_DEVELOPMENT = 'development';
const ENV_PRODUCTION = 'production';

// type WebpackEnv = "development" | "production"
module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === ENV_DEVELOPMENT;
  const isEnvProduction = webpackEnv === ENV_PRODUCTION;

  const baseConfig = {
    output: {
      // TODO: remove this when upgrading to webpack 5
      futureEmitAssets: true,
      // Prevents conflicts when multiple Webpack runtimes (from different apps)
      // are used on the same page.
      jsonpFunction: `webpackJsonp${packagePackageJson.name}`,
      // this defaults to 'window', but by setting it to 'this' then
      // module chunks which are built will work in web workers as well.
      globalObject: 'this',
    },
    optimization: {
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      // https://github.com/facebook/create-react-app/issues/5358
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },
    resolve: {
      modules: [paths.root.nodeModules],
      extensions: paths.moduleFileExtensions
        .map((ext) => `.${ext}`),
      alias: {

      },
    },
  };
  const productionConfig = {
    mode: ENV_PRODUCTION,
    // Stop compilation early in production
    bail: true,
    devtool: 'source-map',
    entry: paths.package.indexJs,
    output: {
      // The build folder.
      path: paths.package.build,
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: false,
      // There will be one main bundle, and one file per asynchronous chunk.
      // In development, it does not produce real files.
      filename: 'static/js/[name].[contenthash:8].js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      // We inferred the "public path" (such as / or /my-project) from homepage.
      publicPath: paths.package.servedUrl,
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: (info) => path
        .relative(paths.package.src, info.absoluteResourcePath)
        .replace(/\\/g, '/'),
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
          sourceMap: true,
        }),
      ],
    },
  };

  const developmentConfig = {
    mode: ENV_DEVELOPMENT,
    bail: false,
    devtool: 'cheap-module-source-map',
  };
};
