import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";
import R from "ramda";
import getCSSModuleLocalIdent from "react-dev-utils/getCSSModuleLocalIdent";
import InlineChunkHtmlPlugin from "react-dev-utils/InlineChunkHtmlPlugin";
import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";
import WatchMissingNodeModulesPlugin from "react-dev-utils/WatchMissingNodeModulesPlugin";
import resolve from "resolve";
import TerserPlugin from "terser-webpack-plugin";
import webpack, { RuleSetQuery, RuleSetUse } from "webpack";
import ManifestPlugin, { FileDescriptor } from "webpack-manifest-plugin";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";
import { moduleFileExtensions, paths } from "./paths";

/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const safePostCssParser = require("postcss-safe-parser");
const postcssNormalize = require("postcss-normalize");
const postcssFlexbugsFixes = require("postcss-flexbugs-fixes");
const ForkTsCheckerWebpackPlugin = require("react-dev-utils/ForkTsCheckerWebpackPlugin");
const ModuleNotFoundPlugin = require("react-dev-utils/ModuleNotFoundPlugin");
const typescriptFormatter = require("react-dev-utils/typescriptFormatter");
/* eslint-enable @typescript-eslint/no-var-requires */

/* eslint-disable import/no-dynamic-require, @typescript-eslint/no-var-requires */
const packageName = require(paths.package.packageJson).name;
const { rawEnv } = require(paths.package.env);
/* eslint-enable import/no-dynamic-require, @typescript-eslint/no-var-requires */

const cssModuleRegex = /\.module\.css$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

export const getWebpackConfig: GetWebpackConfig = webpackEnv => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  const isEnvProductionProfile =
    isEnvProduction && process.argv.includes("--profile");

  const getStyleLoaders: GetStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment
        ? require.resolve("style-loader")
        : {
            loader: MiniCssExtractPlugin.loader,
          },
      {
        loader: require.resolve("css-loader"),
        options: cssOptions,
      },
      {
        loader: require.resolve("postcss-loader"),
        options: {
          ident: "postcss",
          plugins: () => [
            postcssFlexbugsFixes,
            postcssPresetEnv({
              autoprefixer: {
                flexbox: "no-2009",
              },
              stage: 3,
            }),
            postcssNormalize(),
          ],
          sourceMap: isEnvProduction,
        },
      },
    ].filter(Boolean);

    if (!preProcessor) return loaders;

    return [
      ...loaders,
      {
        loader: require.resolve("resolve-url-loader"),
        options: {
          sourceMap: isEnvProduction,
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      },
    ];
  };

  return {
    mode: isEnvProduction ? "production" : "development",
    bail: isEnvProduction,
    devtool: isEnvProduction ? "source-map" : "cheap-module-source-map",
    entry: [
      isEnvDevelopment &&
        require.resolve("react-dev-utils/webpackHotDevClient"),
      paths.package.indexJs,
    ].filter(Boolean) as string[],
    output: {
      path: isEnvProduction ? paths.package.build : undefined,
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? "static/js/[name].[contenthash:8].js"
        : "static/js/bundle.js",
      futureEmitAssets: true,
      chunkFilename: isEnvProduction
        ? "static/js/[name].[contenthash:8].chunk.js"
        : "static/js/[name].chunk.js",
      publicPath: "/",
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
            path
              .relative(paths.package.src, info.absoluteResourcePath)
              .replace(/\\/g, "/")
        : info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
      jsonpFunction: `webpackJsonp${packageName}`,
      globalObject: "this",
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: {
              inline: false,
              annotation: true,
            },
          },
        }),
      ],
      splitChunks: {
        chunks: "all",
        name: false,
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
    },
    resolve: {
      modules: ["../node_modules", paths.root.nodeModules],
      extensions: moduleFileExtensions.map(ext => `.${ext}`),
      alias: {
        ...(isEnvProductionProfile
          ? {
              "react-dom$": "react-dom/profiling",
              "scheduler/tracing": "scheduler/tracing-profiling",
            }
          : {}),
      },
      plugins: [
        new ModuleScopePlugin(paths.package.src, [paths.package.packageJson]),
      ],
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: "pre",
          use: [
            {
              options: {
                cache: true,
                formatter: require.resolve("react-dev-utils/eslintFormatter"),
                eslintPath: require.resolve("eslint"),
                resolvePluginsRelativeTo: paths.root.path,
                ignore: true,
              },
              loader: require.resolve("eslint-loader"),
            },
          ],
          include: paths.package.src,
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve("url-loader"),
              options: {
                limit: 10000,
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: paths.package.src,
              loader: require.resolve("babel-loader"),
              options: {
                presets: [["react-app", { flow: false, typescript: true }]],
                plugins: [
                  [
                    require.resolve("babel-plugin-named-asset-import"),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            "@svgr/webpack?-svgo,+titleProp,+ref![path]",
                        },
                      },
                    },
                  ],
                ],

                cacheDirectory: true,
                cacheCompression: false,
                compact: isEnvProduction,
              },
            },
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve("babel-loader"),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  [
                    require.resolve("babel-preset-react-app/dependencies"),
                    { helpers: true },
                  ],
                ],
                cacheDirectory: true,
                cacheCompression: false,
                sourceMaps: true,
                inputSourceMap: true,
              },
            },
            {
              test: /\.css$/,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction,
              }),
              sideEffects: true,
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction,
                modules: {
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              }),
            },
            {
              test: /\.(scss|sass)$/,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction,
                },
                "sass-loader",
              ),
              sideEffects: true,
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction,
                  modules: {
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
                "sass-loader",
              ),
            },
            {
              loader: require.resolve("file-loader"),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.package.indexHtml,
        ...(isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined),
      }),
      isEnvProduction &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+\.js/]),
      new ModuleNotFoundPlugin(paths.package.path),
      new webpack.DefinePlugin(rawEnv),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      isEnvDevelopment &&
        new WatchMissingNodeModulesPlugin(paths.root.nodeModules),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
      new ManifestPlugin({
        fileName: "asset-manifest.json",
        publicPath: "/",
        generate: (seed, files, entrypoints) => {
          const manifestFiles = R.pipe<
            FileDescriptor[],
            FileDescriptor[],
            { name: string; path: string }[],
            Record<string, { name: string; path: string }>,
            Record<string, string>,
            Record<string, string>
          >(
            R.filter(file => typeof file.name === "string"),
            R.map(file => ({ ...file, name: file.name as string })),
            R.indexBy(R.prop("name")),
            R.mapObjIndexed(R.prop("path")),
            R.merge(seed),
          )(files);

          const entrypointFiles = entrypoints.main.filter(
            fileName => !fileName.endsWith(".map"),
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      isEnvProduction &&
        new WorkboxWebpackPlugin.GenerateSW({
          clientsClaim: true,
          exclude: [/\.map$/, /asset-manifest\.json$/],
          importWorkboxFrom: "cdn",
          navigateFallback: "/index.html",
          navigateFallbackBlacklist: [
            new RegExp("^/_"),
            new RegExp("/[^/?]+\\.[^/]+$"),
          ],
        }),
      new ForkTsCheckerWebpackPlugin({
        typescript: resolve.sync("typescript", {
          basedir: paths.root.nodeModules,
        }),
        async: isEnvDevelopment,
        useTypescriptIncrementalApi: true,
        checkSyntacticErrors: true,
        tsconfig: paths.package.tsConfig,
        reportFiles: ["**", "!**/__tests__/**", "!**/?(*.)(spec|test).*"],
        silent: false,
        formatter: isEnvProduction ? typescriptFormatter : undefined,
      }),
    ].filter(Boolean),
    node: {
      module: "empty",
      dgram: "empty",
      dns: "mock",
      fs: "empty",
      http2: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty",
    },
    performance: false,
  };
};

//  ---------- types ----------
type GetWebpackConfig = (
  webpackEnv: "development" | "production",
) => webpack.Configuration;

type GetStyleLoaders = (
  cssOptions: RuleSetQuery,
  preProcessor?: string,
) => RuleSetUse;
