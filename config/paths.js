const path = require('path');
const fs = require('fs');
const environmentConfig = require('./env');

const servedUrl = `${environmentConfig.protocol}/${environmentConfig.host}:${environmentConfig.serverPort}`;

const resolvePackage = (relativePath) => path.resolve(process.cwd(), relativePath);
const resolveRoot = (relativePath) => path.resolve(__dirname, `../${relativePath}`);


const moduleFileExtensions = [
  'ts',
  'tsx',
];

const addFileExtension = (path) => { // eslint-disable-line no-shadow
  const extension = moduleFileExtensions.find((e) => fs.existsSync(`${path}.${e}`));
  if (!extension) {
    throw Error(`Failed to add file extension to: ${path}. The file should exist and the extension should be one of ${moduleFileExtensions.join(', ')}`);
  }

  return `${path}.${extension}`;
};

const paths = {
  root: {
    path: resolveRoot('.'),
    env: resolveRoot('config/.env'),
    tsConfig: resolveRoot('config/tsconfig.json'),
    nodeModules: resolveRoot('node_modules'),
  },
  package: {
    path: resolvePackage('.'),
    build: resolvePackage('build'),
    public: resolvePackage('public'),
    indexHtml: resolvePackage('public/index.html'),
    indexJs: addFileExtension(resolvePackage('src/index')),
    packageJson: resolvePackage('package.json'),
    src: resolvePackage('src'),
    servedUrl,
  },
};

module.exports = paths;
module.exports.moduleFileExtensions = moduleFileExtensions;
