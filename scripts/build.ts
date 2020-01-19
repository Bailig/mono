/* eslint-disable no-console */

import fs from "fs-extra";
import webpack from "webpack";
import { getWebpackConfig } from "../config/webpack.config";
import paths from "../config/paths";

const copyPublicFolder = () => {
  fs.copySync(paths.package.public, paths.package.build, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
};

const build = () => {
  console.log("Creating an optimized production build...");

  const config = getWebpackConfig("production");
  const compiler = webpack(config);
  compiler.run(err => {
    if (err) {
      throw new Error(err);
    }
    console.log("Created the optimized production build.");
  });
};

// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
fs.emptyDirSync(paths.package.build);

// Merge with the public folder
copyPublicFolder();

// Start the webpack build
build();
