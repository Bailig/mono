import fs from "fs";
import path from "path";

const resolvePackage: ResolveRelativePath = relativePath =>
  path.resolve(process.cwd(), relativePath);

const resolveRoot: ResolveRelativePath = relativePath =>
  path.resolve(__dirname, `../${relativePath}`);

export const moduleFileExtensions = ["ts", "tsx", "js", "jsx"];

const addFileExtension = (filePath: string): string => {
  // eslint-disable-line no-shadow
  const extension = moduleFileExtensions.find(e =>
    fs.existsSync(`${filePath}.${e}`),
  );
  if (!extension) {
    throw new Error(
      `Failed to add file extension to: ${filePath}. The file should exist and the extension should be one of ${moduleFileExtensions.join(
        ", ",
      )}`,
    );
  }

  return `${filePath}.${extension}`;
};

export const paths = {
  root: {
    path: resolveRoot("."),
    env: resolveRoot("config/.env"),
    tsConfig: resolveRoot("config/tsconfig.json"),
    nodeModules: resolveRoot("node_modules"),
  },
  package: {
    path: resolvePackage("."),
    build: resolvePackage("build"),
    public: resolvePackage("public"),
    indexHtml: resolvePackage("public/index.html"),
    indexJs: addFileExtension(resolvePackage("src/index")),
    packageJson: resolvePackage("package.json"),
    src: resolvePackage("src"),
  },
};

type ResolveRelativePath = (relativePath: string) => string;
