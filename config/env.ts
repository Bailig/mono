interface EnvConfig {
  id: string;
  serverPort: number;
  database: string;
  host: string;
  protocol: string;
}

type EnvKey = "development" | "testing" | "staging" | "production";

const envConfigs: Record<EnvKey, EnvConfig> = {
  development: {
    id: "development",
    serverPort: 5000,
    database: "mono-development",
    host: "0.0.0.0",
    protocol: "http",
  },
  testing: {
    id: "testing",
    serverPort: 5000,
    database: "mono-testing",
    host: "0.0.0.0",
    protocol: "http",
  },
  staging: {
    id: "staging",
    serverPort: 8080,
    database: "mono-staging",
    host: "0.0.0.0",
    protocol: "https",
  },
  production: {
    id: "production",
    serverPort: 8080,
    database: "mono-production",
    host: "0.0.0.0",
    protocol: "https",
  },
};

const envKeys = Object.keys(envConfigs);

const getEnvConfig = (): EnvConfig => {
  const nodeEnv = process.env?.NODE_ENV;

  if (!nodeEnv || !envKeys.includes(nodeEnv)) {
    throw new Error(
      `The NODE_ENV environment variable is required to be one of '${envKeys.join(
        ", ",
      )}' but got '${process.env.NODE_ENV}'.`,
    );
  }

  return envConfigs[nodeEnv as EnvKey];
};

export const envConfig = getEnvConfig();
export const servedUrl = `${envConfig.protocol}/${envConfig.host}:${envConfig.serverPort}`;
export const rawEnv = {
  "process.env": {
    NODE_ENV: `"${process.env.NODE_ENV}"`,
  },
};
