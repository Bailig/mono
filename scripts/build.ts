/* eslint-disable no-console */

// required to set NODE_ENV before importing config files
process.env.NODE_ENV = "production";

/* eslint-disable import/first */
import fs from "fs-extra";
import R from "ramda";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import webpack from "webpack";
import { paths } from "../config/paths";
import { getWebpackConfig } from "../config/webpack.config";
/* eslint-enable import/first */

const copyPublicFolder = (): void => {
  fs.copySync(paths.package.public, paths.package.build, {
    dereference: true,
    filter: file => file !== paths.package.indexHtml,
  });
};

const build = (): void => {
  console.log("Creating an optimized production build...");

  const config = getWebpackConfig("production");

  const compiler = webpack(config);
  compiler.run((error, stats) => {
    if (error) throw error;

    const formatedStats = formatWebpackMessages(
      stats.toJson({ all: false, warnings: true, errors: true }),
    );

    const errorMessage = R.pipe<FormatedStats, string[], string>(
      R.prop("errors"),
      R.head,
    )(formatedStats);

    if (errorMessage) throw new Error(errorMessage);

    const warningMessage = R.pipe<FormatedStats, string[], string>(
      R.prop("warnings"),
      R.join("\n\n"),
    )(formatedStats);

    if (warningMessage) console.warn(warningMessage);

    console.log("Done!");
  });
};

// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
fs.emptyDirSync(paths.package.build);

// Merge with the public folder
copyPublicFolder();

// Start the webpack build
build();

// ---------- types ----------
type FormatedStats = {
  errors: string[];
  warnings: string[];
};
